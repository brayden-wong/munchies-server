"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DiscordOAuthStrategy", {
    enumerable: true,
    get: function() {
        return DiscordOAuthStrategy;
    }
});
const _utils = require("../../../utils");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _passport = require("@nestjs/passport");
const _passportdiscord = require("passport-discord");
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
let DiscordOAuthStrategy = class DiscordOAuthStrategy extends (0, _passport.PassportStrategy)(_passportdiscord.Strategy, _utils.STRATEGIES.DISCORD) {
    async validate(_accessToken, _refreshToken, profileData, done) {
        const profile = {
            providerId: profileData.id,
            username: profileData.username,
            email: profileData.email,
            provider: profileData.provider
        };
        done(null, profile);
    }
    constructor(config){
        super({
            clientID: config.get("DISCORD_CLIENT_ID"),
            clientSecret: config.get("DISCORD_CLIENT_SECRET"),
            callbackURL: config.get("DISCORD_CALLBACK_URL"),
            scope: [
                "identify",
                "email"
            ]
        });
        _define_property(this, "config", void 0);
        this.config = config;
    }
};
DiscordOAuthStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_config.ConfigService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], DiscordOAuthStrategy);

//# sourceMappingURL=discord.oauth.strategy.js.map