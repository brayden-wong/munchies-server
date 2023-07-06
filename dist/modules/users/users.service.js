"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersService", {
    enumerable: true,
    get: function() {
        return UsersService;
    }
});
const _common = require("@nestjs/common");
const _drizzle = require("../drizzle");
const _utils = require("../utils/index");
const _drizzleorm = require("drizzle-orm");
const _utils1 = require("../../utils");
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
let UsersService = class UsersService {
    async createUser(createUserDto) {
        try {
            const user = await this.db.transaction(async (tx)=>{
                if (createUserDto.email) createUserDto.email = createUserDto.email.toLowerCase();
                const [existingUser] = await tx.select().from(_drizzle.users).where(createUserDto.email ? (0, _drizzleorm.eq)(_drizzle.users.email, createUserDto.email.toLowerCase()) : (0, _drizzleorm.eq)(_drizzle.users.username, createUserDto.username)).limit(1).execute();
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const id = (0, _utils1.cuid)();
                if (createUserDto.password) createUserDto.password = await this.hashService.hash(createUserDto.password);
                const [result] = await tx.insert(_drizzle.users).values({
                    id,
                    ...createUserDto
                }).returning();
                return result;
            });
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new _common.HttpException(error.message, _common.HttpStatus.CONFLICT);
            }
        }
    }
    async getUser({ query, value }) {
        const queryResult = await this.parseQuery({
            query,
            value
        });
        const [result] = await this.db.select().from(_drizzle.users).where(queryResult).orderBy((0, _drizzleorm.asc)(_drizzle.users.username)).execute();
        return result;
    }
    async getUsers() {
        return await this.db.select().from(_drizzle.users).orderBy((0, _drizzleorm.asc)(_drizzle.users.username)).execute();
    }
    async updateUser(id, updateUserDto) {
        try {
            const user = await this.db.transaction(async (tx)=>{
                const result = await tx.query.users.findFirst({
                    where: (0, _drizzleorm.eq)(_drizzle.users.id, id),
                    columns: {
                        id: true
                    }
                });
                if (!result) throw new Error("User not found");
                if (updateUserDto.password) updateUserDto.password = await this.hashService.hash(updateUserDto.password);
                if (updateUserDto.email) updateUserDto.email = updateUserDto.email.toLowerCase();
                const [updatedUser] = await tx.update(_drizzle.users).set({
                    ...updateUserDto,
                    updatedAt: new Date()
                }).where((0, _drizzleorm.eq)(_drizzle.users.id, id)).returning();
                return updatedUser;
            });
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new _common.HttpException(error.message, _common.HttpStatus.NOT_FOUND);
            }
        }
    }
    async activateUser(id) {
        try {
            const user = await this.db.transaction(async (tx)=>{
                const result = await tx.query.users.findFirst({
                    where: (0, _drizzleorm.eq)(_drizzle.users.id, id),
                    columns: {
                        id: true
                    }
                });
                if (!result) throw new Error("User not found");
                const [activatedUser] = await tx.update(_drizzle.users).set({
                    updatedAt: new Date(),
                    deactivate: false
                }).where((0, _drizzleorm.eq)(_drizzle.users.id, id)).returning();
                return activatedUser;
            });
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new _common.HttpException(error.message, _common.HttpStatus.NOT_FOUND);
            }
        }
    }
    async deactivateUser(id) {
        try {
            const user = await this.db.transaction(async (tx)=>{
                const result = await tx.query.users.findFirst({
                    where: (0, _drizzleorm.eq)(_drizzle.users.id, id),
                    columns: {
                        id: true
                    }
                });
                if (!result) throw new Error("User not found");
                const [deactivatedUser] = await tx.update(_drizzle.users).set({
                    updatedAt: new Date(),
                    deactivate: true
                }).where((0, _drizzleorm.eq)(_drizzle.users.id, id)).returning();
                return deactivatedUser;
            });
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new _common.HttpException(error.message, _common.HttpStatus.NOT_FOUND);
            }
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.db.transaction(async (tx)=>{
                const [result] = await this.db.select({
                    id: _drizzle.users.id,
                    accountId: _drizzle.accounts.id,
                    sessionId: _drizzle.sessions.id
                }).from(_drizzle.users).leftJoin(_drizzle.sessions, (0, _drizzleorm.eq)(_drizzle.users.id, _drizzle.sessions.userId)).rightJoin(_drizzle.accounts, (0, _drizzleorm.eq)(_drizzle.users.id, _drizzle.accounts.userId)).where((0, _drizzleorm.eq)(_drizzle.users.id, id)).limit(1).execute();
                if (!result) throw new Error("User not found");
                const { accountId, sessionId } = result;
                if (accountId) await this.deleteAccount(accountId);
                if (sessionId) await this.deleteSession(sessionId);
                const [deletedUser] = await tx.delete(_drizzle.users).where((0, _drizzleorm.eq)(_drizzle.users.id, id)).returning();
                return deletedUser;
            });
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new _common.HttpException(error.message, _common.HttpStatus.NOT_FOUND);
            }
        }
    }
    async userExists({ query, value }) {
        const queryResult = await this.parseQuery({
            query,
            value
        });
        const result = await this.db.query.users.findFirst({
            columns: {
                id: true
            },
            where: queryResult
        });
        return result ? {
            exists: true,
            id: result.id
        } : {
            exists: false,
            id: null
        };
    }
    async deleteAccount(accountId) {
        await this.db.delete(_drizzle.accounts).where((0, _drizzleorm.eq)(_drizzle.accounts.id, accountId)).execute();
    }
    async deleteSession(sessionId) {
        await this.db.delete(_drizzle.sessions).where((0, _drizzleorm.eq)(_drizzle.sessions.id, sessionId)).execute();
    }
    async parseQuery({ query, value }) {
        const result = query === "email" ? (0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.users.email, value), (0, _drizzleorm.isNull)(_drizzle.users.deletedAt)) : query === "username" ? (0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.users.username, value), (0, _drizzleorm.isNull)(_drizzle.users.deletedAt)) : (0, _drizzleorm.and)((0, _drizzleorm.eq)(_drizzle.users.id, value), (0, _drizzleorm.isNull)(_drizzle.users.deletedAt));
        return result;
    }
    constructor(db, hashService){
        _define_property(this, "db", void 0);
        _define_property(this, "hashService", void 0);
        this.db = db;
        this.hashService = hashService;
    }
};
UsersService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _drizzle.InjectDrizzle)()),
    _ts_param(1, (0, _common.Inject)(_utils.HashService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Database === "undefined" ? Object : Database,
        typeof _utils.HashService === "undefined" ? Object : _utils.HashService
    ])
], UsersService);

//# sourceMappingURL=users.service.js.map