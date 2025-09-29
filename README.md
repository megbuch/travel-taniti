# Travel Taniti
*Travel Taniti* is a travel reservation platform that features an integrated content management system for administrators to manage various services.
This is my capstone project for Western Governors University. The island of Taniti is fully fictional.

Administrator credentials available upon request.

https://travel-taniti.up.railway.app/

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

## Using the Application as a User
### Browsing Accommodations, Restaurants, and Activities
An account is not required to view services and service availability. Users can visit the lodging, dining, and activities pages to view up-to-date service listings created by administrators. To view a service in more detail, click one of the service cards to expand it into a modal.

<img width="1882" height="877" alt="image" src="https://github.com/user-attachments/assets/0134cb11-5231-4263-8022-6e0109b806a6" />
<img width="1878" height="877" alt="image" src="https://github.com/user-attachments/assets/2368b573-2a26-4ae4-85dd-e83fafadc2f5" />

### Viewing Service Availability
Availability information will be provided at the bottom of a service's details modal. Select a date or date range to view availability for that day. Although availability can be viewed by anyone, users must create an account or log in to actually make a reservation.

*Lodging Example*
<img width="1882" height="874" alt="image" src="https://github.com/user-attachments/assets/b4f39f63-ee9c-4df6-9f4c-56fd9c98a12d" />
*Restaurant Example*
<img width="1887" height="898" alt="image" src="https://github.com/user-attachments/assets/f39f3076-224c-4390-ba74-85299313e287" />
*Activity Example*
<img width="1883" height="898" alt="image" src="https://github.com/user-attachments/assets/6a03e3bb-61cf-4220-b899-b1716bf2dfbd" />

### Sign In or Create an Account
To get started, either sign in or create an account by accessing either of the buttons in the navigation bar.

<img width="975" height="399" alt="image" src="https://github.com/user-attachments/assets/6a72d983-b26d-4a77-a209-08fc08e665c4" />
<img width="975" height="399" alt="image" src="https://github.com/user-attachments/assets/0cd2e0f4-071c-4a49-add7-9b973505b250" />

### Booking a Service
Each service will have different availability. Check availability by selecting a date or date range. Activities and restaurants will list available time slots, while accommodations will list available room types. Select `book now` on a desired option to continue with the booking.

<img width="975" height="667" alt="image" src="https://github.com/user-attachments/assets/8f140f98-a3a5-4b4f-bee6-bc16bfaff52c" />

Fill out the number of guests. For accommodations, the total cost displayed is the number of nights times the nightly rate of the selected room type. For activities, the total cost is the number of guests times the activity price per guest.
Click `book now` to save the booking.

<img width="975" height="962" alt="image" src="https://github.com/user-attachments/assets/01104b16-d908-48b8-8eb4-9f4271930fea" />
<img width="975" height="412" alt="image" src="https://github.com/user-attachments/assets/08d3eac3-09fe-43bd-9b28-df3c57bc8ea7" />

### Managing Your Bookings
#### Viewing Your Bookings
Access your Travel Dashboard by logging in, then expanding the navigation menu and clicking `travel dashboard`. Once there, view your list of current bookings in chronological order. Expand a booking’s details by clicking the ‘info’ icon to the right of the booking list item.

<img width="666" height="292" alt="image" src="https://github.com/user-attachments/assets/e8646751-a596-454e-9b7d-a613d4851a30" />
<img width="975" height="350" alt="image" src="https://github.com/user-attachments/assets/93a34482-977b-4e00-8822-82d0e5014395" />
<img width="975" height="459" alt="image" src="https://github.com/user-attachments/assets/b2a69029-2a41-447f-b4b3-cbe7926bc3ed" />

#### Filtering Your Bookings
Filter your bookings by status (i.e. `Confirmed`, `Pending Cancellation`, etc. ) using the dropdown menu.

<img width="975" height="354" alt="image" src="https://github.com/user-attachments/assets/efeecd7c-2399-4e68-a996-ad87a5520e7c" />

#### Cancelling Your Bookings
Bookings cannot be immediately cancelled by users. Cancellations must be requested by users, and granted by administrators. When viewing a booking’s details, you can request cancellation for it at the bottom of the modal. 

<img width="775" height="284" alt="image" src="https://github.com/user-attachments/assets/fa25650b-b38a-4662-a897-5a0878ce1f21" />

#### Generating Your Itinerary
Click the `generate itinerary` button to generate an itinerary of your currently listed bookings. You can then print this itinerary for your convenience.

<img width="352" height="159" alt="image" src="https://github.com/user-attachments/assets/7a01d06d-2ffe-444e-8779-e96691a91d92" />
<img width="975" height="456" alt="image" src="https://github.com/user-attachments/assets/968b5aa2-8e3a-4910-8ea1-b6153759cdc4" />

## Using the Application as an Administrator
Administrator accounts cannot be created through the standard user registration process or through the application interface. They must be created through the database directly for security purposes. 

Administrators can manage users, accommodations, room types, restaurants, activities, and bookings through the Admin Dashboard. To access the Admin Dashboard, you will need to sign in with an administrator level account. Once authenticated, the navigation menu drops down to reveal the Admin Dashboard menu item. 

<img width="975" height="324" alt="image" src="https://github.com/user-attachments/assets/12c5f190-fc8a-4e37-9ac2-9a9fc77fe0a6" />
 
### Managing Services
Although accommodations, restaurants, and activities are slightly different in the way they are created and updated, management of each of them is generally very similar. These will be referred to as ‘services’ going forward, since the instructions are generally applicable to each of them.

#### Viewing Services
Select a service type tab (i.e. `accommodations`, `restaurants`, `activities`) to view current services of that type. Click the `information` icon to the right of a list item to view the details of that service.

<img width="975" height="761" alt="image" src="https://github.com/user-attachments/assets/c17358c1-5586-4978-8376-9102283f8751" />
<img width="975" height="466" alt="image" src="https://github.com/user-attachments/assets/7222f87b-d685-4b39-92d2-e355557a85d3" />
<img width="975" height="567" alt="image" src="https://github.com/user-attachments/assets/c2b19ed4-acec-4f04-afae-5faa0bb409e4" />

#### Searching for Services
Search for a service by name through the search bar.

<img width="975" height="545" alt="image" src="https://github.com/user-attachments/assets/b671aa1f-38dd-4cf8-9457-13e4fa19e6fa" />
 
#### Creating a Service
Create a new service by clicking the `+` icon beside the header of that service type. Fill out the form, and then click `submit` at the end to save it. Once saved, the service will be available to view by other users.

<img width="557" height="151" alt="image" src="https://github.com/user-attachments/assets/1de7ace1-2c68-48e7-8b52-597ba824e2d5" />
<img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/4a9ad6e9-c759-4463-a544-44675e0b64a3" />
 
#### Updating a Service
When viewing a particular service, edit it by clicking the `edit` button in the top right corner. Edit the details as desired, and then click `submit` to update the service.

<img width="674" height="459" alt="image" src="https://github.com/user-attachments/assets/a0b79314-7655-4a5e-84cd-e7d134fe3e6a" />
<img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/ed0dc80b-a2e1-40dc-a73c-dac57abcbe37" />

#### Deleting a Service
When viewing a particular service, delete it by clicking the `delete` button in the top right corner.

<img width="674" height="459" alt="image" src="https://github.com/user-attachments/assets/a0b79314-7655-4a5e-84cd-e7d134fe3e6a" />

### Managing Room Types (of Accommodations)
#### Viewing Room Types
When viewing an accommodation’s details, scroll down to see the current room types. Room types can be expanded to reveal additional information.

<img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/fa0bd8c9-8eea-4d3a-92ad-ed763ce7b6a5" />
<img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/c704b2bd-bc78-4bf6-98ec-5ca17f28ae7b" />
   
#### Creating a Room Type
When viewing an accommodation’s details, create a new room type for it by  clicking the `+` icon beside the `Room Types` heading. Fill out the form, and then click `submit` to save it.

<img width="502" height="119" alt="image" src="https://github.com/user-attachments/assets/e81bda56-c2a2-4a40-8222-a3eb3a764571" />
<img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/6620a8ed-5057-4386-a38b-ca22c14affa6" />

#### Deleting a Room Type
When viewing an accommodation’s details, delete a room type by expanding one of the room type options. This will reveal a `garbage` icon, which will delete the room type when clicked.

<img width="973" height="271" alt="image" src="https://github.com/user-attachments/assets/c214c5de-9aa1-484b-b6f4-fefdf6edd872" />

### Managing Bookings
#### Viewing Bookings
Select the `bookings` tab to view a list of current bookings, including the date, status, and user of the booking. Booking details can be viewed by clicking the `information` icon to the right of the list item.

<img width="975" height="458" alt="image" src="https://github.com/user-attachments/assets/554e7839-4203-4697-ba22-dd73a5beabd1" />
<img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/322f28da-cf7f-4dd9-990a-e53f4d392b6a" />

#### Searching for Bookings
Bookings can be searched by either the name of the user who booked it or by the name of the service that was booked.

<img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/6b220d91-fb67-49a7-b77a-eaf5c5c828eb" />
<img width="975" height="437" alt="image" src="https://github.com/user-attachments/assets/d89b5285-591e-4037-a9f6-1cefb49fe94c" />

#### Filtering Bookings
Bookings can be filtered by booking status (i.e. `Confirmed`, `Completed`, `Pending Cancellation`, etc.). This filter can be used in conjunction with the search query.

<img width="975" height="313" alt="image" src="https://github.com/user-attachments/assets/209dadbc-0bee-400b-8e1f-4f8ffeff3fa8" />

#### Deleting Bookings
When viewing a booking’s details, click `delete` at the bottom of the modal to delete it. Users cannot delete their own bookings. Once cancellation has been requested for a booking, its status will change to `pending cancellation`, and an administrator must be the one to delete it.

<img width="645" height="222" alt="image" src="https://github.com/user-attachments/assets/59ef7045-e508-4b7e-97fa-fc0b64fd6e33" />

### Managing Users
#### Viewing Users
Select the `users` tab to view a list of current users who have signed up on the platform. Inspect a user’s details by clicking the `information` icon to the right of the user’s list item.

<img width="975" height="461" alt="image" src="https://github.com/user-attachments/assets/8160ac64-f134-4b47-8773-261726f26ff7" />
<img width="975" height="462" alt="image" src="https://github.com/user-attachments/assets/ccc7c161-b3ae-4433-999b-4c47726cbf5d" />

#### Searching for Users
Like with the other tabs, search for users by first name, last name, or both via the search bar.

<img width="975" height="426" alt="image" src="https://github.com/user-attachments/assets/abb3b4a6-a678-4371-856e-9e8bcd73401a" />
