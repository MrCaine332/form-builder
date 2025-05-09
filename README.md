## Setup Instructions:
### Client Side:
- After cloning repository, move to the ***client*** folder by command ```cd ./client```.
- Once in the ***client*** directory, use ```npm install``` command to install all dependencies.
- Use ```npm run start``` command to start the project
- App will launch on [localhost:3000](http://localhost:3000)

### Backend Side:
- After cloning repository, move to the ***server*** folder by command ```cd ./server```.
- Once in the ***server*** directory, use ```npm install``` command to install all dependencies.
- add ```.env``` file with the following fields to the server root (replace values with yours):
    - DATABASE_URL='mysql://[user]:[password]@[host]:[port]/[database-name]'
    - JWT_ACCESS_TOKEN_SECRET='your-secret-key'
    - JWT_ACCESS_TOKEN_EXPIRATION_TIME=900 
    - JWT_REFRESH_TOKEN_SECRET='your-secret-key'
    - JWT_REFRESH_TOKEN_EXPIRATION_TIME=604800 
    - COOKIE_SECRET='your-secret-key'
    - GOOGLE_CLIENT_ID='your-google-client-id'
    - GOOGLE_SECRET='your-google-secret'
- Once you are connected to the database, use ```npx primsa migrate deploy``` command to create all tables
- Use ```npm run start``` command to start the project
