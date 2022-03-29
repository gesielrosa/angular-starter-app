# Angular Starter Application

Angular version: `13.1.3`

### Preconfigured
```
- Angular Universal (server side rendering)
- i18n (Multi languages)
- Cache http requests state (server state to client state)
- Cookies
- Dotenv environments setup
- registerLocaleData (pt)
- ESLint
- Prettier
```

### Environments

- Create a `.env` file in project root;
- Use `.env.EXAMPLE` as example;
- Exec `npm run config` command to generate TS environment file;

### i18n - Multi languages

- There are two preconfigured languages, `pt-br` and `en-us`;
- You can add more creating `.json` files with language short name in `assets/i18n/`;
- To change language in runtime, use `LanguageService` to do this;
- [Read docs](https://github.com/ngx-translate/core)

### Cookies

- Persist data with cookie (Good to use in SSR, for auth, for example);
- Use `CookiesService` to manage cookies;
- [Read docs](https://github.com/salemdar/ngx-cookie)

### Cache - Transfer State

- All success http requests are cached and transferred to client app (to avoid double requests);
- You can make changes in `BrowserStateInterceptor` to improve cache method;

### Prettier

- Exec `npm run prettier` to format files;
- [Read docs](https://prettier.io/docs/en/index.html)

### Linter (ESLint)

- Exec `npm run lint` to analyze files;
- [Read docs](https://github.com/angular-eslint/angular-eslint)

### Run dev server

- Exec `npm run start` to run dev server;
- Exec `npm run start:ssr` to run dev SSR server;

### Build production

#### Client only

- Exec `npm run build` to build client app only;
- Browser dist files are in `dist/my-app/browser`;

#### Client and server

- Exec `npm run build:ssr` to build client and server;
- Browser dist files are in `dist/my-app/browser`;
- Server dist files are in `dist/my-app/server`;

<hr>

[@gesielrosa](https://gesiel.com)
