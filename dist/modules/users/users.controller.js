"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersController", {
    enumerable: true,
    get: function() {
        return UsersController;
    }
});
const _common = require("@nestjs/common");
const _usersservice = require("./users.service");
const _userstypes = require("./users.types");
const _utils = require("../../utils");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let UsersController = class UsersController {
    async getUser(id) {
        const result = await this.usersService.getUser({
            query: "id",
            value: id
        });
        if (!result) throw new _common.HttpException("User not found", _common.HttpStatus.NOT_FOUND);
        return {
            status: "ok",
            statusCode: 200,
            data: result
        };
    }
    async getUsers() {
        const users = await this.usersService.getUsers();
        if (!users) return {
            status: "error",
            statusCode: 500,
            message: "Error retrieving users"
        };
        return {
            status: "ok",
            statusCode: 200,
            data: users
        };
    }
    async updateUser(id, updateUserDto) {
        const result = await this.usersService.updateUser(id, updateUserDto);
        if (!result) throw new _common.HttpException("User not found", _common.HttpStatus.NOT_FOUND);
        return {
            status: "ok",
            statusCode: 200,
            data: result
        };
    }
    async activateUser(id) {
        const result = await this.usersService.activateUser(id);
        if (!result) throw new _common.HttpException("User not found", _common.HttpStatus.NOT_FOUND);
        return {
            status: "ok",
            statusCode: 200,
            data: result
        };
    }
    async deactivateUser(id) {
        const result = await this.usersService.deactivateUser(id);
        if (!result) throw new _common.HttpException("User not found", _common.HttpStatus.NOT_FOUND);
        return {
            status: "ok",
            statusCode: 200,
            data: result
        };
    }
    async deleteUser(userId) {
        const result = await this.usersService.deleteUser(userId);
        if (!result) throw new _common.HttpException("User not found", _common.HttpStatus.NOT_FOUND);
        return {
            status: "ok",
            statusCode: 200,
            data: result
        };
    }
    constructor(usersService){
        _define_property(this, "usersService", void 0);
        this.usersService = usersService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _utils.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], UsersController.prototype, "getUser", null);
_ts_decorate([
    (0, _utils.Public)(),
    (0, _common.Get)("all"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], UsersController.prototype, "getUsers", null);
_ts_decorate([
    (0, _common.Patch)(),
    _ts_param(0, (0, _utils.UserId)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _userstypes.UpdateUserDto === "undefined" ? Object : _userstypes.UpdateUserDto
    ])
], UsersController.prototype, "updateUser", null);
_ts_decorate([
    (0, _common.Patch)("activate"),
    _ts_param(0, (0, _utils.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], UsersController.prototype, "activateUser", null);
_ts_decorate([
    (0, _common.Patch)("deactivate"),
    _ts_param(0, (0, _utils.UserId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], UsersController.prototype, "deactivateUser", null);
_ts_decorate([
    (0, _common.Delete)(":id"),
    _ts_param(0, (0, _common.Query)("userId")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ])
], UsersController.prototype, "deleteUser", null);
UsersController = _ts_decorate([
    (0, _common.Controller)("users"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService
    ])
], UsersController);

//# sourceMappingURL=users.controller.js.map