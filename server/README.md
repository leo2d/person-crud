# person-crud

### Into the stack:

This project use some popular libraries:

- [TypeScript]( https://www.typescriptlang.org/ "TypeScript") - Used for provide types

- [TypeORM]( https://typeorm.io/ "TypeORM") - Used for manage data with PostgreSQL

- [InversifyJS]( http://inversify.io/ "InversifyJS") - Used for provide IoC with Dependency Injecton

- [inversify-express-utils]( https://github.com/inversify/inversify-express-utils "inversify-express-utils") - Used for decorate controllers and DI

- [Express]( https://expressjs.com/ "Express") - Used for build the server

### How to run:

***Before runs make sure you have Node Js installed on your machine***

1. Clone this repository and navigate to the server folder
2. Then run __yarn__ or __npm i__
3. Setup your connection to a PostgreSQL server  
    1. You will need to create the database manualy, so connect to your postgreSQL Server and then run the command for create the database.
        For example: 
        ```sql   
        CREATE DATABASE "crud-person"; //or whatever name you want
        ```
    2. Open the file **dbConfig.ts** in _src/infra/db/config/dbConfig.ts_
    3. Change the value of the follow constants with your connection string:  
         
        ```javascript

        //dbConfig.ts
        
          const DATABASE_HOST = 'localhost';
          const DATABASE_USER = 'postgres';
          const DATABASE_PORT = 5432;
          const DATABASE_PASSWORD = 'postgres';
          const DATABASE_DB = 'crud-person'; //the name of the database you created at the first step
        
        ```
4. Finally you can run __yarn debug__ or __npm run debug__ to run in debug mode or just __yarn start__ or __npm start__ to start the application
5. Optional: Change the app port
    1. For default this app will runs at port `3300` but you can change editting the value of the variable `port` in the **server.ts** file in src/server.ts  
        For example: 
        ```javascript

        //server.ts
        
        const port = 3300; // Note that this value only acepts positive integer numbers
        
        ```


