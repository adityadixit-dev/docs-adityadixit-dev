# Generic Function to add an entry to the Database

- This is a higher order function

## Appendix - Full Code

```tsx title="add-action-function-creator" caption=""
import { ActionFunctionType } from "@/types/form-types";
import { logToConsoleInDev } from "./log-in-dev-mode";
import { validateFormDataWithZodSchema } from "./validate-formdata-with-zodtype";
import { revalidatePath } from "next/cache";
import { errorMsgToString } from "./formstate-error-to-string";
import { AnyPgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { addRowToDb } from "@/lib/db/queries/generic/add-row-to-db";

export function addActionFunctionCreator<T extends AnyPgTable>(
  dbTable: T,
  pathToRevalidate: string,
): ActionFunctionType {
  return async (prevState, formData) => {
    if (prevState.success && prevState.message === "") {
      logToConsoleInDev("First Call to Action Function");
    }

    try {
      const rawData = Object.fromEntries(formData);
      const insertSchema = createInsertSchema(dbTable);
      const validatedData = validateFormDataWithZodSchema(
        insertSchema,
        rawData,
      );
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
