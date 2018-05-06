
## Server requirements

 -  Nodejs 8.*
## Assets
 - mongodb
 - postman
## REST API
All of files I push in `/app` folder

```
  /app
      - controllers
      - middlewares
      - models
      - routers
      
```
### controllers
   Controlller functions get data from models, create an HTMl, display data and also return json data to client.

### middlewares
   Ciddleware functions do somethings before or after controller functions. like a authentication, redirect and get somedata if you want before controller function.
   
### models
   Models like a CRUD is necessary in most every application for create, update, delete, validations of data and prevent SQL injection.
   
### routers
   Route is point the request to controller functions
   
### crons
  Crons folder is keep all background process.
   
## Modules
  Functions can reusable to other projects.
