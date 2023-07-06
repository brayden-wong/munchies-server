"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _config = require("@nestjs/config");
const _common = require("@nestjs/common");
const _https = require("https");
const _appmodule = require("./app.module");
const _httpexceptionfilter = require("./http.exception.filter");
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
async function bootstrap() {
    const AppLogger = new _common.Logger("App");
    const WsLogger = new _common.Logger("Websocket");
    const keyFile = _fs.readFileSync(__dirname + "/../config/server.key");
    const certFile = _fs.readFileSync(__dirname + "/../config/server.crt");
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    const httpsServer = (0, _https.createServer)();
    const config = app.get(_config.ConfigService);
    const PORT = config.get("PORT");
    const WS_PORT = config.get("WS_PORT");
    app.use((0, _cors.default)());
    app.useGlobalFilters(new _httpexceptionfilter.HttpExceptionFilter());
    // app.useWebSocketAdapter(new WsAdapter(httpsServer));
    try {
        await app.listen(PORT, async ()=>AppLogger.log(`Server is listening at ${await app.getUrl()}`));
        httpsServer.listen(WS_PORT, ()=>WsLogger.log(`Websocket is listening at https://[::1]:${WS_PORT}`));
    } catch (error) {
        AppLogger.error(`Error starting server: ${error}`);
        WsLogger.error(`Error starting websocket: ${error}`);
    }
}
bootstrap();

//# sourceMappingURL=main.js.map