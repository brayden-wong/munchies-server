"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserId", {
    enumerable: true,
    get: function() {
        return UserId;
    }
});
const _common = require("@nestjs/common");
const UserId = (0, _common.createParamDecorator)((data, context)=>{
    const request = context.switchToHttp().getRequest();
    return request.user["id"];
});

//# sourceMappingURL=user.id.decorator.js.map