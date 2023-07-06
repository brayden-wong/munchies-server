"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DiscordController", {
    enumerable: true,
    get: function() {
        return DiscordController;
    }
});
const _utils = require("../../../utils");
const _common = require("@nestjs/common");
const _discordoauthguard = require("./discord.oauth.guard");
const _discordtypes = require("./discord.types");
const _discordservice = require("./discord.service");
const _config = require("@nestjs/config");
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
let DiscordController = class DiscordController {
    async discordLogin() {
        return {
            message: "login"
        };
    }
    async callback(res, user) {
        const result = await this.discordService.createProfile(user);
        console.log(result);
        const queryParams = `?at=${result.auth.at}&rt=${result.auth.rt}&id=${result.auth.session.userId}`;
        return res.status(200).redirect(`${this.config.get("APP_URL")}/--/screens/login/login${queryParams}`);
    }
    constructor(config, discordService){
        _define_property(this, "config", void 0);
        _define_property(this, "discordService", void 0);
        this.config = config;
        this.discordService = discordService;
    }
};
_ts_decorate([
    (0, _utils.Public)(),
    (0, _common.UseGuards)(_discordoauthguard.DiscordOAuthGuard),
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], DiscordController.prototype, "discordLogin", null);
_ts_decorate([
    (0, _utils.Public)(),
    (0, _common.UseGuards)(_discordoauthguard.DiscordOAuthGuard),
    (0, _common.Get)("callback"),
    _ts_param(0, (0, _common.Res)()),
    _ts_param(1, (0, _utils.CurrentUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Response === "undefined" ? Object : Response,
        typeof _discordtypes.DiscordProfile === "undefined" ? Object : _discordtypes.DiscordProfile
    ])
], DiscordController.prototype, "callback", null);
DiscordController = _ts_decorate([
    (0, _common.Controller)(_utils.ROUTES.DISCORD),
    _ts_param(0, (0, _common.Inject)(_config.ConfigService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _discordservice.DiscordService === "undefined" ? Object : _discordservice.DiscordService
    ])
], DiscordController);

//# sourceMappingURL=discord.controller.js.map