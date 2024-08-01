
### Accessing API Documentation

Você pode acessar a documentação da API na seguinte URL, após iniciar o servidor de desenvolvimento:
```sh
http://localhost:3000/docs
```

---

### Installing Node.js and Yarn

#### Node.js Installation

1. Visit the [Node.js website](https://nodejs.org/).
2. Download the recommended version for your operating system.
3. Follow the installation instructions for your OS.

#### Yarn Installation

1. Once Node.js is installed, you can install Yarn via npm (Node Package Manager) which comes with Node.js.
   ```sh
   npm install --global yarn
   ```
2. Verify the installation by checking the Yarn version.
   ```sh
   yarn --version
   ```

### Installing Docker

#### Docker Installation

1. Visit the [Docker website](https://www.docker.com/).
2. Download the Docker Desktop for your operating system.
3. Follow the installation instructions for your OS.
4. Verify the installation by checking the Docker version.
   ```sh
   docker --version
   ```

## Getting Started

### Prerequisites

- Node.js
- Yarn package manager
- Docker

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd project-directory
   ```
3. Install dependencies:
   ```sh
   yarn install
   ```
4. Create a `.env` file by copying the `example.env` file:
   ```sh
   cp example.env .env
   ```
   - Fill in the necessary environment variables in the `.env` file as needed.
5. Run database migrations:
   ```sh
   yarn migrate dev
   ```

### Running the Project

1. Start container:
   ```sh
   docker-compose up
   ```
2. Start the development server:
   ```sh
   yarn dev
   ```
