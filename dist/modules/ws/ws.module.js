"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WsModule", {
    enumerable: true,
    get: function() {
        return WsModule;
    }
});
const _common = require("@nestjs/common");
const _messages = require("./messages/index");
const _rooms = require("./rooms/index");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WsModule = class WsModule {
};
WsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _messages.MessageModule,
            _rooms.RoomsModule
        ]
    })
], WsModule);

//# sourceMappingURL=ws.module.js.map