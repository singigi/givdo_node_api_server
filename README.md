# Givdo Node Api Server
A Node.js API server for the Givdo app

To use this server, you must have a local instance of MariaDB set up and running. The database will be created automatically by the server application.  

The exact setup instructions for MariaDB vary according to your system, but you should download, install and start it, then set your password to 'password' to correspond to the development configuration we have defined in config/config.json. If you do not choose a password or you set your password to something other than 'password' (without the single quotes), you will not be able to connect.

When the MariaDB service is running, follow these steps:

Clone repository:  
`git clone git@github.com:Givdo/givdo_node_api_server.git`

Change into the directory:  
`cd givdo_node_api_server`

Install dependencies from package.json:  
`npm install`

Create database:  
`node_modules/.bin/sequelize db:create`

Set up database models:  
`node_modules/.bin/sequelize db:migrate`

Start server:  
`./bin/www`

The server should be connected to the database and listening on port 3000.

For development, you can also start the server with nodemon so that changes to the code will restart the server:  
`./node_modules/nodemon/bin/nodemon.js ./bin/www`
