"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DrizzleService", {
    enumerable: true,
    get: function() {
        return DrizzleService;
    }
});
const _common = require("@nestjs/common");
const _schedule = require("@nestjs/schedule");
const _drizzleconstants = require("./drizzle.constants");
const _drizzletypes = require("./drizzle.types");
const _schemas = require("./schemas/index");
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
let DrizzleService = class DrizzleService {
    async reconnectDb() {
        const result = await this.db.select().from(_schemas.users).where((0, _drizzleorm.eq)(_schemas.users.id, ""));
    }
    constructor(db){
        _define_property(this, "db", void 0);
        this.db = db;
    }
};
_ts_decorate([
    (0, _schedule.Cron)(_schedule.CronExpression.EVERY_5_MINUTES),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], DrizzleService.prototype, "reconnectDb", null);
DrizzleService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _drizzleconstants.InjectDrizzle)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _drizzletypes.Database === "undefined" ? Object : _drizzletypes.Database
    ])
], DrizzleService);

//# sourceMappingURL=drizzle.service.js.map