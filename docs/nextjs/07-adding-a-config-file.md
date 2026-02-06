# Adding a global config file

- I like creating a `src/lib/config.ts` file to help organize various global variables.
- A simple skeletal boilerplate is below

```ts
try {
  process.loadEnvFile();
} catch (err) {
  console.log("unable to read env file");
  console.error(err);
}

type SiteConfig = {
  db: DBConfig;
};
type DBConfig = {
  url: string;
};

const config: SiteConfig = {
  db: {
    url: getEnvOrThrow("DATABASE_URL"),
  },
};

export default config;

function getEnvOrThrow(envName: string): string {
  const envValue = process.env[envName];
  if (!envValue) {
    throw new Error(`ENV variable ${envName} not found`);
  }
  return envValue;
}
```
