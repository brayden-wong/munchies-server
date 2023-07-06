"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DrizzleModule", {
    enumerable: true,
    get: function() {
        return DrizzleModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _nodepostgres = require("drizzle-orm/node-postgres");
const _pg = require("pg");
const _schemas = /*#__PURE__*/ _interop_require_wildcard(require("./schemas/index"));
const _drizzleconstants = require("./drizzle.constants");
const _schedule = require("@nestjs/schedule");
const _drizzleservice = require("./drizzle.service");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DrizzleModule = class DrizzleModule {
};
DrizzleModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _schedule.ScheduleModule.forRoot()
        ],
        providers: [
            _drizzleservice.DrizzleService,
            {
                provide: (0, _drizzleconstants.getDrizzleConfigToken)(),
                inject: [
                    _config.ConfigService
                ],
                useFactory: async (config)=>{
                    const getDatabaseConfig = async ()=>{
                        return {
                            host: config.get("PG_HOST"),
                            database: config.get("PG_DATABASE"),
                            port: config.get("PG_PORT"),
                            user: config.get("PG_USER"),
                            password: config.get("PG_PASSWORD")
                        };
                    };
                    return await getDatabaseConfig();
                }
            },
            {
                provide: (0, _drizzleconstants.getDrizzleInstanceToken)(),
                inject: [
                    (0, _drizzleconstants.getDrizzleConfigToken)()
                ],
                useFactory: async ({ database, host, password, user, ...config })=>{
                    const connectionString = `postgres://${user}:${password}@${host}${process.env.NODE_ENV === "docker" ? `:${config.port}` : ""}/${database}`;
                    const client = new _pg.Client({
                        connectionString,
                        ssl: process.env.NODE_ENV === "production" ? true : process.env.NODE_ENV === "development" ? true : false
                    });
                    await client.connect();
                    const db = (0, _nodepostgres.drizzle)(client, {
                        logger: true,
                        schema: _schemas
                    });
                    return db;
                }
            }
        ],
        exports: [
            (0, _drizzleconstants.getDrizzleInstanceToken)()
        ]
    })
], DrizzleModule);

//# sourceMappingURL=drizzle.module.js.map