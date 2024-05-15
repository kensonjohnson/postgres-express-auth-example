# Express Fullstack Template with Auth

This app is bootstrapped with my [Express Fullstack Template](https://github.com/kensonjohnson/react-express-vite-template) and includes authentication using [Passport.js](http://www.passportjs.org/).
Sessions are stored in a PostgreSQL database using [connect-pg-simple](https://github.com/voxpelli/node-connect-pg-simple).

## Features

- **React**: Frontend built with React and Vite
- **Express**: Backend server built with Express
- **TypeScript**: JavaScript code is written in TypeScript
- **ESLint**: Linting with ESLint
- **Prettier**: Code formatting with Prettier
- **Auth**: Email magic link authentication with Passport.js
- **PostgreSQL**: Sessions and data stored in a PostgreSQL database

## Requirements

- Node.js
- PostgreSQL (Official Docker image used in this project)

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/kensonjohnson/postgres-express-auth-example.git
```

2. Install dependencies

```bash
cd postgres-express-auth-example
npm install
```

3. Copy the `.env.example` file to `.env` and fill in the environment variables

```bash
cp .env.example .env
```

4. Create tables in the postgres database

```bash
npm run seed
```

5. Start the development server

```bash
npm run dev
```
