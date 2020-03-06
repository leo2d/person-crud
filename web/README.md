# person-crud
### Crud with NodeJs with Typescript and React

### Into the stack:

This project was developed  with __React Js 16.13.0__ and Hooks.

### How to run:

***Before runs make sure you have Node Js installed on your machine***

1. Clone this repository and navigate to the web folder
2. Then run __yarn__ or __npm i__
3. Setup the connection to the api
    1. Open the file **api.js** in _src/services/api.js_
    2. Change the value of the follow constants with your connection string:  
         
        ```javascript

        //api.js
        
        const Api = axios.create({
            baseURL: `${'your server address'}:${'your server port'}/api`,
        });

        
        ```
4. So you can run __yarn start__ or __npm start__ to start the application
5. Important: __Note that you will need internet connection, because these projects uses some CDN resources__