# person-crud
### Crud with NodeJs with Typescript and React



### How to run:

***Before runs make sure you have Node Js installed on your machine***

1. Clone this repository and navigate to the server folder
2. Then run __yarn__ or __npm i__
3. Setup your connection to a PostgreSQL server  
    1. Open the file **dbConfig.ts** in _src/infra/db/config/dbConfig.ts_
    2. Change the value of the follow constants with your connection string:  
         
        ```javascript

        //dbConfig.ts
        
          const DATABASE_HOST = 'localhost';
          const DATABASE_USER = 'postgres';
          const DATABASE_PORT = 5432;
          const DATABASE_PASSWORD = 'postgres';
          const DATABASE_DB = 'crud-person';
        
        ```
4. Finally you can run __yarn debug__ or __npm run debug__ to run in debug mode or just __yarn start__ or __npm start__ to start the application
5. Optional: Change the app port
    1. For default this app will runs at port `3300` but you can change editting the value of the variable `port` in the **server.ts** file in src/server.ts  
        For example: 
        ```javascript

        //server.ts
        
        const port = 3300; // Note that this value only acepts positive integer numbers
        
        ```


