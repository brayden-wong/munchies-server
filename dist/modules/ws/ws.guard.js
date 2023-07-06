"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WsGuard", {
    enumerable: true,
    get: function() {
        return WsGuard;
    }
});
const _constants = require("../../utils/constants");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _passport = require("@nestjs/passport");
const _modules = require("..");
const _websockets = require("@nestjs/websockets");
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let WsGuard = class WsGuard extends (0, _passport.AuthGuard)(_constants.GUARDS.AT) {
    async canActivate(context) {
        const client = context.switchToWs().getClient();
        const headers = client?.handshake?.headers;
        if (!headers.authorization) return false;
        const token = headers.authorization;
        const userToken = await this.authService.validateToken(token);
        if (!userToken) throw new _websockets.WsException("Invalid token");
        client["user"] = userToken;
        return true;
    }
    constructor(authService, config){
        super();
        _define_property(this, "authService", void 0);
        _define_property(this, "config", void 0);
        this.authService = authService;
        this.config = config;
    }
};
WsGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_modules.AuthService)),
    _ts_param(1, (0, _common.Inject)(_config.ConfigService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _modules.AuthService === "undefined" ? Object : _modules.AuthService,
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], WsGuard);

//# sourceMappingURL=ws.guard.js.map