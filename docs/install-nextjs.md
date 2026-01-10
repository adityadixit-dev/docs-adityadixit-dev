# [NextJS](https://nextjs.org/)

## Install NextJs

```bash
npx create-next-app@latest .
```

## Clean boilerplate code

- In `app/globals.css` remove everything except `@import "tailwindcss";`
- Delete `svg` files from the `public` folder

```tsx title="app/page.tsx" caption="Display a simple component for testing"
export default function RootHomePage() {
  return (
    <article>
      <h1>Home Page</h1>
      <p> Simple template</p>
    </article>
  );
}
```

- _Optional_ : set up favicon in `app/favicon.ico` or `app/icon.png` using [favicon](https://favicon.io/)
- Test using `npm run dev` and see if everything is running correctly
