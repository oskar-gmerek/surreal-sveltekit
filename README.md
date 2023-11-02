# Surreal Sveltekit: A Starter Kit with SurrealDB and SvelteKit, featuring Authentication and CRUD Operations + Realtime

## Auth

https://github.com/oskar-gmerek/surreal-sveltekit/assets/53402105/e6df634b-e062-4154-b153-71a0c0735c3a

### Username Validation

https://github.com/oskar-gmerek/surreal-sveltekit/assets/53402105/8ef24ab4-672e-4669-bd26-f7580523907a

## CRUD & Realtime

https://github.com/oskar-gmerek/surreal-sveltekit/assets/53402105/30232b45-a5a9-4368-bc0b-095c11b6ef5e

## Requirements:
- [Docker](https://www.docker.com/products/docker-desktop)
- Ensure that ports `5173` and `8000` are available for use.

## Modern Stack:
- `SurrealDB` - The ultimate multi-model database
- `surrealdb.js` for interacting with awesome [SurrealDB](https://surrealdb.com)
- `sveltekit-superforms` + `zod` to enable super powers in working with forms - [Superforms](https://superforms.rocks/) | [Zod](https://zod.dev/)
- `@master/css.svelte` as an interesting alternative for TailwindCSS - [MasterCSS](https://beta.css.master.co/docs/installation)
- `dayjs` to enable high level of DX in working with time and dates - [Day.js](https://day.js.org/)


## Setup Process:

1. Clone the repository to your local machine.
2. Install dependencies. For example:
```ts
bun install
```
If you don't have [bun](https://bun.sh) installed, you can utilize pnpm or any other Node.js package manager. For instance:
```
pnpm install
```
3. Execute the provided npm script. For example:
```ts
bun run multitaskum:developum
```
If you don't have [bun](https://bun.sh) installed, you can utilize pnpm or any other Node.js package manager. For instance:
```ts
pnpm run multitaskum:developum
```
This command will initiate SurrealDB within a Docker container and launch SvelteKit in your local development environment.

4. Access [http://localhost:5173](http://localhost:5173) using your preferred web browser.
5. Test various functionalities such as creating a new account, logging in, generating new posts, editing posts, and deleting them.

## Issues and Contributions:

- If you encounter any issues (as I rushed a bit to meet the hacktoberfest deadline), please feel free to [open an issue](https://github.com/oskar-gmerek/surreal-sveltekit/issues).
- I am open to any contributions as I aspire to make this starter a top choice for initiating projects that utilize the best modern technologies.
