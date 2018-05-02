# Givdo Node Api Server
A Node.js API server for the Givdo app

To use this server, you must have a local instance of MariaDB set up and running. The database will be created automatically. When the MariaDB service is running, follow these steps:

Clone repository:\n
`git clone git@github.com:Givdo/givdo_node_api_server.git`

Change into the directory:\n
`cd givdo_node_api_server`

Install dependencies from package.json:\n
`npm install`

Create database:\n
`node_modules/.bin/sequelize db:create`

Set up database models:\n
`node_modules/.bin/sequelize db:migrate`

Start server:\n
`./bin/www`

The server should be connected to the database and listening on port 3000.

For development, you can also start the server with nodemon so that changes to the code will restart the server:\n
`./node_modules/nodemon/bin/nodemon.js ./bin/www`
