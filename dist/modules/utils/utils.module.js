"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UtilsModule", {
    enumerable: true,
    get: function() {
        return UtilsModule;
    }
});
const _common = require("@nestjs/common");
const _services = require("./services/index");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UtilsModule = class UtilsModule {
};
UtilsModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _services.HashService,
            _services.GeneratorService
        ],
        exports: [
            _services.HashService,
            _services.GeneratorService
        ]
    })
], UtilsModule);

//# sourceMappingURL=utils.module.js.map