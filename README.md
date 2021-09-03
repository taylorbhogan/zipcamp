# zipcamp

A web application for exploring our public lands and keeping track of the coolest spots you discover.

## Check out the live site here: [zipcamp](https://zipcamp-by-taylorbhogan.herokuapp.com/)

# Technologies Used

## Back end 

The back end was built using Python and Flask, and connects to a postgreSQL database via SQLAlchemy and Alembic. 

## Front end

The front end was built with React and Redux, powered by JavaScript and Express. The Google Maps API was used for location rendering and easy lat + long input.

## Deployment

This app was deployed to Heroku using GitHub Actions.

# Features

zipcamp users are able to:
* Create an account
* Log in and log out
* Admire the spots they've already created and learn from the tips they've added
* Add a new spot using the familiar Google Maps UI
* Add tips to spots they or others have added

# Key Components

## User Authentication

For extra security, user passwords are hashed using bcrypt before being stored in the database. When a user logs in, the entered password is hashed and compared against the stored encrypted password.

## Viewing and Creating Spots

Users can scroll through their existing spots and select one to view more information, including any tips that other users have left behind.

A user can add a new spot easily, completing a simple form and entering its location using an input powered by Google Maps.

## Creating Tips

While viewing a spot, a user can add a quick tip  to remind themselves for their next trip.

## Editing Spots and Tips

A user can easily edit or delete their spots or tips. 
