"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChatGateway", {
    enumerable: true,
    get: function() {
        return ChatGateway;
    }
});
const _websockets = require("@nestjs/websockets");
const _common = require("@nestjs/common");
const _messageservice = require("./message.service");
const _decorators = require("../decorators/index");
const _wsguard = require("../ws.guard");
const _messageconstants = require("./message.constants");
const _messagetypes = require("./message.types");
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
let ChatGateway = class ChatGateway {
    async connect(socket, userId, data) {
        const message = await this.messageService.createMessage(userId, data);
        socket.to(message.roomId).emit("messages", message);
    //notification service here to add the notification at the create message level
    }
    constructor(messageService){
        _define_property(this, "messageService", void 0);
        _define_property(this, "server", void 0);
        this.messageService = messageService;
    }
};
_ts_decorate([
    (0, _websockets.WebSocketServer)(),
    _ts_metadata("design:type", typeof Server === "undefined" ? Object : Server)
], ChatGateway.prototype, "server", void 0);
_ts_decorate([
    (0, _common.UseGuards)(_wsguard.WsGuard),
    (0, _websockets.SubscribeMessage)(_messageconstants.SUBSCRIPTIONS["send message"]),
    _ts_param(0, (0, _websockets.ConnectedSocket)()),
    _ts_param(1, (0, _decorators.CurrentUserId)()),
    _ts_param(2, (0, _websockets.MessageBody)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Socket === "undefined" ? Object : Socket,
        String,
        typeof _messagetypes.CreateMessageDto === "undefined" ? Object : _messagetypes.CreateMessageDto
    ])
], ChatGateway.prototype, "connect", null);
ChatGateway = _ts_decorate([
    (0, _websockets.WebSocketGateway)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messageservice.MessageService === "undefined" ? Object : _messageservice.MessageService
    ])
], ChatGateway);

//# sourceMappingURL=message.gateway.js.map