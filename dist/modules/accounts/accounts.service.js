"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AccountsService", {
    enumerable: true,
    get: function() {
        return AccountsService;
    }
});
const _common = require("@nestjs/common");
const _drizzle = require("../drizzle");
const _drizzleorm = require("drizzle-orm");
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
let AccountsService = class AccountsService {
    async createAccount(createAccountDto) {
        const [account] = await this.db.insert(_drizzle.accounts).values(createAccountDto).returning();
        return account;
    }
    async getAccount({ query, value }) {
        const queryResult = await this.parseQuery({
            query,
            value
        });
        const account = await this.db.query.accounts.findFirst({
            where: queryResult
        });
        return account;
    }
    async accountExists({ query, value }) {
        const queryResult = await this.parseQuery({
            query,
            value
        });
        const result = await this.db.query.accounts.findFirst({
            where: queryResult,
            columns: {
                userId: true
            }
        });
        return result ? {
            exists: true,
            id: result.userId
        } : {
            exists: false,
            id: null
        };
    }
    async parseQuery({ query, value }) {
        return query === "providerId" ? (0, _drizzleorm.eq)(_drizzle.accounts.providerId, value) : (0, _drizzleorm.eq)(_drizzle.accounts.userId, value);
    }
    constructor(db){
        _define_property(this, "db", void 0);
        this.db = db;
    }
};
AccountsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _drizzle.InjectDrizzle)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _drizzle.Database === "undefined" ? Object : _drizzle.Database
    ])
], AccountsService);

//# sourceMappingURL=accounts.service.js.map