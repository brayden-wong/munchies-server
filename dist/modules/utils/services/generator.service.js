"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GeneratorService", {
    enumerable: true,
    get: function() {
        return GeneratorService;
    }
});
const _common = require("@nestjs/common");
const _uniqueusernamegenerator = require("unique-username-generator");
require("node-window-polyfill/register");
require("window-crypto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GeneratorService = class GeneratorService {
    async generateUsername(config = {
        dictionaries: [
            _uniqueusernamegenerator.adjectives,
            _uniqueusernamegenerator.nouns
        ],
        randomDigits: 5,
        length: 24,
        separator: " "
    }) {
        return await this.transformName((0, _uniqueusernamegenerator.uniqueUsernameGenerator)(config));
    }
    async generateRoomName(config = {
        dictionaries: [
            _uniqueusernamegenerator.adjectives,
            _uniqueusernamegenerator.nouns
        ],
        randomDigits: 4,
        length: 24,
        separator: " "
    }) {
        return await this.transformName((0, _uniqueusernamegenerator.uniqueUsernameGenerator)(config));
    }
    async transformName(value) {
        return value.split(" ").map((str)=>str[0].toUpperCase() + str.slice(1)).join("");
    }
};
GeneratorService = _ts_decorate([
    (0, _common.Injectable)()
], GeneratorService);

//# sourceMappingURL=generator.service.js.map