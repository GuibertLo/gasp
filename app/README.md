# GASP Web application

This web application has been developed using *Vue 3*.

## Project Setup

To install the dependencies, run the following command:

```sh
npm install
```

### Compile and Hot-Reload for Development

To run a development version of the application, run the following command:

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

To build a production version of the application, run the following command:

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

To run the unit tests, run the following command:

```sh
npm run test
```

### Run non-blocking Unit Tests

To run the unit tests without blocking the terminal, run the following command:

```sh
npm run test-unique
```

### Lint with [ESLint](https://eslint.org/)

To run the Lint tests, run the following command:

```sh
npm run lint
```


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.