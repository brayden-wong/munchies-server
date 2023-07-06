"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthModule", {
    enumerable: true,
    get: function() {
        return AuthModule;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _jwt = require("@nestjs/jwt");
const _sessions = require("../sessions");
const _users = require("../users");
const _authcontroller = require("./auth.controller");
const _services = require("./services/index");
const _utils = require("../utils");
const _guards = require("./guards/index");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AuthModule = class AuthModule {
};
AuthModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwt.JwtModule.register({}),
            _passport.PassportModule.register({}),
            _sessions.SessionsModule,
            _users.UsersModule,
            _utils.UtilsModule
        ],
        controllers: [
            _authcontroller.AuthController
        ],
        providers: [
            _services.AuthService,
            _services.LocalStrategy,
            _guards.LocalGuard,
            _services.AtStrategy,
            _guards.AtGuard,
            _services.RtStrategy,
            _guards.RtGuard
        ],
        exports: [
            _services.AuthService,
            _guards.AtGuard,
            _guards.LocalGuard,
            _guards.RtGuard
        ]
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map