"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getDrizzleConfigToken: function() {
        return getDrizzleConfigToken;
    },
    getDrizzleInstanceToken: function() {
        return getDrizzleInstanceToken;
    },
    InjectDrizzle: function() {
        return InjectDrizzle;
    }
});
const _common = require("@nestjs/common");
const DRIZZLE_CONFIG_TOKEN = "DRIZZLE_CONFIG_TOKEN";
const DRIZZLE_INJECTION_TOKEN = "DRIZZLE_INJECTION_TOKEN";
const getDrizzleConfigToken = ()=>DRIZZLE_CONFIG_TOKEN;
const getDrizzleInstanceToken = ()=>DRIZZLE_INJECTION_TOKEN;
const InjectDrizzle = ()=>(0, _common.Inject)(DRIZZLE_INJECTION_TOKEN);

//# sourceMappingURL=drizzle.constants.js.map