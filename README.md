# [zipcamp](https://zipcamp-by-taylorbhogan.herokuapp.com/)

![Screen Shot 2022-04-13 at 5 53 37 PM](https://user-images.githubusercontent.com/79616733/163293279-424cfb52-d341-4812-8f43-7383b6c8636c.png)

Explore our public lands and make note of the coolest spots you discover.

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

![Screen Shot 2022-04-13 at 5 56 10 PM](https://user-images.githubusercontent.com/79616733/163293310-53bad0ec-a22d-4e13-ac2a-b13bdd04f1a3.png)

Users can scroll through all of the public lands available via the Recreation.gov database, 3,775 at the time of this commit. A user may filter results either by state/territory or by Organization (i.e. Federal Agency). Area results may be expanded to display the full description and the user may click a button to add a new spot using the coordinates of the area as the spot's marker's starting point.

### Viewing and Creating Spots

![Screen Shot 2022-04-13 at 6 06 23 PM](https://user-images.githubusercontent.com/79616733/163294083-75e6fc6e-05cc-4add-adbe-a9c31e2db93b.png)

Users can scroll through their existing spots and select one to view more information, including any tips that other users have left behind.

A user can add a new spot easily, completing a simple form and entering its location using an input powered by Google Maps.

### Creating Tips

While viewing a spot, a user can add a quick tip  to remind themselves for their next trip.

### Editing Spots and Tips

A user can easily edit or delete their spots or tips. 
