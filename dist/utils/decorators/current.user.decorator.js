"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CurrentUser", {
    enumerable: true,
    get: function() {
        return CurrentUser;
    }
});
const _common = require("@nestjs/common");
const CurrentUser = (0, _common.createParamDecorator)((data, context)=>{
    const request = context.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
});

//# sourceMappingURL=current.user.decorator.js.map