# Blog Web

Front end of my personal page and blog, built with React, Vite and Tailwind CSS.

## Tech stack

| Technology   | Version |
| ------------ | ------- |
| Node.js      | 24      |
| Yarn         | 1.22    |
| TypeScript   | 5.9     |
| React        | 19      |
| Vite         | 7       |
| React Router | 7       |
| Tailwind CSS | 4       |

## Requirements

- Node.js 24 (for example with [nvm](https://github.com/nvm-sh/nvm): `nvm install 24`)
- Yarn 1.22: `npm install --global yarn@^1.22`
- On Windows: WSL 2, with the repository kept inside the WSL file system

This project uses Yarn. Do not use npm to install packages, and always commit `yarn.lock`.

## Getting started

1. Clone the repository:

   ```shell
   git clone https://github.com/Kiru2115/blog-web.git
   cd blog-web
   ```

2. Install dependencies:

   ```shell
   yarn install
   ```

3. Start the development server:

   ```shell
   yarn dev
   ```

   The app runs at http://localhost:5173.

## API

The back end lives in a separate repository: [Kiru2115/blog-api](https://github.com/Kiru2115/blog-api).
Run it with Docker as its README says. Locally the API is available at http://localhost,
with Swagger documentation at http://localhost/api.

## Available scripts

| Script            | What it does                         |
| ----------------- | ------------------------------------ |
| `yarn dev`        | Development server at localhost:5173 |
| `yarn build`      | Production build                     |
| `yarn preview`    | Preview of the production build      |
| `yarn test --run` | Unit tests (Vitest), single run      |
| `yarn lint`       | Lint with Biome                      |
| `yarn lint:fix`   | Lint and fix with Biome              |
| `yarn storybook`  | Storybook at localhost:6006          |

Biome also runs automatically before every commit (Husky).