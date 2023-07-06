"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoomsService", {
    enumerable: true,
    get: function() {
        return RoomsService;
    }
});
const _common = require("@nestjs/common");
const _drizzle = require("../../drizzle");
const _functions = require("../../../utils/functions");
const _utils = require("../../utils");
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
let RoomsService = class RoomsService {
    async createRoom({ creatorId, users }) {
        const name = await this.generatorService.generateRoomName();
        const id = (0, _functions.cuid)();
        const [room] = await this.db.insert(_drizzle.rooms).values({
            id,
            name,
            creatorId
        }).returning();
        this.linkUsersToRooms([
            ...users,
            creatorId
        ], room.id);
        // await this.db.delete(rooms);
        return room;
    }
    async joinAllAssociatedRooms(userId) {
        const rooms = await this.db.query.usersToRooms.findMany({
            with: {
                room: true
            },
            where: (usersToRooms, { eq })=>{
                return eq(usersToRooms.userId, userId);
            }
        });
        return await this.transformData(rooms);
    }
    async transformData(value) {
        if (!Array.isArray(value)) {
            const { userId, room: { id, ...room } } = value;
            return {
                id,
                userId,
                ...room
            };
        }
        const rooms = [];
        for (const room of value){
            const { userId, room: { id, ...roomData } } = room;
            rooms.push({
                userId,
                id,
                ...roomData
            });
        }
        return rooms;
    }
    async linkUsersToRooms(users, roomId) {
        await this.db.insert(_drizzle.usersToRooms).values(users.map((userId)=>({
                userId,
                roomId
            })));
    }
    constructor(generatorService, db){
        _define_property(this, "generatorService", void 0);
        _define_property(this, "db", void 0);
        this.generatorService = generatorService;
        this.db = db;
    }
};
RoomsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_utils.GeneratorService)),
    _ts_param(1, (0, _drizzle.InjectDrizzle)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _utils.GeneratorService === "undefined" ? Object : _utils.GeneratorService,
        typeof _drizzle.Database === "undefined" ? Object : _drizzle.Database
    ])
], RoomsService);

//# sourceMappingURL=rooms.service.js.map