"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FacebookService", {
    enumerable: true,
    get: function() {
        return FacebookService;
    }
});
const _modules = require("../..");
const _auth = require("../../auth");
const _common = require("@nestjs/common");
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
let FacebookService = class FacebookService {
    async createProfile(profile) {
        const { exists, id: existingUserId } = await this.accountsService.accountExists({
            query: "providerId",
            value: profile.providerId
        });
        if (exists) {
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
        const { name, picture, providerId, provider } = profile;
        const user = {
            id: userId,
            username,
            name
        };
        const newUser = await this.usersService.createUser(user);
        const session = await this.authService.login(newUser.id);
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
FacebookService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_modules.AccountsService)),
    _ts_param(1, (0, _common.Inject)(_auth.AuthService)),
    _ts_param(2, (0, _common.Inject)(_modules.GeneratorService)),
    _ts_param(3, (0, _common.Inject)(_modules.UsersService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _modules.AccountsService === "undefined" ? Object : _modules.AccountsService,
        typeof _auth.AuthService === "undefined" ? Object : _auth.AuthService,
        typeof _modules.GeneratorService === "undefined" ? Object : _modules.GeneratorService,
        typeof _modules.UsersService === "undefined" ? Object : _modules.UsersService
    ])
], FacebookService);

//# sourceMappingURL=facebook.service.js.map