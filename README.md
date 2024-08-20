# ScribbleSphere
>ScribbleSphere is a publishing platform where users can explore meaningful and thought-provoking stories on subjects they care about deeply.

# Screenshots
![ss1](/ss/s1.png)

# Features Implemented
## Frontend
* Responsive Layout
* Navigation Menu
* Blog Post List
* Post Details Page
* Registration and Login Forms
* Token-Based Authentication
* Tagging and Categories

## Backend
* API
  * Blog
    1. fetchBlog
    2. createBlog 
  * User
    1. Login
    2. Signup
* JWT Authentication
  * Protecting CreateBlog Route
  * Saving user data
* BcryptJS for hashing passwords
* Email Validator
* Using slug for managing URLs

# Libraries/Packages Used
* bcryptjs
* cookie-parser
* cors
* dotenv
* express
* jsonwebtoken
* mongoose
* nodemon
* slugify

# Local Setup
```
git clone https://github.com/GauravDewani/ScribbleSphere.git
cd ScribbleSphere
npm i
nodemon .\index.js
```

# Team Member
Gaurav Dewani (2023BCS-021)
