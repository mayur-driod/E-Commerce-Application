# E-Commerce-Application
Follow Along Project for Backend Web Development

# Milestone 1: Project Overview

**Breif Descriptions:**
This will be a E-commerce website that uses the MERN stack which stands for MongoDB, Express, React and finally Node.js. Here we will use React's CRA for frontend web development, MongoDB for the database or storage and Node.js and express for the backend of the platform. Here we will develop things for the client side which is front end as well as Server side which is backend. The website will use MongoDB which is a non-SQL based database structure which uses objects to store all the data. We will use CRA react to develop the frontend. The website will also have multiple pages including the login page, sign up page, forgot password page, Home page, product display page, cart page, address page, payment page and also confirmation page, orders page, help page, error page. We would also have in detail pages of each product.

We will also be making use of API for retrieveing, posting and updating data through commands such as put,post,patch,delete in our platform to have communication between the server and the client. The client will be the user end which would prompt the server to retrieve, make changes or add information to the database. We will be using the mongoose database schema to manage the database. We will also in the later part use bercrypt to encrypt and secure the website.

**Milestone 3:** 
In this milestone We created the folder structure for the backend including the src directory which has config, controllers, database, middleware, model, routers and utils directories inside. In the config directory we made the .env file which has the mongoDB url and the port. The database has a db.js file. The middleware has the error.js and utils has the ErrorHandler.js file. In the index.js file I imported express and called it and assigned it to the variable app. After this I could use the get and listen methods using app.get and app.listen in the index.js. So now I have a server which is setup.