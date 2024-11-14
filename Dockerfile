FROM node:20.18.0-bullseye-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update && \
    apt-get install -y build-essential python3 && \
    rm -rf /var/lib/apt/lists/*

FROM base AS build
WORKDIR /app
COPY ["package.json", "pnpm-lock.yaml", "tsconfig.json", "./"]
RUN pnpm install
COPY src ./src/
RUN pnpm run build

FROM base
COPY --from=build /app/dist /app/dist
COPY package.json /app/
WORKDIR /app
RUN pnpm install --prod
EXPOSE $PORT
CMD ["pnpm", "start"]