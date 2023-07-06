"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoomsModule", {
    enumerable: true,
    get: function() {
        return RoomsModule;
    }
});
const _common = require("@nestjs/common");
const _roomsgateway = require("./rooms.gateway");
const _roomsservice = require("./rooms.service");
const _auth = require("../../auth");
const _utils = require("../../utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RoomsModule = class RoomsModule {
};
RoomsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _auth.AuthModule,
            _utils.UtilsModule
        ],
        providers: [
            _roomsgateway.RoomsGateway,
            _roomsservice.RoomsService
        ]
    })
], RoomsModule);

//# sourceMappingURL=rooms.module.js.map