/**
 * WeakAura Import String Encoder
 * ================================
 * Generates valid WeakAura import strings using:
 *   Format Version 2: LibSerialize + LibDeflate + EncodeForPrint
 *   Prefix: "!WA:2!"
 *
 * Pipeline: JS Object -> LibSerialize binary -> raw deflate -> EncodeForPrint -> "!WA:2!" prefix
 *
 * Encoding details derived from:
 *   - LibSerialize.lua (https://github.com/rossnichols/LibSerialize)
 *   - LibDeflate.lua (https://github.com/SafeteeWoW/LibDeflate)
 *   - WeakAuras2/Transmission.lua (https://github.com/WeakAuras/WeakAuras2)
 *
 * Number encoding decision tree (matches Lua exactly):
 *   1. Integer 0-127          -> embedded 7-bit: byte = num*2 + 1
 *   2. Integer -4095..4095    -> embedded 12-bit: 2 bytes (Pattern 3)
 *   3. Integer >=4096         -> sized int (2/3/4/7 bytes big-endian)
 *   4. Float with short repr  -> float_str (type 10/11)
 *   5. Float fallback         -> IEEE 754 double (9 bytes)
 *
 * IMPORTANT: Integers NEVER use float_str. The Lua code only reaches the
 * float path for actual floating-point values (fractional, NaN, Inf).
 */

const pako = require('pako');

// ============================================================================
// LibDeflate EncodeForPrint -- 6-bit encoding
// Alphabet: a-z A-Z 0-9 ( )  -- 64 chars, lowercase first (matches LibDeflate.lua)
// ============================================================================

const ENCODE_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()';

// Build decode table keyed by character
const DECODE_TABLE = {};
for (let i = 0; i < ENCODE_ALPHABET.length; i++) {
    DECODE_TABLE[ENCODE_ALPHABET[i]] = i;
}

/**
 * LibDeflate EncodeForPrint -- encodes binary data to printable 6-bit characters.
 * Every 3 bytes (24 bits) -> 4 characters (6 bits each), LSB first.
 *
 * Algorithm (from LibDeflate.lua):
 *   cache = x1 + x2*256 + x3*65536   (little-endian 24-bit)
 *   b1 = cache % 64                   (bits 0-5)
 *   b2 = floor(cache/64) % 64         (bits 6-11)
 *   b3 = floor(cache/4096) % 64       (bits 12-17)
 *   b4 = floor(cache/262144)          (bits 18-23)
 *
 * Trailing:
 *   1 byte (8 bits) -> 2 chars (12 bits, 4 padding)
 *   2 bytes (16 bits) -> 3 chars (18 bits, 2 padding)
 *   No padding character appended.
 */
function encodeForPrint(data) {
    const bytes = (data instanceof Uint8Array) ? data :
                  Buffer.isBuffer(data) ? data : Buffer.from(data, 'binary');
    const parts = [];
    const len = bytes.length;

    let i = 0;
    // Process 3 bytes -> 4 chars
    while (i + 2 < len) {
        const x1 = bytes[i], x2 = bytes[i + 1], x3 = bytes[i + 2];
        i += 3;
        const cache = x1 + x2 * 256 + x3 * 65536;
        parts.push(
            ENCODE_ALPHABET[cache % 64],
            ENCODE_ALPHABET[Math.floor(cache / 64) % 64],
            ENCODE_ALPHABET[Math.floor(cache / 4096) % 64],
            ENCODE_ALPHABET[Math.floor(cache / 262144)]
        );
    }

    // Handle remaining 1 or 2 bytes
    if (i < len) {
        let cache = 0, cacheBitlen = 0;
        while (i < len) {
            cache += bytes[i] * (1 << cacheBitlen);
            cacheBitlen += 8;
            i++;
        }
        while (cacheBitlen > 0) {
            parts.push(ENCODE_ALPHABET[cache % 64]);
            cache = Math.floor(cache / 64);
            cacheBitlen -= 6;
        }
    }

    return parts.join('');
}

/**
 * DecodeForPrint -- reverse of EncodeForPrint.
 * Strips leading/trailing whitespace. Returns null on invalid input.
 */
function decodeForPrint(str) {
    // Strip leading/trailing control chars and spaces (matches Lua gsub)
    str = str.replace(/^[\x00-\x20]+/, '').replace(/[\x00-\x20]+$/, '');
    if (str.length <= 1) return null;

    const result = [];
    let i = 0;

    // Process 4 chars -> 3 bytes
    while (i + 3 < str.length) {
        const x1 = DECODE_TABLE[str[i]];
        const x2 = DECODE_TABLE[str[i + 1]];
        const x3 = DECODE_TABLE[str[i + 2]];
        const x4 = DECODE_TABLE[str[i + 3]];
        if (x1 === undefined || x2 === undefined ||
            x3 === undefined || x4 === undefined) return null;
        i += 4;
        const cache = x1 + x2 * 64 + x3 * 4096 + x4 * 262144;
        result.push(cache % 256, Math.floor(cache / 256) % 256, Math.floor(cache / 65536));
    }

    // Handle remaining 2 or 3 chars
    let cache = 0, cacheBitlen = 0;
    while (i < str.length) {
        const x = DECODE_TABLE[str[i]];
        if (x === undefined) return null;
        cache += x * (1 << cacheBitlen);
        cacheBitlen += 6;
        i++;
    }
    while (cacheBitlen >= 8) {
        result.push(cache % 256);
        cache = Math.floor(cache / 256);
        cacheBitlen -= 8;
    }

    return Buffer.from(result);
}


// ============================================================================
// AceSerializer-3.0 -- Lua table serialization (for v1 format, kept as legacy)
// ============================================================================

function aceSerializeValue(value) {
    if (value === null || value === undefined) return '^Z';
    if (typeof value === 'boolean') return value ? '^B' : '^b';
    if (typeof value === 'number') return '^N' + value;
    if (typeof value === 'string') return '^S' + aceEscapeString(value);
    if (Array.isArray(value)) {
        let result = '^T';
        for (let i = 0; i < value.length; i++) {
            result += aceSerializeValue(i + 1);
            result += aceSerializeValue(value[i]);
        }
        return result + '^t';
    }
    if (typeof value === 'object') {
        let result = '^T';
        for (const [key, val] of Object.entries(value)) {
            const numKey = Number(key);
            if (!isNaN(numKey) && String(numKey) === key) {
                result += aceSerializeValue(numKey);
            } else {
                result += aceSerializeValue(key);
            }
            result += aceSerializeValue(val);
        }
        return result + '^t';
    }
    return '^Z';
}

function aceEscapeString(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code < 30 || code === 94 || code === 126 || code === 127) {
            result += '~' + String.fromCharCode(code + 64);
        } else {
            result += str[i];
        }
    }
    return result;
}

function aceSerialize(table) {
    return '^1' + aceSerializeValue(table) + '^^';
}


// ============================================================================
// LibSerialize -- Binary serialization (v2 format)
// Byte-accurate port of LibSerialize.lua _SerializeValue
// ============================================================================

const LIBSERIALIZE_VERSION = 1;

// Reader type indices (5-bit, Pattern 4: byte = index * 8)
const TYPE = {
    NIL:              0,   // 0x00
    NUM_16_POS:       1,   // 0x08
    NUM_16_NEG:       2,   // 0x10
    NUM_24_POS:       3,   // 0x18
    NUM_24_NEG:       4,   // 0x20
    NUM_32_POS:       5,   // 0x28
    NUM_32_NEG:       6,   // 0x30
    NUM_64_POS:       7,   // 0x38
    NUM_64_NEG:       8,   // 0x40
    NUM_FLOAT:        9,   // 0x48
    NUM_FLOATSTR_POS: 10,  // 0x50
    NUM_FLOATSTR_NEG: 11,  // 0x58
    BOOL_TRUE:        12,  // 0x60
    BOOL_FALSE:       13,  // 0x68
    STR_8:            14,  // 0x70
    STR_16:           15,  // 0x78
    STR_24:           16,  // 0x80
    TABLE_8:          17,  // 0x88
    TABLE_16:         18,  // 0x90
    TABLE_24:         19,  // 0x98
    ARRAY_8:          20,  // 0xA0
    ARRAY_16:         21,  // 0xA8
    ARRAY_24:         22,  // 0xB0
    MIXED_8:          23,  // 0xB8
    MIXED_16:         24,  // 0xC0
    MIXED_24:         25,  // 0xC8
    STRINGREF_8:      26,  // 0xD0
    STRINGREF_16:     27,  // 0xD8
    STRINGREF_24:     28,  // 0xE0
    TABLEREF_8:       29,  // 0xE8
    TABLEREF_16:      30,  // 0xF0
    TABLEREF_24:      31,  // 0xF8
};

// Embedded type indices (2-bit, Pattern 2: byte = count*16 + embIdx*4 + 2)
const EMB = {
    STRING: 0,  // count*16 + 0*4 + 2 = count*16 + 2
    TABLE:  1,  // count*16 + 1*4 + 2 = count*16 + 6
    ARRAY:  2,  // count*16 + 2*4 + 2 = count*16 + 10
    MIXED:  3,  // count*16 + 3*4 + 2 = count*16 + 14
};

// Helper: how many bytes needed to store a non-negative integer (for counts/refs)
function getRequiredBytes(n) {
    if (n < 256) return 1;
    if (n < 65536) return 2;
    if (n < 16777216) return 3;
    throw new Error('Value too large for 3-byte encoding: ' + n);
}

// Helper: how many bytes needed to store an integer magnitude (for number encoding)
// Different from getRequiredBytes: supports 4 and 7 byte values
function getRequiredBytesNumber(n) {
    if (n < 256) return 1;
    if (n < 65536) return 2;
    if (n < 16777216) return 3;
    if (n < 4294967296) return 4;
    return 7;
}

// Maps from required bytes -> type index for sized number types
const numberIndicesPOS = { 2: TYPE.NUM_16_POS, 3: TYPE.NUM_24_POS, 4: TYPE.NUM_32_POS, 7: TYPE.NUM_64_POS };
const numberIndicesNEG = { 2: TYPE.NUM_16_NEG, 3: TYPE.NUM_24_NEG, 4: TYPE.NUM_32_NEG, 7: TYPE.NUM_64_NEG };

// Maps from required bytes -> type index for string/table sizes
const stringIndices = { 1: TYPE.STR_8, 2: TYPE.STR_16, 3: TYPE.STR_24 };
const tableIndices  = { 1: TYPE.TABLE_8, 2: TYPE.TABLE_16, 3: TYPE.TABLE_24 };
const arrayIndices  = { 1: TYPE.ARRAY_8, 2: TYPE.ARRAY_16, 3: TYPE.ARRAY_24 };
const mixedIndices  = { 1: TYPE.MIXED_8, 2: TYPE.MIXED_16, 3: TYPE.MIXED_24 };
const stringRefIndices = { 1: TYPE.STRINGREF_8, 2: TYPE.STRINGREF_16, 3: TYPE.STRINGREF_24 };

/**
 * Write a big-endian integer of specified byte count.
 */
function intToBytes(n, required) {
    const bytes = [];
    if (required === 1) {
        bytes.push(n & 0xFF);
    } else if (required === 2) {
        bytes.push(Math.floor(n / 256) & 0xFF);
        bytes.push(n % 256);
    } else if (required === 3) {
        bytes.push(Math.floor(n / 65536) & 0xFF);
        bytes.push(Math.floor(n / 256) % 256);
        bytes.push(n % 256);
    } else if (required === 4) {
        bytes.push(Math.floor(n / 16777216) & 0xFF);
        bytes.push(Math.floor(n / 65536) % 256);
        bytes.push(Math.floor(n / 256) % 256);
        bytes.push(n % 256);
    } else if (required === 7) {
        // For very large numbers (up to 2^56)
        bytes.push(Math.floor(n / Math.pow(2, 48)) % 256);
        bytes.push(Math.floor(n / Math.pow(2, 40)) % 256);
        bytes.push(Math.floor(n / Math.pow(2, 32)) % 256);
        bytes.push(Math.floor(n / Math.pow(2, 24)) % 256);
        bytes.push(Math.floor(n / Math.pow(2, 16)) % 256);
        bytes.push(Math.floor(n / 256) % 256);
        bytes.push(n % 256);
    }
    return bytes;
}

/**
 * Check if a JS number is "floating point" in the Lua sense.
 * Lua: IsFractional(num) = (num % 1 ~= 0)
 *      IsFinite(num) = (num > -math.huge and num < math.huge)
 *      IsFloatingPoint = IsFractional(num) or not IsFinite(num)
 */
function isFloatingPoint(num) {
    if (!Number.isFinite(num)) return true;
    return num % 1 !== 0;
}

/**
 * LibSerialize writer -- builds a binary buffer matching LibSerialize.lua output exactly.
 */
class LibSerializeWriter {
    constructor(opts = {}) {
        this._buf = [];
        this._stringRefs = new Map();   // string -> ref index (1-based)
        this._stringRefCount = 0;
        this._tableRefs = new Map();    // object identity -> ref index
        this._tableRefCount = 0;
        this._errorOnUnserializableType = opts.errorOnUnserializableType || false;
    }

    writeByte(b) {
        this._buf.push(b & 0xFF);
    }

    writeBytes(arr) {
        for (let i = 0; i < arr.length; i++) this._buf.push(arr[i] & 0xFF);
    }

    getBuffer() {
        return Buffer.from(this._buf);
    }

    /**
     * Add a string reference (after first full write of a string > 2 bytes).
     */
    _addStringRef(str) {
        this._stringRefCount++;
        this._stringRefs.set(str, this._stringRefCount);
    }

    /**
     * Add a table reference (BEFORE serializing table contents).
     */
    _addTableRef(obj) {
        this._tableRefCount++;
        this._tableRefs.set(obj, this._tableRefCount);
    }

    /**
     * Write any value. Dispatches by type.
     */
    writeValue(value) {
        if (value === null || value === undefined) {
            this.writeByte(TYPE.NIL * 8);  // 0x00
            return;
        }
        const t = typeof value;
        if (t === 'boolean') {
            this.writeByte(value ? TYPE.BOOL_TRUE * 8 : TYPE.BOOL_FALSE * 8);
            return;
        }
        if (t === 'number') {
            this._writeNumber(value);
            return;
        }
        if (t === 'string') {
            this._writeString(value);
            return;
        }
        if (t === 'object') {
            this._writeTable(value);
            return;
        }
        // Unserializable type
        if (this._errorOnUnserializableType) {
            throw new Error('Unserializable type: ' + t);
        }
        this.writeByte(TYPE.NIL * 8);
    }

    /**
     * Write a number. Follows the EXACT Lua decision tree:
     *
     * 1. Is it floating point? (fractional, NaN, Inf)
     *    YES -> float path (float_str or IEEE 754)
     *    NO  -> integer path
     *
     * Integer path:
     *   a) 0..127       -> embedded 7-bit: byte = num*2 + 1
     *   b) -4095..4095  -> embedded 12-bit: 2 bytes (Pattern 3)
     *   c) larger       -> sized int (NUM_16/24/32/64)
     *
     * Float path:
     *   a) |tostring(abs)| < 7 and roundtrips -> float_str (type 10/11)
     *   b) else -> IEEE 754 double (type 9)
     */
    _writeNumber(num) {
        if (!isFloatingPoint(num)) {
            // INTEGER PATH
            // Step 1: embedded 7-bit for 0..127
            if (num >= 0 && num <= 127) {
                // Pattern 1: bit 0 = 1, upper 7 bits = value
                this.writeByte(num * 2 + 1);
                return;
            }

            // Step 2: embedded 12-bit for -4095..4095 (excluding 0..127)
            if (num > -4096 && num < 4096) {
                // Pattern 3: bits [2:0] = 100
                // Positive: packed = num * 16 + 4
                // Negative: packed = abs(num) * 16 + 8 + 4 = abs(num) * 16 + 12
                const absNum = Math.abs(num);
                let packed;
                if (num >= 0) {
                    packed = num * 16 + 4;
                } else {
                    packed = absNum * 16 + 12;
                }
                // Write 2 bytes: low byte first, then high byte
                this.writeByte(packed % 256);
                this.writeByte(Math.floor(packed / 256));
                return;
            }

            // Step 3: sized integer (abs >= 4096)
            const isNeg = num < 0;
            const absNum = Math.abs(num);
            const required = getRequiredBytesNumber(absNum);
            const indices = isNeg ? numberIndicesNEG : numberIndicesPOS;
            this.writeByte(indices[required] * 8);
            this.writeBytes(intToBytes(absNum, required));
            return;
        }

        // FLOAT PATH
        const absNum = Math.abs(num);
        const isNeg = num < 0;
        const absStr = String(absNum);

        // Check if float_str encoding is cheaper (string repr < 7 chars and roundtrips)
        if (absStr.length < 7 && Number(absStr) === absNum && Number.isFinite(absNum)) {
            const typeIdx = isNeg ? TYPE.NUM_FLOATSTR_NEG : TYPE.NUM_FLOATSTR_POS;
            this.writeByte(typeIdx * 8);
            this.writeByte(absStr.length);
            for (let i = 0; i < absStr.length; i++) {
                this.writeByte(absStr.charCodeAt(i));
            }
            return;
        }

        // Full IEEE 754 double (8 bytes big-endian)
        this.writeByte(TYPE.NUM_FLOAT * 8);  // 0x48
        const buf = Buffer.alloc(8);
        buf.writeDoubleBE(num, 0);
        this.writeBytes(buf);
    }

    /**
     * Write a string with reference deduplication.
     * String references track strings with byte length > 2.
     * First occurrence: write full string, then add ref.
     * Subsequent: write ref index.
     */
    _writeString(str) {
        const strBytes = Buffer.from(str, 'utf8');
        const byteLen = strBytes.length;

        // Check for existing string reference (only strings > 2 bytes are tracked)
        if (byteLen > 2 && this._stringRefs.has(str)) {
            const refIdx = this._stringRefs.get(str);
            const required = getRequiredBytes(refIdx);
            this.writeByte(stringRefIndices[required] * 8);
            this.writeBytes(intToBytes(refIdx, required));
            return;
        }

        // Write the string itself
        if (byteLen < 16) {
            // Embedded: count*16 + EMB.STRING*4 + 2 = count*16 + 2
            this.writeByte(byteLen * 16 + EMB.STRING * 4 + 2);
        } else {
            const required = getRequiredBytes(byteLen);
            this.writeByte(stringIndices[required] * 8);
            this.writeBytes(intToBytes(byteLen, required));
        }
        this.writeBytes(strBytes);

        // Add reference for strings > 2 bytes (AFTER writing)
        if (byteLen > 2) {
            this._addStringRef(str);
        }
    }

    /**
     * Classify and write a table/object.
     *
     * Classification (matches Lua exactly):
     * 1. Count array portion: sequential integer keys 1, 2, 3, ... (via ipairs equivalent)
     * 2. Count map portion: all other keys
     * 3. arrayCount>0, mapCount=0 -> pure ARRAY
     * 4. arrayCount=0, mapCount>0 -> pure TABLE (map)
     * 5. both > 0                 -> MIXED
     * 6. both = 0                 -> empty ARRAY
     */
    _writeTable(obj) {
        // Check for table reference (existing ref means recursive/shared table)
        if (this._tableRefs.has(obj)) {
            const refIdx = this._tableRefs.get(obj);
            const required = getRequiredBytes(refIdx);
            const indices = { 1: TYPE.TABLEREF_8, 2: TYPE.TABLEREF_16, 3: TYPE.TABLEREF_24 };
            this.writeByte(indices[required] * 8);
            this.writeBytes(intToBytes(refIdx, required));
            return;
        }

        // Add table ref BEFORE serializing contents (for self-referencing tables)
        this._addTableRef(obj);

        if (Array.isArray(obj)) {
            // JS arrays are always pure arrays
            this._writeArrayValues(obj, obj.length);
            return;
        }

        // Classify: count array portion (sequential integer keys starting at 1)
        const keys = Object.keys(obj);
        let arrayCount = 0;
        while (obj.hasOwnProperty(String(arrayCount + 1))) {
            arrayCount++;
        }

        // Count map portion: keys that are NOT array indices 1..arrayCount
        const mapKeys = [];
        for (const key of keys) {
            const numKey = Number(key);
            if (Number.isInteger(numKey) && numKey >= 1 && numKey <= arrayCount) {
                continue; // array element
            }
            mapKeys.push(key);
        }
        const mapCount = mapKeys.length;

        if (mapCount === 0) {
            // Pure array (or empty table -> empty array)
            const arr = [];
            for (let j = 1; j <= arrayCount; j++) {
                arr.push(obj[String(j)]);
            }
            this._writeArrayValues(arr, arrayCount);
            return;
        }

        if (arrayCount === 0) {
            // Pure map
            this._writeMapEntries(obj, mapKeys, mapCount);
            return;
        }

        // Mixed
        this._writeMixedTable(obj, arrayCount, mapKeys, mapCount);
    }

    /**
     * Write a pure array (values only, no keys).
     */
    _writeArrayValues(arr, count) {
        if (count < 16) {
            this.writeByte(count * 16 + EMB.ARRAY * 4 + 2);
        } else {
            const required = getRequiredBytes(count);
            this.writeByte(arrayIndices[required] * 8);
            this.writeBytes(intToBytes(count, required));
        }
        for (let i = 0; i < count; i++) {
            this.writeValue(arr[i] !== undefined ? arr[i] : null);
        }
    }

    /**
     * Write a pure map/table (key-value pairs, interleaved).
     */
    _writeMapEntries(obj, mapKeys, count) {
        if (count < 16) {
            this.writeByte(count * 16 + EMB.TABLE * 4 + 2);
        } else {
            const required = getRequiredBytes(count);
            this.writeByte(tableIndices[required] * 8);
            this.writeBytes(intToBytes(count, required));
        }
        for (const key of mapKeys) {
            // Determine if key should be written as number or string
            const numKey = Number(key);
            if (!isNaN(numKey) && String(numKey) === key) {
                this.writeValue(numKey);
            } else {
                this.writeValue(key);
            }
            this.writeValue(obj[key]);
        }
    }

    /**
     * Write a mixed table (array values first, then map key-value pairs).
     *
     * Embedded format: both counts must be 1-4.
     *   combined = (mapCount-1)*4 + (arrayCount-1)
     *   byte = combined*16 + EMB.MIXED*4 + 2
     */
    _writeMixedTable(obj, arrayCount, mapKeys, mapCount) {
        if (mapCount >= 1 && mapCount <= 4 && arrayCount >= 1 && arrayCount <= 4) {
            const combined = (mapCount - 1) * 4 + (arrayCount - 1);
            this.writeByte(combined * 16 + EMB.MIXED * 4 + 2);
        } else {
            const required = Math.max(getRequiredBytes(arrayCount), getRequiredBytes(mapCount));
            this.writeByte(mixedIndices[required] * 8);
            this.writeBytes(intToBytes(arrayCount, required));
            this.writeBytes(intToBytes(mapCount, required));
        }

        // Array values first (indices 1..arrayCount)
        for (let j = 1; j <= arrayCount; j++) {
            const val = obj[String(j)];
            this.writeValue(val !== undefined ? val : null);
        }

        // Map key-value pairs
        for (const key of mapKeys) {
            const numKey = Number(key);
            if (!isNaN(numKey) && String(numKey) === key) {
                this.writeValue(numKey);
            } else {
                this.writeValue(key);
            }
            this.writeValue(obj[key]);
        }
    }
}

/**
 * Serialize a table using LibSerialize format (v2).
 * Matches LibSerialize:SerializeEx({errorOnUnserializableType=false}, table)
 * Returns a Buffer of binary data.
 */
function libSerialize(table, opts) {
    const writer = new LibSerializeWriter(opts || { errorOnUnserializableType: false });
    writer.writeByte(LIBSERIALIZE_VERSION);  // Version byte: 0x01
    writer.writeValue(table);
    return writer.getBuffer();
}


// ============================================================================
// FULL PIPELINE
// ============================================================================

/**
 * Encode a WeakAura table into an importable string.
 *
 * v2 format (current standard):
 *   "!WA:2!" + EncodeForPrint(CompressDeflate(LibSerialize(table), {level:9}))
 *
 * The input table should be the WRAPPER table:
 *   { m: "d", d: auraData, v: version, s: versionString, c: childrenArray }
 */
function encodeWeakAura(table) {
    const serialized = libSerialize(table);
    const compressed = pako.deflateRaw(serialized, { level: 9 });
    const encoded = encodeForPrint(Buffer.from(compressed));
    return '!WA:2!' + encoded;
}

/**
 * Encode using legacy v1 format (AceSerializer).
 * Kept as fallback option.
 */
function encodeWeakAuraV1(table) {
    const serialized = aceSerialize(table);
    const compressed = pako.deflateRaw(Buffer.from(serialized, 'binary'), { level: 9 });
    const encoded = encodeForPrint(Buffer.from(compressed));
    return '!' + encoded;
}

/**
 * Decode a WeakAura import string (for verification).
 * Returns { version, rawBuffer } where rawBuffer is the decompressed bytes.
 */
function decodeWeakAura(importStr) {
    let str = importStr;
    let version = 0;

    if (str.startsWith('!WA:')) {
        const match = str.match(/^!WA:(\d+)!/);
        if (match) {
            version = parseInt(match[1]);
            str = str.substring(match[0].length);
        }
    } else if (str.startsWith('!')) {
        version = 1;
        str = str.substring(1);
    }

    const decoded = decodeForPrint(str);
    if (!decoded) throw new Error('DecodeForPrint failed');

    const decompressed = pako.inflateRaw(decoded);
    return { version, rawBuffer: Buffer.from(decompressed) };
}


// ============================================================================
// EXPORT
// ============================================================================
module.exports = {
    encodeWeakAura,
    encodeWeakAuraV1,
    decodeWeakAura,
    libSerialize,
    aceSerialize,
    aceSerializeValue,
    aceEscapeString,
    encodeForPrint,
    decodeForPrint,
    // Expose internals for testing
    LibSerializeWriter,
    LIBSERIALIZE_VERSION,
    TYPE,
    EMB,
};


// ============================================================================
// SELF-TEST (when run directly)
// ============================================================================
if (require.main === module) {
    console.log('=== WeakAura Encoder Self-Test ===\n');

    // Test 1: Number encoding
    console.log('--- Number Encoding Tests ---');
    const writer = new LibSerializeWriter();

    // 7-bit embedded: 0 -> 0x01, 1 -> 0x03, 127 -> 0xFF
    writer._writeNumber(0);
    console.assert(writer._buf[0] === 0x01, 'Zero should be 0x01');
    writer._buf.length = 0;

    writer._writeNumber(1);
    console.assert(writer._buf[0] === 0x03, '1 should be 0x03');
    writer._buf.length = 0;

    writer._writeNumber(127);
    console.assert(writer._buf[0] === 0xFF, '127 should be 0xFF');
    writer._buf.length = 0;

    // 12-bit embedded: 128 -> packed = 128*16 + 4 = 2052
    writer._writeNumber(128);
    const packed128 = 128 * 16 + 4;
    console.assert(writer._buf[0] === packed128 % 256, '128 low byte');
    console.assert(writer._buf[1] === Math.floor(packed128 / 256), '128 high byte');
    writer._buf.length = 0;

    // 12-bit embedded: 350 -> packed = 350*16 + 4 = 5604
    writer._writeNumber(350);
    const packed350 = 350 * 16 + 4;
    console.assert(writer._buf[0] === packed350 % 256, '350 low byte: got ' + writer._buf[0] + ' expected ' + (packed350 % 256));
    console.assert(writer._buf[1] === Math.floor(packed350 / 256), '350 high byte');
    writer._buf.length = 0;

    // 12-bit embedded: -80 -> packed = 80*16 + 12 = 1292
    writer._writeNumber(-80);
    const packedNeg80 = 80 * 16 + 12;
    console.assert(writer._buf[0] === packedNeg80 % 256, '-80 low byte');
    console.assert(writer._buf[1] === Math.floor(packedNeg80 / 256), '-80 high byte');
    writer._buf.length = 0;

    // 12-bit embedded: 4095 -> packed = 4095*16 + 4 = 65524
    writer._writeNumber(4095);
    const packed4095 = 4095 * 16 + 4;
    console.assert(writer._buf[0] === packed4095 % 256, '4095 low byte');
    console.assert(writer._buf[1] === Math.floor(packed4095 / 256), '4095 high byte');
    writer._buf.length = 0;

    // Sized int: 4096 -> NUM_16_POS (type 1, byte 0x08) + 2 bytes BE
    writer._writeNumber(4096);
    console.assert(writer._buf[0] === 0x08, '4096 type byte should be 0x08, got 0x' + writer._buf[0].toString(16));
    console.assert(writer._buf[1] === 0x10, '4096 high byte');
    console.assert(writer._buf[2] === 0x00, '4096 low byte');
    writer._buf.length = 0;

    // Sized int: 20505 -> NUM_16_POS (type 1, byte 0x08) + 2 bytes BE
    writer._writeNumber(20505);
    console.assert(writer._buf[0] === 0x08, '20505 type byte should be 0x08, got 0x' + writer._buf[0].toString(16));
    console.assert(writer._buf[1] === Math.floor(20505 / 256), '20505 high byte: got ' + writer._buf[1] + ' expected ' + Math.floor(20505/256));
    console.assert(writer._buf[2] === 20505 % 256, '20505 low byte: got ' + writer._buf[2] + ' expected ' + (20505 % 256));
    writer._buf.length = 0;

    // Float: 0.08 -> string repr is "0.08" (4 chars < 7), use float_str_pos
    writer._writeNumber(0.08);
    console.assert(writer._buf[0] === TYPE.NUM_FLOATSTR_POS * 8, '0.08 type should be FLOATSTR_POS');
    writer._buf.length = 0;

    // Float: -10 is an integer, should use 12-bit embedded
    writer._writeNumber(-10);
    const packedNeg10 = 10 * 16 + 12;
    console.assert(writer._buf[0] === packedNeg10 % 256, '-10 should be 12-bit embedded');
    writer._buf.length = 0;

    console.log('Number encoding: all tests passed\n');

    // Test 2: String encoding
    console.log('--- String Encoding Tests ---');
    const writer2 = new LibSerializeWriter();

    // Empty string: embedded with count 0 -> byte 0*16+2 = 2
    writer2._writeString('');
    console.assert(writer2._buf[0] === 2, 'Empty string should be byte 2');
    writer2._buf.length = 0;

    // Short string "id": 2 bytes -> embedded byte = 2*16+2 = 34
    writer2._writeString('id');
    console.assert(writer2._buf[0] === 34, '"id" embedded byte should be 34, got ' + writer2._buf[0]);
    console.assert(writer2._buf[1] === 105, '"id" byte 1 should be "i"=105');
    console.assert(writer2._buf[2] === 100, '"id" byte 2 should be "d"=100');
    writer2._buf.length = 0;

    console.log('String encoding: all tests passed\n');

    // Test 3: Table encoding
    console.log('--- Table Encoding Tests ---');
    const writer3 = new LibSerializeWriter();

    // Empty object -> empty array (byte 0*16+10 = 10 = 0x0A)
    writer3._writeTable({});
    // _addTableRef only stores in the Map, doesn't write bytes.
    // So the first and only byte should be the embedded array byte.
    console.assert(writer3._buf.length === 1, 'Empty table should produce 1 byte, got ' + writer3._buf.length);
    console.assert(writer3._buf[0] === 0x0A, 'Empty table first byte should be 0x0A, got 0x' + (writer3._buf[0] || 0).toString(16));
    writer3._buf.length = 0;

    console.log('Table encoding: all tests passed\n');

    // Test 4: Full round-trip
    console.log('--- Round-Trip Test ---');
    const testWrapperTable = {
        m: 'd',
        d: {
            id: 'Test Aura',
            regionType: 'icon',
            width: 64,
            height: 64,
            internalVersion: 78,
            triggers: {
                1: {
                    trigger: {
                        type: 'aura2',
                        event: 'Health',
                        unit: 'player',
                    },
                    untrigger: {},
                },
            },
        },
        v: 1421,
        s: '5.0.0',
    };

    const importStr = encodeWeakAura(testWrapperTable);
    console.log('Import string length:', importStr.length);
    console.log('Starts with !WA:2!:', importStr.startsWith('!WA:2!'));

    const decoded = decodeWeakAura(importStr);
    console.log('Decoded version:', decoded.version);
    console.log('First byte (version):', decoded.rawBuffer[0], '(should be 1)');
    console.log('Contains "Test Aura":', decoded.rawBuffer.toString('binary').includes('Test Aura'));
    console.log('Contains "icon":', decoded.rawBuffer.toString('binary').includes('icon'));

    if (decoded.version === 2 && decoded.rawBuffer[0] === 1) {
        console.log('\n=== ALL TESTS PASSED ===');
    } else {
        console.log('\n=== SOME TESTS FAILED ===');
    }
}
