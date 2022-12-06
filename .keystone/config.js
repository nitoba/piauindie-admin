"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  configAPI: () => configAPI,
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// src/schemas/user.schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// src/auth/permissions.ts
var isAdmin = ({ session: session2 }) => session2?.data.role === "admin";

// src/schemas/user.schema.ts
var userSchema = (0, import_core.list)({
  access: {
    operation: (0, import_access.allOperations)(isAdmin)
  },
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    role: (0, import_fields.select)({
      type: "enum",
      options: [
        { label: "isAdmin", value: "admin" },
        { label: "isStudent", value: "student" }
      ],
      validation: { isRequired: true },
      ui: { displayMode: "select" }
    }),
    password: (0, import_fields.password)({
      validation: { isRequired: true }
    }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// src/schemas/index.ts
var schemas = {
  User: userSchema
};

// src/auth/index.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET ?? "default-secret";
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "email role",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    itemData: { role: "admin" }
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// src/db-config.ts
var dbConfig = {
  provider: "postgresql",
  url: process.env.DATABASE_URL ?? "",
  shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  enableLogging: true,
  useMigrations: true
};

// keystone.ts
var configAPI = {
  api: {
    bodyParser: false
  }
};
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: dbConfig,
    lists: schemas,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configAPI
});
