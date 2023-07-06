"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isValidEmail", {
    enumerable: true,
    get: function() {
        return isValidEmail;
    }
});
const _constants = require("../constants/index");
const isValidEmail = (email)=>{
    return _constants.emailRegex.test(email);
};

//# sourceMappingURL=is.valid.email.js.map