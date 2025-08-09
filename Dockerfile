FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Enable corepack (manages Yarn versions)
RUN corepack enable

# Copy dependency files first for better caching
COPY package.json yarn.lock ./

# Install dependencies and production server packages in one layer
RUN yarn config set network-timeout 1000000 -g \
    && yarn install --frozen-lockfile --non-interactive \
    && yarn add express express-favicon

# Copy the rest of the application source code
COPY . .

# Build the production-ready React application
RUN DISABLE_ESLINT_PLUGIN=true yarn build

# Expose the port defined in server.js (13100)
EXPOSE 13100

# Start the custom Express server
CMD ["node", "server.js"]
