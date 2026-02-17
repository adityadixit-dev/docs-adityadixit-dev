# Using Zod with Drizzle

- **NOTE** : drizzle-zod has been deprecated. So we will use zod directly with [drizzle-orm](https://orm.drizzle.team/docs/zod)
- Install [Zod](https://zod.dev/)

```bash
npm i zod
```

## Validate formdata with ZodSchema

- Create `src/utils/zod/validate-formdata-with-zodtype.ts`

```ts title="src/utils/zod/validate-formdata-with-zodtype.ts" caption="A Generate function to validate formdata based on underlying schemas"
import { ZodType } from "zod";

/**
 * Validate form data against a Zod schema that has been derived from drizzle and return the typed data.
 *
 * @param schema - Database schema derived from drizzle and zod
 * @param data - formdata recieved from user input
 * @returns The validated and parsed data matching the schema.
 * @throws {Error} If validation fails
 */
export function validateFormDataWithZodSchema<T>(
  schema: ZodType<T>,
  data: unknown,
) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorsList = result.error.issues.map((issue) => issue.message);
    throw new Error(errorsList.join(","));
  }
  return result.data;
}
```

## Helper - Convert Error to String

```ts title="src/utils/logging/error-message-to-string.ts" caption="returns the message component of an Error Object"
export function errorMsgToString(err: unknown): string {
  return err instanceof Error ? err.message : "Unknown Error Occurred";
}
```
