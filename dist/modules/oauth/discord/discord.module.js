"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DiscordModule", {
    enumerable: true,
    get: function() {
        return DiscordModule;
    }
});
const _modules = require("../..");
const _common = require("@nestjs/common");
const _discordcontroller = require("./discord.controller");
const _discordoauthstrategy = require("./discord.oauth.strategy");
const _discordservice = require("./discord.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DiscordModule = class DiscordModule {
};
DiscordModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _modules.AccountsModule,
            _modules.AuthModule,
            _modules.UsersModule,
            _modules.UtilsModule
        ],
        controllers: [
            _discordcontroller.DiscordController
        ],
        providers: [
            _discordservice.DiscordService,
            _discordoauthstrategy.DiscordOAuthStrategy,
            _discordoauthstrategy.DiscordOAuthStrategy
        ]
    })
], DiscordModule);

//# sourceMappingURL=discord.module.js.map