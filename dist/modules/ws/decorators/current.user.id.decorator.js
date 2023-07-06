"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CurrentUserId", {
    enumerable: true,
    get: function() {
        return CurrentUserId;
    }
});
const _common = require("@nestjs/common");
const CurrentUserId = (0, _common.createParamDecorator)((data, ctx)=>{
    const user = ctx.switchToWs().getClient()["user"];
    return user["id"];
});

//# sourceMappingURL=current.user.id.decorator.js.map