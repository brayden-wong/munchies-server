"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DiscordService", {
    enumerable: true,
    get: function() {
        return DiscordService;
    }
});
const _common = require("@nestjs/common");
const _modules = require("../..");
const _functions = require("../../../utils/functions");
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
let DiscordService = class DiscordService {
    async createProfile(profile) {
        const { exists, id: existingUserId } = await this.usersService.userExists({
            query: "email",
            value: profile.email
        });
        if (exists) {
            const existingAccount = await this.accountsService.getAccount({
                query: "userId",
                value: existingUserId
            });
            if (existingAccount.provider !== "discord") throw new _common.HttpException("Email is already associated with another account", _common.HttpStatus.CONFLICT);
            const session = await this.authService.login(existingUserId);
            return {
                account: null,
                auth: session,
                user: null
            };
        }
        const user = await this.usersService.createUser({
            id: (0, _functions.cuid)(),
            username: profile.username,
            email: profile.email
        });
        const session = await this.authService.login(user.id);
        const account = await this.accountsService.createAccount({
            id: (0, _functions.cuid)(),
            userId: user.id,
            provider: profile.provider,
            providerId: profile.providerId
        });
        return {
            account,
            auth: session,
            user
        };
    }
    constructor(accountsService, authService, usersService){
        _define_property(this, "accountsService", void 0);
        _define_property(this, "authService", void 0);
        _define_property(this, "usersService", void 0);
        this.accountsService = accountsService;
        this.authService = authService;
        this.usersService = usersService;
    }
};
DiscordService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_modules.AccountsService)),
    _ts_param(1, (0, _common.Inject)(_modules.AuthService)),
    _ts_param(2, (0, _common.Inject)(_modules.UsersService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _modules.AccountsService === "undefined" ? Object : _modules.AccountsService,
        typeof _modules.AuthService === "undefined" ? Object : _modules.AuthService,
        typeof _modules.UsersService === "undefined" ? Object : _modules.UsersService
    ])
], DiscordService);

//# sourceMappingURL=discord.service.js.map