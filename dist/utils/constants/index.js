"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./guards"), exports);
_export_star(require("./routes"), exports);
_export_star(require("./strategies"), exports);
_export_star(require("./regex"), exports);
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