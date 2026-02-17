# Set Up Clerk for your App

- [Sign Into Clerk Dashboard](https://dashboard.clerk.com/apps)
- Create a new application
- Follow prompts for your framework

- Install Clerk for NextJS
- [NextJS Guide for Clerk](https://clerk.com/docs/nextjs/getting-started/quickstart)

```bash
npm install @clerk/nextjs
```

## Dev Mode

- Add API keys. Note these are the ones for development. We will talk about Production Mode later
- add `proxy.ts` which is the clerk middleware helper
- use `<ClerkProvider dynamic>` to wrap the `<html>` tags in the main `layout.tsx` for [dynamic rendering](https://clerk.com/docs/guides/development/rendering-modes)
- Implement [RBAC](https://clerk.com/docs/guides/secure/basic-rbac)

## Production Mode

- [Deploy to Production](https://clerk.com/docs/guides/development/deployment/production)
