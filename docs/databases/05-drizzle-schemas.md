# Skeleton of a Schema

## Imports

```ts
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestampsHelper } from "../helpers/timestamps.helpers";
import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";
```

## Export the Table

- We will be using the timestamp helper created before

```ts
export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  subjectName: text("subject_name").notNull().unique(),
  ...timestampsHelper,
});
```

## Zod Schema to be used for Validations

```ts
export const subjectsInsertSchema = createInsertSchema(subjects, {
  subjectName: (s) =>
    s
      .min(4, { error: "Subject Name Should be atleast 4 characters" })
      .max(40, { error: "Subject Name has to be less than 40 charachters" }),
});
```

## Export types for Select and Insert Operations

- Better to use the infer type from zod instead of the `$inferInsert`

```ts
export type SubjectsSelectType = typeof subjects.$inferSelect;
// However infer the type using zod for the insert schema.
export type SubjectsInsertType = z.infer<typeof subjectsInsertSchema>;

// export type SubjectsInsertType = typeof subjects.$inferInsert
```
