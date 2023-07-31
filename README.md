# Vite Custom Imports 📂

To create custom paths in vite is very simple, you must create an alias within the vite configuration object as follows:

```ts
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': `${path.resolve(__dirname, `./src/components`)}`,
            '@utilities': `${path.resolve(__dirname, `./src/utilities`)}`,
        },
    },
});
```

And then the `tsconfig.json` is modified with the same paths inside `compilerOptions`.

```json
"baseUrl": ".",
"paths": {
    "@components": [
    "./src/components"
    ],
    "@utilities": [
    "./src/utilities"
    ]
}
```

As I said before, it's not difficult at all, the problem is that it can be a big hassle to add this configuration every time a new folder is created inside the `./src`, to solve this is the following configuration.

## Required dependencies 📦
- [@type/node](https://www.npmjs.com/package/@types/node)

## The magic of automation ✨
The `imports.custom.ts` file found in this same repository is made up of 4 functions.

- **_getFoldersName_**: Gets the names of the surface folders inside `./src`.
- **_getFoldersAbsolutePath_**: Returns the absolute path of the folders inside `./src`, this function will take care of adding the necessary aliases in our defineConfig function.
- **_getFoldersRelativePath_**: Returns the relative path of the folders within `./src`, 
- **_parseTsConfig_**: This function edit the tsconfig.json file to add the generated paths.

_Your `vite.config.ts` should look like this:_

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { getFoldersAbsolutePath, parseTsConfig } from './imports.custom';

parseTsConfig();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: getFoldersAbsolutePath(),
  },
});

```

## Folder format 🗃️
Folders hosted within `./src` must have the following format:
```
└── /src
    └── /components
    |   ├── index.ts <- Barrel
    |   ├── Card.component.ts
    |   ├── Header.component.ts
    |   └── App.tsx
    └── /utilities
    |   ├── index.ts <- Barrel
    |   └── Math.utility.ts
    └── App.tsx
```

## Results 🚀

```ts
import { Card } from '@components';
import { randomNumber } from '@utilities';
```

If the `tsconfig.json` is not updated, the vite server must be restarted, this is done by pressing the `r` key in the console.