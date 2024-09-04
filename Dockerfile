FROM node:22.8-bullseye-slim

RUN npm install -g npm@latest
RUN corepack enable pnpm

RUN apt update && apt upgrade -y && apt install -y git

USER node