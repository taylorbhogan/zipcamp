# zipcamp

Explore our public lands and make note of the coolest spots you discover.

## Check out the live site here: [zipcamp](https://zipcamp-by-taylorbhogan.herokuapp.com/)

## Technologies Used

### Backend 
- JavaScript
- Express
- Postgres
- Sequelize
- Bcrypt

### Frontend
- JavaScript
- React
- Redux
- CSS Modules
- Google Maps API
- Recreation.gov API

### Deployment

This app was deployed to Heroku using the Heroku CLI. Data persists by way of a Postgres database.

## Features

zipcamp users are able to:
* Create an account
* Log in and log out
* Explore public lands by querying the Recreation.gov database
* Make note of a new spot using a public land's coordinates as a starting point, or using their device's location or the Google Maps drag-and-drop UI
* View all spots added by themselves and fellow users
* View all spots added by themselves exclusively
* Add tips to spots they or others have added
* Edit and delete all spots and tips they have created 

## Key Components

### User Authentication

For extra security, user passwords are hashed using bcrypt before being stored in the database. When a user logs in, the entered password is hashed and compared against the stored encrypted password.

### Viewing Areas

Users can scroll through all of the public lands available via the Recreation.gov database, 3,775 at the time of this commit. A user may filter results either by state/territory or by Organization (i.e. Federal Agency). Area results may be expanded to display the full description and the user may click a button to add a new spot using the coordinates of the area as the spot's marker's starting point.

### Viewing and Creating Spots

Users can scroll through their existing spots and select one to view more information, including any tips that other users have left behind.

A user can add a new spot easily, completing a simple form and entering its location using an input powered by Google Maps.

### Creating Tips

While viewing a spot, a user can add a quick tip  to remind themselves for their next trip.

### Editing Spots and Tips

A user can easily edit or delete their spots or tips. 
