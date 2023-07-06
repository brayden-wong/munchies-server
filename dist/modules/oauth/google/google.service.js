"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleService", {
    enumerable: true,
    get: function() {
        return GoogleService;
    }
});
const _users = require("../../users");
const _utils = require("../../utils");
const _functions = require("../../../utils/functions");
const _common = require("@nestjs/common");
const _authservice = require("../../auth/services/auth.service");
const _accounts = require("../../accounts");
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
let GoogleService = class GoogleService {
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
            if (existingAccount.provider !== "google") throw new _common.HttpException("Email is already associated with another account", _common.HttpStatus.CONFLICT);
            const { at, rt, session } = await this.authService.login(existingUserId);
            return {
                user: null,
                account: null,
                auth: {
                    at,
                    rt,
                    session
                }
            };
        }
        const userId = (0, _functions.cuid)();
        const accountId = (0, _functions.cuid)();
        const username = await this.generatorService.generateUsername();
        const { providerId, email, provider, picture, name } = profile;
        const user = {
            id: userId,
            username,
            email: email.toLowerCase(),
            name
        };
        const newUser = await this.usersService.createUser(user);
        const session = await this.authService.login(user.id);
        const account = await this.accountsService.createAccount({
            id: accountId,
            provider,
            providerId,
            userId
        });
        return {
            account,
            auth: session,
            user: newUser
        };
    }
    constructor(accountsService, authService, generatorService, usersService){
        _define_property(this, "accountsService", void 0);
        _define_property(this, "authService", void 0);
        _define_property(this, "generatorService", void 0);
        _define_property(this, "usersService", void 0);
        this.accountsService = accountsService;
        this.authService = authService;
        this.generatorService = generatorService;
        this.usersService = usersService;
    }
};
GoogleService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_accounts.AccountsService)),
    _ts_param(1, (0, _common.Inject)(_authservice.AuthService)),
    _ts_param(2, (0, _common.Inject)(_utils.GeneratorService)),
    _ts_param(3, (0, _common.Inject)(_users.UsersService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _accounts.AccountsService === "undefined" ? Object : _accounts.AccountsService,
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService,
        typeof _utils.GeneratorService === "undefined" ? Object : _utils.GeneratorService,
        typeof _users.UsersService === "undefined" ? Object : _users.UsersService
    ])
], GoogleService);

//# sourceMappingURL=google.service.js.map