"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoomsGateway", {
    enumerable: true,
    get: function() {
        return RoomsGateway;
    }
});
const _websockets = require("@nestjs/websockets");
const _common = require("@nestjs/common");
const _roomsconstants = require("./rooms.constants");
const _roomsservice = require("./rooms.service");
const _decorators = require("../decorators/index");
const _wsguard = require("../ws.guard");
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
let RoomsGateway = class RoomsGateway {
    async createRoom(socket, currentUserId, data) {
        const room = await this.roomsService.createRoom({
            creatorId: currentUserId,
            users: data.userIds
        });
        socket.join(room.id);
        socket.emit(currentUserId, {
            status: "ok",
            statusCode: 201,
            data: room
        });
    }
    async joinRooms(socket, currentUserId) {
        const rooms = await this.roomsService.joinAllAssociatedRooms(currentUserId);
        for (const room of rooms){
            await socket.join(room.id);
        }
        socket.emit(currentUserId, {
            status: "ok",
            statusCode: 200,
            data: rooms
        });
    }
    constructor(roomsService){
        _define_property(this, "roomsService", void 0);
        _define_property(this, "server", void 0);
        this.roomsService = roomsService;
    }
};
_ts_decorate([
    (0, _websockets.WebSocketServer)(),
    _ts_metadata("design:type", typeof Server === "undefined" ? Object : Server)
], RoomsGateway.prototype, "server", void 0);
_ts_decorate([
    (0, _common.UseGuards)(_wsguard.WsGuard),
    (0, _websockets.SubscribeMessage)(_roomsconstants.SUBSCRIPTIONS["create room"]),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_param(1, (0, _decorators.CurrentUserId)()),
    _ts_param(2, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Socket === "undefined" ? Object : Socket,
        String,
        Object
    ])
], RoomsGateway.prototype, "createRoom", null);
_ts_decorate([
    (0, _common.UseGuards)(_wsguard.WsGuard),
    (0, _websockets.SubscribeMessage)(_roomsconstants.SUBSCRIPTIONS["join rooms"]),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_param(1, (0, _decorators.CurrentUserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Socket === "undefined" ? Object : Socket,
        String
    ])
], RoomsGateway.prototype, "joinRooms", null);
RoomsGateway = _ts_decorate([
    (0, _websockets.WebSocketGateway)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roomsservice.RoomsService === "undefined" ? Object : _roomsservice.RoomsService
    ])
], RoomsGateway);

//# sourceMappingURL=rooms.gateway.js.map