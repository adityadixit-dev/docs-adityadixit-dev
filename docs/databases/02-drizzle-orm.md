# Drizzle ORM with Postgress

## [Install Drizzle ORM](https://orm.drizzle.team/docs/get-started/postgresql-new)

```bash
npm i drizzle-orm pg
```

- Install drizzle-kit as a dev dependency

```bash
npm i -D drizzle-kit tsx @types/pg
```

## `index.ts` for your Database

- Create `src/lib/db/index.ts`

```ts title="index.ts" caption="Export the Database for use everywhere"
import { drizzle } from "drizzle-orm/node-postgres";
import config from "@/lib/config";

export const db = drizzle(config.db.url);
```

## Files and Directory structure

- Create `src/lib/schema` to store database schemas. This way you can store schemas in [multiple files](https://orm.drizzle.team/docs/sql-schema-declaration#schema-in-multiple-files)
- Create two files `drizzle.config.local.ts` and `drizzle.config.prod.ts` one for local development and the other for your production database
- **NOTE** : We will need to modify the drizzle config files and some scripts in `package.json` to ensure migrations are handled correctly.
- While the main outline of both files is similar, there may be differences in the local developmental version and production versions later on

```ts title="drizzle.config.local.ts" caption="Local Development - Note the out directory"
import config from "@/lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema/**/*.ts",
  out: "./src/lib/db/migrations/local",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url,
  },
});
```

```ts title="drizzle.config.prod.ts" caption="Production - Ensure that ssl is turned on"
import config from "@/lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema/**/*.ts",
  out: "./src/lib/db/migrations/prod",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url,
    ssl: "require",
  },
});
```

## Adding scripts to `package.json`

```json title="package.json" caption="Adding the following scripts will simplify a lot of work later"
 "db:generate:dev": "drizzle-kit generate --config drizzle.config.local.ts",
 "db:migrate:dev": "drizzle-kit migrate --config drizzle.config.local.ts"
 "db:check:dev": "drizzle-kit check --config drizzle.config.local.ts",
 "db:dev": "npm run db:generate:dev && npm run db:migrate:dev && npm run db:check:dev",

 "db:generate:prod": "drizzle-kit generate --config drizzle.config.prod.ts",
 "db:migrate:prod": "drizzle-kit migrate --config drizzle.config.prod.ts",
 "db:check:prod": "drizzle-kit check --config drizzle.config.prod.ts",
 "db:prod": "npm run db:generate:prod && npm run db:migrate:prod && npm run db:check:prod",
```

- **CAUTION** : You could generate, migrate and check with either `npm run db:dev` or `npm run db:prod`. However use with caution!!
- More on drizzle kit migrations [here](https://orm.drizzle.team/docs/kit-overview)

## Setting up Neon DB with Vercel

- Select your project. Then in `settings` select `integrations`
- Go to `Browse Marketplace` and then select NeonDB. Follow the steps there and link it to you project
- If everything goes as planned you should see the connection in the `storage` tab of your project
- Vercel should automatically add `DATABASE_URL` to your production env variables

## Helpful tips

- Ensure that the `DATABASE_URL` has been set in the `.env` file
- Database related files go in the `src/lib/db` folder
