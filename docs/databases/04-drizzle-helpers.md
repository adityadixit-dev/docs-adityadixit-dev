# Helpers for Drizzle

## Timestamps [for all schemas](https://orm.drizzle.team/docs/sql-schema-declaration#advanced)

- Create a helpers folder `src/lib/db/helpers`

```ts title="src/lib/db/helpers/timestamps.helpers.ts" caption="You can just import timstamps for any schemas that need them"
import { timestamp } from "drizzle-orm/pg-core";

export const timestampsHelper = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};
```

## Logging Functions

- Create a `src/utils/logging` folder

```ts title="src/utils/logging/logging-in-dev-mode.ts" caption="Log to console, but only in Dev mode"
export function logToConsoleInDev(message: string): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  console.log(message);
}

export function logErrorToConsoleInDev(error: unknown): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  if (error instanceof Error) {
    console.error("Error:", error.message);
  } else {
    console.error("Not and instance of Error Object", error);
  }
}
```

## Get all Rows

- **NOTE** : Ensure that `src/lib/db/index.ts` exists and returns the database
