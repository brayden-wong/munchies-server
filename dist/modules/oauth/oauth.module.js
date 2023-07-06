"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuthModule", {
    enumerable: true,
    get: function() {
        return OAuthModule;
    }
});
const _common = require("@nestjs/common");
const _discord = require("./discord/index");
const _google = require("./google/index");
const _facebook = require("./facebook/index");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let OAuthModule = class OAuthModule {
};
OAuthModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _discord.DiscordModule,
            _facebook.FacebookModule,
            _google.GoogleModule
        ]
    })
], OAuthModule);

//# sourceMappingURL=oauth.module.js.map