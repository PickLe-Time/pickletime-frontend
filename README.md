# 🥒🕒 PickLeTime Frontend

This is the **frontend** for **PickLeTime**, a web application built with **React** and **Vite**. It serves as the user interface, connecting to the Pickletime backend via REST APIs and is designed to be containerized and deployed via Docker.

## 🚀 Tech Stack
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [JavaScript (JSX)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [MUI (Material UI)](https://mui.com/)
* [Docker](https://www.docker.com/)
* [NGINX](https://www.nginx.com/) (in production via reverse proxy)


## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/en/download) (>= 18)
- [Docker Engine](https://docs.docker.com/engine/) / [Docker Desktop](https://docs.docker.com/desktop/)

### Setup

```bash
# Clone the repo
git clone https://github.com/PickLe-Time/pickletime-frontend.git
cd pickletime-frontend

# Install dependencies
npm install
````
### Environment Variables

Configure `.env.example` and rename to `.env`:

```env
# Backend API host
VITE_API_HOST_URL = "http://localhost:5000"
# Vite origin URL
VITE_ORIGIN_URL = "http://localhost:5173"
```

Adjust `VITE_API_HOST_URL` to point to your backend.
Adjust `VITE_ORIGIN_URL` to point to your frontend.

### Run Locally

```bash
npm run start
```

App will be available at: [http://localhost:5173](http://localhost:5173)


## 🐳 Docker

This project is Docker-ready. A production build is expected to be served via NGINX. Published containers can be found at the [PickLe-Time packages page](https://github.com/PickLe-Time/pickletime-frontend/pkgs/container/pickletime-frontend).



## 🔗 Related Repositories

* [pickletime-backend](https://github.com/pickle-time/pickletime-backend)
* [pickletime-infra](https://github.com/pickle-time/pickletime-infra)

## 📦 Deployment

This frontend is expected to be deployed as part of a Docker Compose stack, reverse proxied through NGINX with HTTPS termination.

For more, see the [`pickletime-infra`](https://github.com/pickletime/pickletime-infra) repo.

