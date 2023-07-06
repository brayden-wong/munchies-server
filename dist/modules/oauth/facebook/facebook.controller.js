"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FacebookController", {
    enumerable: true,
    get: function() {
        return FacebookController;
    }
});
const _utils = require("../../../utils");
const _constants = require("../../../utils/constants");
const _common = require("@nestjs/common");
const _facebookoauthguard = require("./facebook.oauth.guard");
const _facebookservice = require("./facebook.service");
const _facebooktypes = require("./facebook.types");
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
let FacebookController = class FacebookController {
    async oauth() {}
    async callback(res, user) {
        const result = await this.facebookService.createProfile(user);
        const queryParams = `?at=${result.auth.at}&rt=${result.auth.rt}&id=${result.auth.session.userId}`;
        return res.status(200).redirect(`${process.env.APP_URL}/--/screens/login/login${queryParams}`);
    }
    constructor(facebookService){
        _define_property(this, "facebookService", void 0);
        this.facebookService = facebookService;
    }
};
_ts_decorate([
    (0, _utils.Public)(),
    (0, _common.Get)(),
    (0, _common.UseGuards)(_facebookoauthguard.FacebookOAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], FacebookController.prototype, "oauth", null);
_ts_decorate([
    (0, _utils.Public)(),
    (0, _common.Get)("redirect"),
    (0, _common.UseGuards)(_facebookoauthguard.FacebookOAuthGuard),
    _ts_param(0, (0, _common.Res)()),
    _ts_param(1, (0, _utils.CurrentUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Response === "undefined" ? Object : _express.Response,
        typeof _facebooktypes.FacebookUser === "undefined" ? Object : _facebooktypes.FacebookUser
    ])
], FacebookController.prototype, "callback", null);
FacebookController = _ts_decorate([
    (0, _common.Controller)(_constants.ROUTES.FACEBOOK),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _facebookservice.FacebookService === "undefined" ? Object : _facebookservice.FacebookService
    ])
], FacebookController);

//# sourceMappingURL=facebook.controller.js.map