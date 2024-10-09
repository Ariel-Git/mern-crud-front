# React + Redux + TypeScript + Vite + esLint + prettify + joi validations

# Installation
  - npm install
# Scripts
  - npm run dev 
  - npm run build (will run eslint, prettify, and finally create a production build)
  - npm run preview (will run in production mode locally)

# Usage
  - in order to login/register you will need first to run the server side of this app

# Things you can do:
  - register - click on registration button and fill up you details (you will log in automatically right after submitting the form)
  - login - click on login button and fill up you credentials
  - log out - click logout button to log out

# navigation
while logged in:
  - company logo - will take you to the home page with login/register buttons
while logged out:
  - company logo - will take you to the home page with welcome message     
  - users list page - will take you to a page with list of all register users
  - profile - will take you to a page with your details and buttons for edit/delete your user account 

# Behavior
  - 403 page will be shown for logged out users with buttons to login/register
  - on expiration of token you will be logged out instantly and be redirected to 403 page if you are in users list page or profile page
  - on log out you page be shown with buttons to login/register
  - if you are trying to go to logged in users only pages (users list and profile) you will be redirected to 403 page with buttons to login/register
    once you log in you will be redirected to the page you tried to view
  - While filling up the registration form the submit button will be disabled until all fields are valid
  - While filling up the update user details form the submit button will be disabled until all fields are valid
  - 404 page will be shown with a "go to home page button"
  
