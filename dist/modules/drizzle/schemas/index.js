"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_export_star(require("./accounts"), exports);
_export_star(require("./messages"), exports);
_export_star(require("./recipes"), exports);
_export_star(require("./rooms"), exports);
_export_star(require("./sessions"), exports);
_export_star(require("./users"), exports);
_export_star(require("./usersToRecipes"), exports);
_export_star(require("./usersToRooms"), exports);
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