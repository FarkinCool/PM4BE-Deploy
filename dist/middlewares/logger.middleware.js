"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerGlobalMiddleware = void 0;
function LoggerGlobalMiddleware(req, res, next) {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    console.log(`[${date} - ${time}] ${req.method} ${req.originalUrl}`);
    next();
}
exports.LoggerGlobalMiddleware = LoggerGlobalMiddleware;
//# sourceMappingURL=logger.middleware.js.map