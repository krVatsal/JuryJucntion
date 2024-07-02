Instructions to run this website.
Main branch contains whole backend code while master branch contains whole frontend code
Download both the branches codes and put them in two folders(e.g. frontend and backend)
In backend folder create a file named .env and paste this content inside

MONGODB_URI= "mongodb://localhost:27017"
DB_NAME= "JurisJunction"
PORT= "5217"
ACCESS_TOKEN_EXPIRY= 1d
ACCESS_TOKEN_SECRET= PUT YOUR OWN SECRET
REFRESH_TOKEN_EXPIRY= 10d
REFRESH_TOKEN_SECRET= PUT YOUR OWN SECRET
CLOUDINARY_API_KEY="PUT YOUR OWN TOKEN"
CLOUDINARY_API_SECRET= "PUT YOUR OWN SECRET"
CLOUDINARY_CLOUD_NAME="PUT YOUR OWN NAME"
CORS_ORIGIN= "http://localhost:3000"

you may change any field except cors origin according to your interest

after all this
run "npm init"
after all the installations
open backend folder in an integrated terminal and run "nodemon src/index.js"
open frontend folder in an integrated terminal and run "npm run dev"
Your website is running on localhost:3000
