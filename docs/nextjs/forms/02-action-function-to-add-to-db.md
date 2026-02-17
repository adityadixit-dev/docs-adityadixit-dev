# Generic Function to add an entry to the Database

- This is a higher order function

## When **NOT** to use this

- If a scenario exists where a key in the `formData` object points to an array.
- In that Scenario you will need to use a different function to convert `formData` to `rawData`

### formDataToRaw Function

```ts title="formdata-to-raw.ts"
export function formDataToRaw(formData: FormData) {
  type FormDataToRawType = {
    [key: string]: FormDataEntryValue | FormDataEntryValue[];
  };

  const rawData: FormDataToRawType = {};
  for (const key of formData.keys()) {
    const val = formData.getAll(key);
    if (val.length === 1) {
      rawData[key] = val[0];
    } else if (val.length > 1) {
      rawData[key] = [...val];
    }
  }

  return rawData;
}
```

## Appendix - Full Code

```tsx title="src/lib/actions/add-to-db-action-fn-creator.ts" caption="Full Code with some Documentation"
import { ActionFunctionType } from "@/types/form-types";
import { revalidatePath } from "next/cache";
import { AnyPgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { logToConsoleInDev } from "@/utils/logging/logging-in-dev-mode";
import { validateFormDataWithZodSchema } from "@/utils/zod/validate-formdata-with-zodtype";
import { addRowToDb } from "../db/generics/add-row-to-db-table";
import { errorMsgToString } from "@/utils/logging/error-message-to-string";
import { formDataToRaw } from "@/utils/formdata-to-raw";
import { ZodType } from "zod";

export function addActionFunctionCreator<T extends AnyPgTable>(
  dbTable: T,
  customInsertSchema: ZodType | null = null,
  hasArrayInTable: boolean = false,
  pathToRevalidate: string = "/admin",
): ActionFunctionType {
  return async (prevState, formData) => {
    if (prevState.success && prevState.message === "") {
      logToConsoleInDev("First Call to Action Function");
    }

    try {
      const rawData = hasArrayInTable
        ? formDataToRaw(formData)
        : Object.fromEntries(formData);
      const insertSchema = customInsertSchema ?? createInsertSchema(dbTable);

      const validatedData = validateFormDataWithZodSchema(
        insertSchema,
        rawData,
      ) as T["$inferSelect"];
      const createdDataInDb = await addRowToDb(dbTable, validatedData);
      if (!createdDataInDb) {
        throw new Error("Unable to perform DB Action");
      }
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "Database Action Success",
      };
    } catch (err) {
      return {
        success: false,
        message: errorMsgToString(err),
      };
    }
  };
}
```
