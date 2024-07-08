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

## Getting Started

### Prerequisites

- Node.js
- Yarn package manager

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
4. Run database migrations:
   ```sh
   yarn migrate dev
   ```

### Running the Project

1. Start the development server:
   ```sh
   yarn dev
   ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/branch-name`).
5. Open a Pull Request.
