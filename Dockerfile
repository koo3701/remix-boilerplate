FROM node:22.8-bullseye-slim

# Install corepack
RUN npm install -g npm@latest
RUN corepack enable pnpm

# Install git
RUN apt update && apt upgrade -y && apt install -y git

USER node

# Set up git to ignore .DS_Store files
RUN mkdir -p ~/.config/git && echo '.DS_Store' > ~/.config/git/ignore
