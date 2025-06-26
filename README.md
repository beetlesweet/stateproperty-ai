# Stateproperty AI

## Prerequisites
- **Node.js** v18 or higher
- **pnpm** package manager

## Getting Started

Install dependencies and launch the development server:

```bash
pnpm install
pnpm dev
```

The app will start on `http://localhost:3000`.

## Environment Variables

The project uses the AI SDK packages for OpenAI and Anthropic. Add a `.env` file in the repository root with your API keys:

```env
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

These variables are required for routes under `app/api/*` that interact with the models.
If `ANTHROPIC_API_KEY` is not set (and `OPENAI_API_KEY` when using OpenAI models),
the API routes will respond with a 500 error.

## Build and Lint

Install dependencies before running the build or lint commands:

```bash
pnpm install
pnpm lint
pnpm build
```

## License

This project is licensed under the [MIT License](LICENSE).

