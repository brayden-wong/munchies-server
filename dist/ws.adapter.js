"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WsAdapter", {
    enumerable: true,
    get: function() {
        return WsAdapter;
    }
});
const _platformsocketio = require("@nestjs/platform-socket.io");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
let WsAdapter = class WsAdapter extends _platformsocketio.IoAdapter {
    create(port, options) {
        return this.ioServer;
    }
    constructor(server){
        super();
        _define_property(this, "server", void 0);
        _define_property(this, "ioServer", void 0);
        this.server = server;
        const options = {};
    // this.ioServer = new Server(this.server, options);
    }
};

//# sourceMappingURL=ws.adapter.js.map