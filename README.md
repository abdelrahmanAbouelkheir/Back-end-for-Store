# Back-End for Store
  This project includes code that handles the database that conatins tables for user,products and is able to track orders of users including its status.It has two environments 
  the testing environment and developing environment.It is a resful api that uses JWT for authentication covering only crud operations with their tests. Moreover, it follows    the standardized project folder structure.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Features

- Authentication using **stateless JWT**
- CRUD operations for users, purchases and products
- Integration with **PostgreSQL** database
- Test-driven development
## instructions to run project
Port, at which database is running is  5432
Go to postgres: add a user called 'for_apps' with password: 'password'
Create two databases: 'first_databse', 'first_database_test'

Grant ALL privileges on the two databases to the created user 'for_apps'



to run tests : npm run test-db

to run server: set ENV=dev
               db-migrate --env dev up
               npm run start
