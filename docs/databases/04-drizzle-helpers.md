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

## Get all Rows from Database Table

- **NOTE** : Ensure that `src/lib/db/index.ts` exists and returns the database
- Create a file inside the `src/lib/db/generics/` folder

```ts title="get-all-rows-from-db-table.ts" caption="Returns all rows in a Database Table"
import { AnyPgColumn, type AnyPgTable } from "drizzle-orm/pg-core";
import { desc } from "drizzle-orm";
import { db } from "..";
import { logErrorToConsoleInDev } from "@/utils/logging/logging-in-dev-mode";

/**
 * Fetch all rows from the given table, ordered by updatedAt (descending).
 *
 * Requirements:
 * - The table type T must expose an updatedAt column (as AnyPgColumn) to enable sorting.
 *
 * Behavior:
 * - On success: returns all rows depending on the DB Table schema
 * - On error: logs the error via logErrorToConsoleInDev and returns an empty array.
 *
 * @param dbTable - The table to query.
 * @returns The rows from the table as an Array, ordered by updatedAt descending.
 */
export async function getAllRowsFromDbTable<T extends AnyPgTable>(
  dbTable: T & { updatedAt: AnyPgColumn },
): Promise<T["$inferSelect"][]> {
  try {
    const results = await db
      .select()
      .from(dbTable as AnyPgTable)
      .orderBy(desc(dbTable.updatedAt));
    return results;
  } catch (err) {
    logErrorToConsoleInDev(err);
    return [];
  }
}
```

## Add a row to a Database Table

```ts title="add-row-to-db-table.ts" caption=""
import { AnyPgTable } from "drizzle-orm/pg-core";
import { logErrorToConsoleInDev } from "@/utils/logging/logging-in-dev-mode";
import { db } from "..";

/**
 * Inserts a validated row into a PostgreSQL table using Drizzle ORM and returns the inserted row.
 *
 * The function performs an insert with the provided table and data, then returns the
 * inserted row as inferred by the table's Select type. If the insert fails or the result
 * is not produced, it returns null. In development mode, any error is logged to the console.
 *
 * @param dbTable The Drizzle table instance to insert into.
 * @param validatedData This should have been validated and fit the schema for the Table
 * @returns The inserted row (inferred as T["$inferSelect"]) or null on failure.
 */
export async function addRowToDb<T extends AnyPgTable>(
  dbTable: T,
  validatedData: T["$inferInsert"],
): Promise<T["$inferSelect"] | null> {
  try {
    const [result] = await db.insert(dbTable).values(validatedData).returning();
    return result ?? null;
  } catch (err) {
    logErrorToConsoleInDev(err);
    return null;
  }
}
```
