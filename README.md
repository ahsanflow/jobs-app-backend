# Jobs App Backend

This repository contains the backend implementation for the Jobs App. It includes user management, company profiles, candidate profiles, and job management using Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/jobs-app-backend.git
   cd jobs-app-backend
   ```

2. Copy the example environment file and rename it to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

- Edit the `.env` file with your configuration details (e.g., MongoDB connection string, JWT secret, etc.).

### Run the Application

To start the development server:

```bash
npm run dev
```

To start the production server:

```bash
npm start
```

### Seeding Data

To seed the database with fake data, run:

```bash
npm run seed
```

### API Endpoints

- **Jobs**: `GET /api/jobs` - Retrieve all jobs with associated company details.

### Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Mongoose** - MongoDB object modeling
- **Faker.js** - Fake data generation

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contributing

Feel free to submit issues or pull requests. Contributions are welcome!
