# Load testing hub panel

If you have any questions, you can ask [@Nikita Filonov](https://t.me/sound_right)

## Table of content

- [🚀 Quick Start](#-quick-start)
- [Project setup](#project-setup)
- [Services](#services)
    - [Services list](#services-list)
    - [Service details](#service-details)
- [Dashboard](#dashboard)
    - [Charts](#charts)
- [Results](#results)
    - [Results list](#results-list)
    - [Result details](#result-details)
- [Methods](#methods)
    - [Methods list](#methods-list)
    - [Method details](#method-details)
- [Scenarios](#scenarios)
    - [Scenarios list](#scenarios-list)
    - [Scenario details](#scenario-details)
- [Integrations](#integrations)
    - [Integrations list](#integrations-list)
    - [Integration details](#integration-details)
- [Settings](#settings)
    - [General settings](#general-settings)
    - [Compare weights settings](#compare-weights-settings)
    - [Compare highlight threshold settings](#compare-highlight-threshold-settings)
- [App info](#app-info)

## 🚀 Quick Start

Run **Load Testing Hub** locally in just a couple of commands.

### 1. Create [.env.load-testing-hub](./examples/.env.load-testing-hub) in the project root

```dotenv
# API
POSTGRES.PORT=5432
POSTGRES.HOST=postgres
POSTGRES.DATABASE=load_testing_metrics_db
POSTGRES.USERNAME=load_testing_metrics_user
POSTGRES.PASSWORD=load_testing_metrics_password

KIBANA_URL=http://localhost:3001
GRAFANA_URL=http://localhost:3001
KUBERNETES_URL=http://localhost:3001

# Panel
SERVER_URL=http://localhost:13000
API_VERSION=/api/v1
DURATION_FORMAT=m[m]s[s]
API_DATE_FORMAT=YYYY-MM-DD
API_TIME_FORMAT=HH:mm:ss
PICKER_DATE_FORMAT=dd.MM.yyyy
PICKER_TIME_FORMAT=HH:mm
```

### 2. Create [docker-compose.yaml](./examples/docker-compose.yaml)

```yaml
version: "3.9"

services:
  api:
    image: nikitafilonov/load-testing-hub-api:latest
    ports: [ "13000:13000" ]
    env_file: [ .env.load-testing-hub ]
    depends_on:
      migrator:
        condition: service_completed_successfully
    container_name: api

  panel:
    image: nikitafilonov/load-testing-hub-panel:latest
    ports: [ "13100:13100" ]
    env_file: [ .env.load-testing-hub ]
    container_name: panel

  migrator:
    image: nikitafilonov/load-testing-hub-api:latest
    command: alembic upgrade head
    env_file: [ .env.load-testing-hub ]
    depends_on:
      postgres:
        condition: service_healthy
    container_name: migrator

  postgres:
    image: postgres:16-alpine
    ports: [ "5432:5432" ]
    volumes: [ postgres_data:/var/lib/postgresql/data ]
    environment:
      POSTGRES_DB: load_testing_metrics_db
      POSTGRES_USER: load_testing_metrics_user
      POSTGRES_PASSWORD: load_testing_metrics_password
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U $${POSTGRES_USER} -d $${POSTGRES_DB}" ]
      retries: 5
      timeout: 3s
      interval: 5s
    container_name: postgres

volumes:
  postgres_data:
```

### 3. Run the project

```shell
docker compose up -d
```

### 4. Open in your browser

- API: http://localhost:13000/docs
- Panel: http://localhost:13100

## Project setup

```shell
yarn install
yarn start
```

## Services

### Services list

![Services list](examples/services/list.png "Services list")

### Service details

![Service details](examples/services/details.png "Service details")

## Dashboard

### Charts

![Results charts](examples/dashboard/results_charts.png "Results charts")
![Methods charts](examples/dashboard/methods_charts.png "Methods charts")

## Results

### Results list

![Empty results](examples/results/list.png "Results")

### Result details

![Details](examples/results/details.png "Details")
![Details charts](examples/results/details_charts.png "Details charts")

## Methods

### Methods list

![Methods list](examples/methods/list.png "Methods list")

### Method details

![Details](examples/methods/details.png "Details")
![Details charts](examples/methods/details_charts.png "Details charts")

## Scenarios

### Scenarios list

![Scenarios list](examples/scenarios/list.png "Scenarios list")

### Scenario details

![Details](examples/scenarios/details.png "Details")

## Integrations

### Integrations list

![Integrations list](examples/integrations/list.png "Integrations list")

### Integration details

![Integration details](examples/integrations/details.png "Integration details")

## Settings

### General settings

![General settings](examples/settings/general.png "General settings")

### Compare weights settings

![Compare weights settings](examples/settings/compare_weights.png "Compare weights settings")

### Compare highlight threshold settings

![Compare highlight threshold settings](examples/settings/compare_highlight_threshold.png "Compare highlight threshold settings")

## App info

![App info](examples/app_info.png "App info")