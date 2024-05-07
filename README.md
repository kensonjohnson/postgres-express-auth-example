# React + Express + TypeScript + Vite

This is a template using a simple Fullstack template designed with no bells and whistles.
This is meant to get someone up and running with minimal opinionated code.

## Features

### React for the frontend

The frontend is a React app bootstrapped with Vite and TypeScript.
It uses the default Vite setup with only the root directory changed to `frontend`.
The frontend is served via `npm run dev` and available at [localhost:5173](http://localhost:5173).
Requests are proxied to the backend server, so you can just use relative paths in your fetch requests like so:

```ts
const response = await fetch("/ping");
```

The proxy routes are defined in `vite.config.ts` and examples for setting up a proxy can be found commented there, as well as in [the Vite docs](https://vitejs.dev/config/server-options.html#server-proxy).

### Express for the backend

The backend is an Express server written in TypeScript using modern ES6+ syntax.
It is served via `npm run dev` and available at [localhost:3000](http://localhost:3000).
The server is set up to serve static files from the `build/frontend` directory.

### Simple Build Strategy

The project builds to a single artifact: the `build` directory.
This directory contains the frontend and backend code in one place, making deployment easy.
Once built for production, the server can be started with `npm start` and the frontend will be served by the Express server.

## Getting Started

Create a new project using [this template on GitHub](https://github.com/kensonjohnson/react-express-vite-templat) by clicking the "Use this template" button at the top of the page.

Clone the repository to your local machine:

```sh
git clone git@github.com:your-username/your-repo.git
```

Navigate to the project directory:

```sh
cd your-repo
```

Install the dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Navigate to [localhost:5173](http://localhost:5173) in your browser to see the app running.

## Building for Production

To build the project for production, run:

```sh
npm run build
```

This will create a `build` directory with the compiled frontend and backend code.

To start the server in production mode, run:

```sh
npm start
```

Navigate to [localhost:3000](http://localhost:3000) in your browser to see the app running.
