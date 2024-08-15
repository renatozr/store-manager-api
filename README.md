<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Store Manager API</h3>

  <p align="center">
    A REST API that manages products and sales from a store
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

To exercise REST API development, unit testing, JOI validation and MySQL.

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- NPM
- MySQL

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:renatozr/store-manager-api.git
   ```
2. Enter the directory
   ```sh
   cd store-manager-api
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Rename .env.example file to .env
5. Fill in the environment variables (example below)
   ```sh
  PORT=3001
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=root
  MYSQL_PASSWORD=password
   ```
6. Run the project
   ```sh
   npm run dev
   ```
7. Run the project tests
   ```sh
   npm run test
   ```
