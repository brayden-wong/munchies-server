"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleOAuthStrategy", {
    enumerable: true,
    get: function() {
        return GoogleOAuthStrategy;
    }
});
const _utils = require("../../../utils");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _passport = require("@nestjs/passport");
const _passportgoogleoauth20 = require("passport-google-oauth20");
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
let GoogleOAuthStrategy = class GoogleOAuthStrategy extends (0, _passport.PassportStrategy)(_passportgoogleoauth20.Strategy, _utils.STRATEGIES.GOOGLE) {
    async validate(_accessToken, _refreshToken, profile, done) {
        const { emails, photos, id, provider, displayName, ...rest } = profile;
        const user = {
            provider: "google",
            providerId: id,
            email: emails[0].value,
            name: displayName,
            picture: photos[0].value
        };
        done(null, user);
    }
    constructor(config){
        super({
            clientID: config.get("GOOGLE_CLIENT_ID"),
            clientSecret: config.get("GOOGLE_SECRET"),
            callbackURL: config.get("GOOGLE_CALLBACK_URL"),
            scope: [
                "email",
                "profile"
            ]
        });
        _define_property(this, "config", void 0);
        this.config = config;
    }
};
GoogleOAuthStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_config.ConfigService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], GoogleOAuthStrategy);

//# sourceMappingURL=google.oauth.strategy.js.map