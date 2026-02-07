# Structure of a generic form container

- We will be using a container for all our forms
- This will allow us to use `useActionState` from react to manage submissions and status of the form.
- **NOTE** : The form takes an action function of `ActionFunctionType`. We will use a higher order function to generate these action functions to add to a DB

## Imports

```tsx
"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { ActionFunctionType, FormStateType } from "@/types/form-types";
```

- `"use client"` for the [useActionState](https://react.dev/reference/react/useActionState) and [useEffect](https://react.dev/reference/react/useEffect) hooks
- [toast](https://ui.shadcn.com/docs/components/radix/sonner) from sonner to display success or error messages as a toast
- A `SubmitButton` to handle pending and submit states.

### FormStateType

- This is the structure of how the state of the form looks like.
- It can be pretty much anything, so best to define a standard structure and stick to it
- This can also be used to define an `initialFormState`

```ts title="src/types/form-types.ts"
export type FormStateType = {
  success: boolean;
  message: string;
};
```

### ActionFunctionType

```ts title="src/types/form-types.ts"
export type ActionFunctionType = (
  prevState: FormStateType,
  formData: FormData,
) => Promise<FormStateType>;
```

## Props for the Form Container

```tsx
type FormContainerProps = {
  children: React.ReactNode;
  actionFn: ActionFunctionType;
  submitBtnText?: string;
  className?: string;
};
```

## The Form Container

- Define initial state to be a succes state with no message.
- apply `useEffect` on `state` to display a toast. No toast displayed if message is empty
- we will handle pending state in the `SubmitButton` instead of `isPending` from `useActionState`

```tsx
const initialFormState: FormStateType = { success: true, message: "" };

const FormContainer = ({
  children,
  actionFn,
  submitBtnText = "Submit",
  className = "",
}: FormContainerProps) => {
  const [state, formAction] = useActionState(actionFn, initialFormState);

  useEffect(() => {
    if (state.success) {
      if (state.message) {
        toast.success(state.message);
      }
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      className={cn(
        "flex flex-col gap-y-2 mt-4 p-4 border rounded-xl bg-secondary/50",
        className,
      )}
      action={formAction}
    >
      {children}
      <SubmitButton btnText={submitBtnText} />
    </form>
  );
};

export default FormContainer;
```

## Appendix - Generic Submit button

```tsx title="SubmitButton.tsx"
"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

type BtnSizeType = "default" | "lg" | "sm";
type SubmitButtonProps = {
  btnText: string;
  btnSize?: BtnSizeType;
  className?: string;
};

const SubmitButton = ({
  btnText = "Submit",
  btnSize = "lg",
  className = "",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size={btnSize}
      className={cn("w-full capitalize cursor-pointer", className)}
    >
      {pending ? (
        <>
          <RotateCw className="mr-2 h-4 w-4 animate-spin" /> Please wait...
        </>
      ) : (
        btnText
      )}
    </Button>
  );
};

export default SubmitButton;
```

## Appendix - Generic Form Container Example

```tsx title="FormContainer.tsx" caption="A generic container that takes input fields as children values"
"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { ActionFunctionType, FormStateType } from "@/types/form-types";

type FormContainerProps = {
  children: React.ReactNode;
  actionFn: ActionFunctionType;
  submitBtnText?: string;
  className?: string;
};

const initialFormState: FormStateType = { success: true, message: "" };

const FormContainer = ({
  children,
  actionFn,
  submitBtnText = "Submit",
  className = "",
}: FormContainerProps) => {
  const [state, formAction] = useActionState(actionFn, initialFormState);

  useEffect(() => {
    if (state.success) {
      if (state.message) {
        toast.success(state.message);
      }
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      className={cn(
        "flex flex-col gap-y-2 mt-4 p-4 border rounded-xl bg-secondary/50",
        className,
      )}
      action={formAction}
    >
      {children}
      <SubmitButton btnText={submitBtnText} />
    </form>
  );
};

export default FormContainer;
```
