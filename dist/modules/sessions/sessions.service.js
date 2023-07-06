"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SessionsService", {
    enumerable: true,
    get: function() {
        return SessionsService;
    }
});
const _common = require("@nestjs/common");
const _drizzle = require("../drizzle/index");
const _drizzleorm = require("drizzle-orm");
const _utils = require("../../utils");
const _utils1 = require("../utils/index");
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
let SessionsService = class SessionsService {
    async createSession(createSessionDto) {
        const expiration = await this.generateExpiration();
        const { userId, refreshToken: rt } = createSessionDto;
        const id = (0, _utils.cuid)();
        const refreshToken = await this.hashService.hash(rt);
        const [session] = await this.db.insert(_drizzle.sessions).values({
            expiration,
            id,
            refreshToken,
            userId
        }).returning();
        return session;
    }
    async validateSession(userId) {
        const session = await this.db.query.sessions.findFirst({
            where: (0, _drizzleorm.eq)(_drizzle.sessions.userId, userId)
        });
        if (session && session.expiration < new Date()) return false;
        return session ? true : false;
    }
    async updateSession(userId, updateSessionDto) {
        try {
            const expiration = await this.generateExpiration();
            if (updateSessionDto.type === "login") {
                const session = await this.db.transaction(async (tx)=>{
                    const result = await tx.query.sessions.findFirst({
                        where: (0, _drizzleorm.eq)(_drizzle.sessions.userId, userId)
                    });
                    if (!result) throw new Error("Session does not exist");
                    const refreshToken = await this.hashService.hash(updateSessionDto.refreshToken);
                    const [session] = await tx.update(_drizzle.sessions).set({
                        expiration,
                        refreshToken
                    }).where((0, _drizzleorm.eq)(_drizzle.sessions.userId, userId)).returning();
                    return session;
                });
                return session;
            }
            const session = await this.db.transaction(async (tx)=>{
                const result = await tx.query.sessions.findFirst({
                    where: (0, _drizzleorm.eq)(_drizzle.sessions.userId, userId)
                });
                if (!result) throw new Error("Session not found");
                if (!await this.hashService.compare(updateSessionDto.oldRefreshToken, result.refreshToken)) throw new Error("Not authorized");
                const refreshToken = await this.hashService.hash(updateSessionDto.newRefreshToken);
                const [session] = await tx.update(_drizzle.sessions).set({
                    expiration,
                    refreshToken
                }).where((0, _drizzleorm.eq)(_drizzle.sessions.userId, userId)).returning();
                return session;
            });
            return session;
        } catch (error) {
            if (error instanceof Error) throw new _common.HttpException(error.message, _common.HttpStatus.UNAUTHORIZED);
        }
    }
    async generateExpiration() {
        return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    }
    constructor(hashService, db){
        _define_property(this, "hashService", void 0);
        _define_property(this, "db", void 0);
        this.hashService = hashService;
        this.db = db;
    }
};
SessionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_utils1.HashService)),
    _ts_param(1, (0, _drizzle.InjectDrizzle)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _utils1.HashService === "undefined" ? Object : _utils1.HashService,
        typeof _drizzle.Database === "undefined" ? Object : _drizzle.Database
    ])
], SessionsService);

//# sourceMappingURL=sessions.service.js.map