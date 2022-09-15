Port, at which database is running is  5432
Go to postgres: add a user called 'for_apps' with password: 'password'
Create two databases: 'first_databse', 'first_database_test'

Grant ALL privileges on the two databases to the created user 'for_apps'



to run tests : npm run test-db

to run server: set ENV=dev
               db-migrate --env dev up
               npm run start
