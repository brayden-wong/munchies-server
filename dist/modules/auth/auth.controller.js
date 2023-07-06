"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _users = require("../users");
const _constants = require("../../utils/constants");
const _services = require("./services/index");
const _guards = require("./guards/index");
const _decorators = require("../../utils/decorators");
const _utils = require("../../utils");
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
let AuthController = class AuthController {
    async register(createUserDto) {
        const user = await this.usersService.createUser(createUserDto);
        if (!user) {
            throw new _common.HttpException({
                status: "error",
                statusCode: _common.HttpStatus.BAD_REQUEST,
                message: "Could not create user"
            }, _common.HttpStatus.BAD_REQUEST);
        }
        return {
            status: "ok",
            statusCode: _common.HttpStatus.CREATED,
            data: {
                user
            }
        };
    }
    async login(userId) {
        const { at, rt, session } = await this.authService.login(userId);
        return {
            status: "ok",
            statusCode: _common.HttpStatus.OK,
            data: {
                at,
                rt,
                session
            }
        };
    }
    async refreshToken(user) {
        const { at, rt, session } = await this.authService.refreshToken(user.rt, user.id);
        return {
            status: "ok",
            statusCode: _common.HttpStatus.OK,
            data: {
                at,
                rt,
                session
            }
        };
    }
    constructor(authService, usersService){
        _define_property(this, "authService", void 0);
        _define_property(this, "usersService", void 0);
        this.authService = authService;
        this.usersService = usersService;
    }
};
_ts_decorate([
    (0, _decorators.Public)(),
    (0, _common.Post)("register"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CreateUserDto === "undefined" ? Object : CreateUserDto
    ])
], AuthController.prototype, "register", null);
_ts_decorate([
    (0, _decorators.Public)(),
    (0, _common.Post)("login"),
    (0, _common.UseGuards)(_guards.LocalGuard),
    _ts_param(0, (0, _decorators.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], AuthController.prototype, "login", null);
_ts_decorate([
    (0, _decorators.Public)(),
    (0, _common.Patch)("refresh"),
    (0, _common.UseGuards)(_guards.RtGuard),
    _ts_param(0, (0, _decorators.CurrentUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _utils.RefreshToken === "undefined" ? Object : _utils.RefreshToken
    ])
], AuthController.prototype, "refreshToken", null);
AuthController = _ts_decorate([
    (0, _common.Controller)(_constants.ROUTES.AUTH),
    _ts_param(1, (0, _common.Inject)(_users.UsersService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _services.AuthService === "undefined" ? Object : _services.AuthService,
        typeof _users.UsersService === "undefined" ? Object : _users.UsersService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map