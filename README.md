## Requirements

- docker
- nvm (optional)
- node version > 16
- please copy .env
  ```bash
  $ cp .env-local-example .env
  ```
- please generate the jwt secret key for your env variable
  ```bash
  $ node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
  ```
  [reference](https://stackoverflow.com/a/52996809)
- please rename the project in package.json and package-lock.json

## Installation

```bash
$ nvm use

$ npm i -g @nestjs/cli

$ npm install
```

## Running the app

```bash
$ npm run dev
```

- Why not use `npm run start:dev` directly?

  Because `npm run dev` will start up the database in docker for you.

## Database

- MySQL
- TypeORM

## Entity

- Please name the entity as `*.entity.ts`.

  Because in dataSource.ts option

  ```typescript
  entities: ['dist/**/*.entity{.ts,.js}'],
  ```

- Special Column doesn't work automatically like the document says

  [doc: typeorm special column](https://typeorm.io/entities#special-columns)

  But how to solve the problem?
  [Please check the reply to the issue here.](https://github.com/typeorm/typeorm/issues/4838#issuecomment-658481439)

- Please do not extend the `BaseEntity` class, which has `id`, `createdAt` and `updatedAt` property columns. Instead, use the snippets in `.vscode/typescript.code-snippets`.

  Because the column that you extend form `BaseEntity` class will always in the first position of the database table, it can be difficult to read the table at first glance.

  [issue: Allow to order columns](https://github.com/typeorm/typeorm/issues/541)

- Please put the `id` column in the first position of the database table, and put `createdAt` and `updatedAt` columns in the last position of the table.

i.g.

| user table |     |      |       |     |           |           |           |
| ---------- | --- | ---- | ----- | --- | --------- | --------- | --------- |
|            | id  | name | email | ... | createdAt | updatedAt | deletedAt |

## Migration

- How to generate a migration

  Turn the `dataSource.ts` option to `synchronize: false` and make some changes in any `*.entity.ts` files.

  ```bash
  $ npm run migration:generate --name=create-user
  ```

- How to run migrations

  ```bash
  npm run migration:run
  ```

## Helper Functions / Utility Functions

- How to add new helper function?

  e.g.

  in src/common/helper/sleep.ts

  ```typescript
  export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  ```

  in src/common/helper/index.ts

  ```typescript
  export * from './sleep';
  ```

  in anywhere

  ```typescript
  import { sleep } from '@/common/helper';
  ```

## DTO

- Please put dto into the `src/dto/request` and `src/dto/response` folder

## TODO

- A convention for throwing custom http exception message.
