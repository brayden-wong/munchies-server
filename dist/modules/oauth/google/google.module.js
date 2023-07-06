"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleModule", {
    enumerable: true,
    get: function() {
        return GoogleModule;
    }
});
const _common = require("@nestjs/common");
const _googlecontroller = require("./google.controller");
const _googleservice = require("./google.service");
const _modules = require("../..");
const _googleoauthstrategy = require("./google.oauth.strategy");
const _googleoauthguard = require("./google.oauth.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GoogleModule = class GoogleModule {
};
GoogleModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _modules.AccountsModule,
            _modules.AuthModule,
            _modules.UsersModule,
            _modules.UtilsModule
        ],
        controllers: [
            _googlecontroller.GoogleController
        ],
        providers: [
            _googleservice.GoogleService,
            _googleoauthstrategy.GoogleOAuthStrategy,
            _googleoauthguard.GoogleOAuthGuard
        ]
    })
], GoogleModule);

//# sourceMappingURL=google.module.js.map