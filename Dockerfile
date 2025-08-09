# ===== Stage 1: Build React application =====
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Enable corepack (to manage Yarn versions)
RUN corepack enable

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies (frozen lockfile to ensure reproducible builds)
RUN yarn install --frozen-lockfile --non-interactive

# Copy the rest of the application source code
COPY . .

# Build-time arguments with default values (can be overridden via --build-arg)
ARG SERVER_URL="http://localhost:8000"
ARG API_VERSION="/api/v1"
ARG DURATION_FORMAT="m[m]s[s]"
ARG API_DATE_FORMAT="YYYY-MM-DD"
ARG API_TIME_FORMAT="HH:mm:ss"
ARG PICKER_DATE_FORMAT="dd.MM.yyyy"
ARG PICKER_TIME_FORMAT="HH:mm"

# Set environment variables for CRA build
ENV REACT_APP_SERVER_URL=${SERVER_URL}
ENV REACT_APP_API_VERSION=${API_VERSION}
ENV REACT_APP_DURATION_FORMAT=${DURATION_FORMAT}
ENV REACT_APP_API_DATE_FORMAT=${API_DATE_FORMAT}
ENV REACT_APP_API_TIME_FORMAT=${API_TIME_FORMAT}
ENV REACT_APP_PICKER_DATE_FORMAT=${PICKER_DATE_FORMAT}
ENV REACT_APP_PICKER_TIME_FORMAT=${PICKER_TIME_FORMAT}

# Build the production version of the React app
RUN DISABLE_ESLINT_PLUGIN=true yarn build

# ===== Stage 2: Serve static files with Nginx =====
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Default command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
