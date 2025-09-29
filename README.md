# Travel Taniti
*Travel Taniti* is a travel reservation platform that features an integrated content management system for administrators to manage various services.
This is my capstone project for Western Governors University. The island of Taniti is fully fictional.

### Background
*Travel Taniti* began as a static website but was transformed into a dynamic full-stack application to meet the demands of unprecedented tourism growth.

The platform enables visitors to browse available accommodations, dining options, and activities, while allowing them to create and manage their own bookings directly through the site.

Administrators can manage all content through an administrative dashboard, allowing creation and management for hotels, room types, activities, restaurants, bookings, and users throughout the website.

### Technologies Used
- Javascript
- Node
- Express
- React
- PostgreSQL
- JWT Authentication

## Features
### User Features
- Browse available hotels, rooms, restaurants, and activities.
- View detailed information about each service.
- View up-to-date availability for each service.
- Make, manage, and request cancellations for your reservations/bookings.
- Generate and print your travel itinerary.
- View your booking history.

### Admin Features
- Full CRUD operations for hotels and room types.
- Full CRUD operations for restaurants.
- Full CRUD operations for activities.
- Integration with Unsplash API for convenient image search and selection when creating/updating services.
- Search for and filter various services.
- View user details.
- Manage user bookings.

## Running the Application Locally
### Prerequisites
- Git 
- GitHub Account 
- Node.js v22.12.0 
- Local PostgreSQL database 
- [Unsplash developer account](https://unsplash.com/developers) for API Key (optional) 

### Step 1: Clone the Repository 
Using this repository, clone the `main` branch to your machine.

### Step 2: Install Dependencies 
This project uses a monorepo structure, where the front end is contained within the `client` directory, and the back end is contained within the `server` directory. 
You will need to enter both of them individually to install dependencies and start the servers. 
Install dependencies by navigating to the project’s root directory, then running the following two commands through the terminal: 
```
cd server && npm install
cd ../client && npm install 
```

### Step 3: Environment Variables 
Create an `.env` file in the `server` directory, and configure the following variables: 
```
PORT=3001 
ACCESS_TOKEN_EXPIRATION=24h 
ACCESS_TOKEN_SECRET=your_generated_access_token_secret 
DATABASE_URL=your_postgresql_database_connection_string 
TEST_ADMIN_EMAIL=admin@example.com 
TEST_ADMIN_PASSWORD=example_password 
UNSPLASH_ACCESS_KEY=your_unsplash_api_access_key 
UNSPLASH_SECRET_KEY= your_unsplash_api_secret_key 
```

Note: If you want to use the image feature locally when creating services, you will need to request 
an API key from Unsplash. However, when creating services, images are not a requirement, so it’s not necessary. 

### Step 4: Start the Servers 
Start the back end server by navigating back to the root directory, then running: `cd server && npm start`.
You should see: 
```
Server running on port 3001 
Connected to PostgreSQL database via Sequelize 
Database tables created/verified 
```
Then, start the front end server. In a new terminal, navigate to the root directory, and then run: `cd client && npm start`.
You should see: 
```
> travel-taniti-client@1.0.0 start 
> vite 
VITE v6.0.3  ready in 176 ms 
➜  Local:   http://localhost:5173/ 
➜  Network: use --host to expose 
➜  press h + enter to show help 
```

You can then navigate the localhost link in your web browser to see the application running locally. 

### Step 5: Seed Data 
There are a few scripts written to help create mock data. Navigate into the server directory to run these commands. 
To create an administrator user, run: `npm run create-admin`.
You will then see:
```
Admin user created. Email: ${email specified in .env} Role: ‘admin’ 
```
To seed the database tables, run: `npm run seed`.
You will then see: 
```
Seeding database.. 
Clearing existing data... 
Connected to PostgreSQL database via Sequelize 
Hashing user passwords... 
Creating users... 
Creating accommodations... 
Creating room types... 
Creating restaurants... 
Creating activities... - 6 users created - 5 accommodations created - 18 room types created - 6 restaurants created - 8 activities created 
```

## Using the Application
### As a User
In Progress.

### As an Admin
In Progress.