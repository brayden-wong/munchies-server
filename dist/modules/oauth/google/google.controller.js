"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleController", {
    enumerable: true,
    get: function() {
        return GoogleController;
    }
});
const _common = require("@nestjs/common");
const _googleservice = require("./google.service");
const _constants = require("../../../utils/constants");
const _decorators = require("../../../utils/decorators");
const _googleoauthguard = require("./google.oauth.guard");
const _googletypes = require("./google.types");
const _express = require("express");
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
let GoogleController = class GoogleController {
    async googleAuth() {}
    async googleAuthRedirect(res, user) {
        const result = await this.googleService.createProfile(user);
        const queryParams = `?at=${result.auth.at}&rt=${result.auth.rt}&id=${result.auth.session.userId}`;
        return res.status(200).redirect(`${process.env.APP_URL}/--/screens/login/login${queryParams}`);
    }
    constructor(googleService){
        _define_property(this, "googleService", void 0);
        this.googleService = googleService;
    }
};
_ts_decorate([
    (0, _decorators.Public)(),
    (0, _common.Get)(),
    (0, _common.UseGuards)(_googleoauthguard.GoogleOAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], GoogleController.prototype, "googleAuth", null);
_ts_decorate([
    (0, _decorators.Public)(),
    (0, _common.Get)("callback"),
    (0, _common.UseGuards)(_googleoauthguard.GoogleOAuthGuard),
    _ts_param(0, (0, _common.Res)()),
    _ts_param(1, (0, _decorators.CurrentUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Response === "undefined" ? Object : _express.Response,
        typeof _googletypes.GoogleUser === "undefined" ? Object : _googletypes.GoogleUser
    ])
], GoogleController.prototype, "googleAuthRedirect", null);
GoogleController = _ts_decorate([
    (0, _common.Controller)(_constants.ROUTES.GOOGLE),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleservice.GoogleService === "undefined" ? Object : _googleservice.GoogleService
    ])
], GoogleController);

//# sourceMappingURL=google.controller.js.map