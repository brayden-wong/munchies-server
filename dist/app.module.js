"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _core = require("@nestjs/core");
const _guards = require("./modules/auth/guards/index");
const _modules = require("./modules");
const _recipes = require("./modules/recipes/index");
const _wsmodule = require("./modules/ws/ws.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _modules.AccountsModule,
            _modules.AuthModule,
            _config.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV}`
            }),
            _modules.DrizzleModule,
            _modules.OAuthModule,
            _recipes.RecipesModule,
            _modules.UsersModule,
            _wsmodule.WsModule
        ],
        controllers: [],
        providers: [
            {
                provide: _core.APP_GUARD,
                useClass: _guards.AtGuard
            }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map