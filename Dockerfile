# docker build -f DockerFile -t ghcr.io/pickle-time/pickletime-frontend:latest .
# docker run -d --name frontend -p 5173:5173 ghcr.io/pickle-time/pickletime-frontend:latest

# Build the app 
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build

