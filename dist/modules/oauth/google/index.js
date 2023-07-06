"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./google.types"), exports);
_export_star(require("./google.oauth.guard"), exports);
_export_star(require("./google.oauth.strategy"), exports);
_export_star(require("./google.controller"), exports);
_export_star(require("./google.module"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}

//# sourceMappingURL=index.js.map