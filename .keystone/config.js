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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  configAPI: () => configAPI,
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core4 = require("@keystone-6/core");

// src/schemas/course.schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");

// src/auth/permissions.ts
var isAdmin = ({ session: session2 }) => (session2 == null ? void 0 : session2.data.role) === "admin";

// src/schemas/course.schema.ts
var courseSchema = (0, import_core.list)({
  access: {
    operation: (0, import_access.allOperations)(isAdmin)
  },
  fields: {
    title: (0, import_fields.text)({ validation: { isRequired: true } }),
    description: (0, import_fields.text)({ validation: { isRequired: true } }),
    slug: (0, import_fields.text)({
      isIndexed: "unique",
      validation: {
        isRequired: true,
        match: {
          regex: /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/,
          explanation: "The slug must only contain letters and numbers as well as (_-)"
        }
      }
    }),
    enrolledOn: (0, import_fields.relationship)({ ref: "Enrollment.course", many: true }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" },
      ui: { createView: { fieldMode: "hidden" } }
    }),
    updatedAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" },
      ui: { createView: { fieldMode: "hidden" } },
      db: { updatedAt: true }
    })
  },
  ui: { label: "Courses" },
  db: { map: "courses" }
});

// src/schemas/enrollment.schema.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");

// src/utils/alreadyEnrolledOn.ts
function alreadyEnrolledOn(prisma, student, course) {
  return __async(this, null, function* () {
    const enrollmentExists = yield prisma.enrollment.findFirst({
      where: {
        courseId: course.connect.id,
        studentId: student.connect.id
      }
    });
    if (enrollmentExists) {
      throw new Error(`User already enrolled`);
    }
  });
}

// src/schemas/enrollment.schema.ts
var enrollmentSchema = (0, import_core2.list)({
  access: {
    operation: (0, import_access2.allOperations)(isAdmin)
  },
  fields: {
    student: (0, import_fields2.relationship)({
      ref: "User.enrollments"
    }),
    course: (0, import_fields2.relationship)({ ref: "Course.enrolledOn" }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" }
    }),
    updatedAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" },
      db: { updatedAt: true }
    })
  },
  hooks: {
    validateInput(_0) {
      return __async(this, arguments, function* ({
        inputData: { student, course },
        context: { prisma }
      }) {
        return alreadyEnrolledOn(prisma, student, course);
      });
    }
  },
  db: { map: "enrollments" }
});

// src/schemas/user.schema.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var userSchema = (0, import_core3.list)({
  access: {
    operation: (0, import_access3.allOperations)(isAdmin)
  },
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    email: (0, import_fields3.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    role: (0, import_fields3.select)({
      type: "enum",
      options: [
        { label: "isAdmin", value: "admin" },
        { label: "isStudent", value: "student" }
      ],
      validation: { isRequired: true },
      ui: { displayMode: "select" }
    }),
    password: (0, import_fields3.password)({
      validation: { isRequired: true }
    }),
    enrollments: (0, import_fields3.relationship)({ ref: "Enrollment.student", many: true }),
    createdAt: (0, import_fields3.timestamp)({
      defaultValue: { kind: "now" }
    })
  },
  ui: { label: "Users" },
  db: { map: "users" }
});

// src/schemas/index.ts
var schemas = {
  User: userSchema,
  Course: courseSchema,
  Enrollment: enrollmentSchema
};

// src/auth/index.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var _a;
var sessionSecret = (_a = process.env.SESSION_SECRET) != null ? _a : "default-secret";
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
var _a2;
var dbConfig = {
  provider: "postgresql",
  url: (_a2 = process.env.DATABASE_URL) != null ? _a2 : "",
  shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  useMigrations: true
};

// keystone.ts
var configAPI = {
  api: {
    bodyParser: false
  }
};
var keystone_default = withAuth(
  (0, import_core4.config)({
    db: dbConfig,
    lists: schemas,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configAPI
});
