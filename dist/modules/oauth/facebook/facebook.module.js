"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FacebookModule", {
    enumerable: true,
    get: function() {
        return FacebookModule;
    }
});
const _common = require("@nestjs/common");
const _facebookcontroller = require("./facebook.controller");
const _facebookoauthstrategy = require("./facebook.oauth.strategy");
const _facebookoauthguard = require("./facebook.oauth.guard");
const _facebookservice = require("./facebook.service");
const _modules = require("../..");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FacebookModule = class FacebookModule {
};
FacebookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _modules.AccountsModule,
            _modules.AuthModule,
            _modules.UsersModule,
            _modules.UtilsModule
        ],
        controllers: [
            _facebookcontroller.FacebookController
        ],
        providers: [
            _facebookservice.FacebookService,
            _facebookoauthguard.FacebookOAuthGuard,
            _facebookoauthstrategy.FacebookOAuthStrategy
        ]
    })
], FacebookModule);

//# sourceMappingURL=facebook.module.js.map