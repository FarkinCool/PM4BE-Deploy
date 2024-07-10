"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUUIDv4 = void 0;
function isValidUUIDv4(uuid) {
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(uuid);
}
exports.isValidUUIDv4 = isValidUUIDv4;
//# sourceMappingURL=validUuid.utils.js.map