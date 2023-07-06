"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FacebookOAuthStrategy", {
    enumerable: true,
    get: function() {
        return FacebookOAuthStrategy;
    }
});
const _utils = require("../../../utils");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _passport = require("@nestjs/passport");
const _passportfacebook = require("passport-facebook");
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
let FacebookOAuthStrategy = class FacebookOAuthStrategy extends (0, _passport.PassportStrategy)(_passportfacebook.Strategy, _utils.STRATEGIES.FACEBOOK) {
    async validate(_accessToken, _refreshToken, profile, done) {
        const user = {
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            picture: profile.photos[0].value,
            provider: "facebook",
            providerId: profile.id
        };
        done(null, user);
    }
    constructor(config){
        super({
            clientID: config.get("FACEBOOK_CLIENT_ID"),
            clientSecret: config.get("FACEBOOK_SECRET_ID"),
            callbackURL: config.get("FACEBOOK_CALLBACK_URL"),
            profileFields: [
                "id",
                "name",
                "photos",
                "email"
            ]
        });
        _define_property(this, "config", void 0);
        this.config = config;
    }
};
FacebookOAuthStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_config.ConfigService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], FacebookOAuthStrategy);

//# sourceMappingURL=facebook.oauth.strategy.js.map