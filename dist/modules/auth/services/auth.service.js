"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _jwt = require("@nestjs/jwt");
const _sessions = require("../../sessions");
const _users = require("../../users");
const _utils = require("../../utils");
const _functions = require("../../../utils/functions");
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
let AuthService = class AuthService {
    async validateUser(username, pass) {
        const isValid = (0, _functions.isValidEmail)(username);
        const user = isValid ? await this.usersService.getUser({
            query: "email",
            value: username
        }) : await this.usersService.getUser({
            query: "username",
            value: username
        });
        if (!user) return null;
        if (!await this.hashService.compare(pass, user.password)) return null;
        return {
            id: user.id
        };
    }
    async login(userId) {
        const isValidSession = await this.sessionsService.validateSession(userId);
        const { at, rt } = await this.generateTokens(userId);
        const session = isValidSession ? await this.sessionsService.updateSession(userId, {
            type: "login",
            userId,
            refreshToken: rt
        }) : await this.sessionsService.createSession({
            userId,
            refreshToken: rt
        });
        if (!session) throw new _common.HttpException("Failed to create session", _common.HttpStatus.BAD_REQUEST);
        return {
            at,
            rt,
            session
        };
    }
    async validateToken(token, options = {
        type: "at"
    }) {
        const decoded = await this.jwtService.verifyAsync(token, {
            secret: options.type === "at" ? this.config.get("AT_SECRET") : this.config.get("RT_SECRET")
        });
        const user = await this.usersService.getUser({
            query: "id",
            value: decoded.id
        });
        if (!user) return null;
        return decoded;
    }
    async refreshToken(refreshToken, userId) {
        const { at, rt } = await this.generateTokens(userId);
        const session = await this.sessionsService.updateSession(userId, {
            type: "refresh",
            newRefreshToken: rt,
            oldRefreshToken: refreshToken,
            userId
        });
        if (!session) throw new _common.HttpException("Invalid refresh token", 401);
        return {
            at,
            rt,
            session
        };
    }
    async generateTokens(id) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                id
            }, {
                expiresIn: this.config.get("AT_EXP"),
                secret: this.config.get("AT_SECRET")
            }),
            this.jwtService.signAsync({
                id
            }, {
                expiresIn: this.config.get("RT_EXP"),
                secret: this.config.get("RT_SECRET")
            })
        ]);
        return {
            at,
            rt
        };
    }
    constructor(config, hashService, jwtService, sessionsService, usersService){
        _define_property(this, "config", void 0);
        _define_property(this, "hashService", void 0);
        _define_property(this, "jwtService", void 0);
        _define_property(this, "sessionsService", void 0);
        _define_property(this, "usersService", void 0);
        this.config = config;
        this.hashService = hashService;
        this.jwtService = jwtService;
        this.sessionsService = sessionsService;
        this.usersService = usersService;
    }
};
AuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_config.ConfigService)),
    _ts_param(1, (0, _common.Inject)(_utils.HashService)),
    _ts_param(2, (0, _common.Inject)(_jwt.JwtService)),
    _ts_param(3, (0, _common.Inject)(_sessions.SessionsService)),
    _ts_param(4, (0, _common.Inject)(_users.UsersService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _utils.HashService === "undefined" ? Object : _utils.HashService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _sessions.SessionsService === "undefined" ? Object : _sessions.SessionsService,
        typeof _users.UsersService === "undefined" ? Object : _users.UsersService
    ])
], AuthService);

//# sourceMappingURL=auth.service.js.map