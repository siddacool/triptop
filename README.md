# Triptop

Simple, offline travel budgeting app.

![img](https://triptop.siddheshmangela.com/assets/social/og_image.png)

---

## Development

### Prerequisites

This project uses **pnpm**.

Requirements:

- Node.js 24+
- pnpm 11+

Verify your installation:

```bash
node -v
pnpm -v
```

### Setup

```bash
git clone git@github.com:siddacool/triptop.git
cd triptop
pnpm install
```

### Development

Start the local development server:

```bash
pnpm dev
```

Expose the development server on your local network:

```bash
pnpm dev --host
```

The application is available at:

```
http://localhost:5173
```

### Scripts

| Command           | Description                                        |
| ----------------- | -------------------------------------------------- |
| `pnpm dev`        | Start the development server.                      |
| `pnpm dev --host` | Expose the dev server on your local network.       |
| `pnpm build`      | Create a production build.                         |
| `pnpm preview`    | Preview the production build.                      |
| `pnpm storybook`  | Start Storybook.                                   |
| `pnpm test`       | Run unit tests.                                    |
| `pnpm check`      | Run type checking, linting, and formatting checks. |
| `pnpm check:fix`  | Run checks and automatically format files.         |

### Recommended Workflow

```bash
pnpm install
pnpm dev
pnpm check
pnpm test
pnpm build
```
