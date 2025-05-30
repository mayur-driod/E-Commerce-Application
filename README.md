# E-Commerce Application: Backend Web Development Project

### **Milestone 1: Project Overview**

**Brief Overview:**
This project involves developing a fully functional e-commerce platform utilizing the MERN stack — MongoDB, Express, React, and Node.js. The application will be built using React's Create React App (CRA) for the front-end, MongoDB as the database solution, and Node.js with Express to handle the back-end server operations.

The project will be split into two main areas: **Frontend** (client-side) and **Backend** (server-side) development. 

- **Frontend:** We will be creating various pages for user interaction, including:
  - **Login Page**
  - **Sign Up Page**
  - **Forgot Password Page**
  - **Home Page**
  - **Product Display Page**
  - **Cart Page**
  - **Address Page**
  - **Payment Page**
  - **Order Confirmation Page**
  - **Order History Page**
  - **Help Page**
  - **Error Page**
  - Detailed Product Pages

- **Backend:** The server will interact with MongoDB, a NoSQL database, to handle data management. We will be using the Mongoose library to interact with the database and define schemas for data consistency. To manage communication between the front-end and the back-end, we will implement APIs that allow for CRUD operations (Create, Read, Update, Delete) using HTTP methods like `POST`, `GET`, `PUT`, `PATCH`, and `DELETE`.

We’ll integrate **bcrypt** for password hashing to ensure user data security, and the entire project will follow best practices for backend structure, focusing on scalability and maintainability.

---

### Milestone 2: Frontend Development (Login Page)**

For this milestone, we successfully created the **Login Page** using React's Create React App (CRA). To improve the user interface and design, we will be updating the layout with **Tailwind CSS** for styling and incorporate **React-Icons** for intuitive icons. Tailwind CSS will help us streamline the design process with its utility-first classes, making the UI responsive and visually appealing.

The Login Page will include fields for the user's email and password, and will handle form validation, state management, and error handling for incorrect login attempts. React Icons will be utilized for visual appeal and ease of use, enhancing the overall experience.

---

### Milestone 3: Backend Structure and Initial Setup**

At this stage, we’ve laid the foundation for the backend by setting up the directory structure for the project. The backend is structured as follows:

- **`src/` Directory:** Contains all source code files for the server.
  - **`config/`**: Stores environment configuration files like `.env` for MongoDB URL and the server port.
  - **`controllers/`**: Defines functions to handle incoming requests for various routes.
  - **`database/`**: Contains the MongoDB connection logic in `db.js`.
  - **`middleware/`**: Houses custom middleware functions such as `error.js` for centralized error handling.
  - **`model/`**: Contains Mongoose models for the database schema.
  - **`routers/`**: Defines route handlers for different API endpoints.
  - **`utils/`**: Stores utility functions, including the `ErrorHandler.js` to manage application-level errors.

In the **`index.js`** file, we imported Express, initialized the app, and set up basic routing and server listening. We can now handle HTTP requests through `app.get` and set the server to listen for incoming requests on the specified port.

### Milestone 4: Backend Structure and Initial Setup**
creating user model, user controller and Multer support

### Milestone 6
: Backend Structure and Initial Setup**
Password Encryption and User Data Storage

Password Hashing:

Implement bcrypt to hash the user's password during the signup process.
Ensure that the hashed password is stored in the database instead of the plaintext version to enhance security.
User Data Storage:

Save all relevant user information (e.g., name, email, etc.) in the database.
Maintain the integrity and confidentiality of the password by ensuring it remains encrypted throughout the process.

### Milestone 7
Create Login Endpoint:

Accept user credentials (email/username and password).
Retrieve the corresponding user from the database.
Validate Password:

Use bcrypt to hash the entered password.
Compare it with the stored hashed password for authentication.

## Milestone 8
In this milestone we created two components called Home.jsx and productcard.jsx. product card.jsx is the template used in home.jsx to map out all the products and display them. We also added routes to the home.jsx to display it when the page loads. Based on the number of products the products are mapped and displayed.

## Milestone 9 - Product Form Creation

**Overview**

In this milestone, I created a product form designed to collect all necessary details for new products. This form is essential for inputting data that will be stored in the MongoDB database and displayed on the product page, which was made in the previous milestone.

**Steps Taken**

**Form Development**: I designed and implemented a user-friendly form that allows for the input of multiple products, images along with other relevant product details such as name price description catagory tags... etc.

For this milestone I mostly worked on the frontend of the project. I created a new file named as the productform.jsx.

## Milestone 10

In this milestone I created a schema for products. I made this using a new js file in the Model folder named Productmodel.js. In this I used mongoose to make the schema. I also created a new file called Products.js when I have all the program for initiating a post request that will store all the data in the database. I also used the middleware Multer to process and use the image files that would be uploaded of the product.I have made the neccessary changes to the middleware folder and Index.js to work as intended.

## Milestone 11 and 12

In this milestone we bridged the gap between the frontend and the backend of the productform by connecting it to mongoDB. In the first milestone we made changes to products.js to use the get router to find the data in mongo db and pass it forward to home.jsx where it would then be displayed to show the products that are present on the database. In milestone 2 we were supposed to use nodemailer but it was not done as our mentor said it was unneccesary. Then we made changes to the post router to make the form functional and make it upload new products to the database.

## Milestone 13
In this milestone we made the endpoint for updation. We use the put request to carry it out. In the frontedn we added the delete and edit buttons for editing and deleteing. Also since it should only be visible to the seller we made a whole new productcard.jsx for sellers.

## Milestone 14
added an functionality to delete button to the product data and write and backend endpoint to delete the product with the use of ID. Also fixed some of the other bugs I faced which were causing unexpected behaviours and made the routing much more clear.

## Milestone 15
In this milestone I created a new navbar that renders on all the pages. I added Navlinks for Home, productform, login and signup. I first made a new jsx file called navbar and then created the whole navbar. I also styled it using Tailwind css. I also had other issues that I fixed in home.jsx and styled productform jsx as it had no styling before.

## Milestone 16
Created singleproduct.jsx. The pages is made to show details about the product. I also routed it and made other minor changes.

## Milestone 17 & 18
In these two Milestones we first added the cart details to the schema. Then we also created a post request for sending the details and storing them on the database. We also created an endpoint to receive request from cart page.


## Milestone 19

**Backend:** In this milestone I added the endpoint for the put request from the frontend and then also did app.use(cors()). I also routed it in the controller as well as adding the logic for it.

**Frontend:** I added the components cart.jsx and cartcomponent.jsx where I will render the frontend for cart page. I also used fetch request to get and display the products in the cart. I also added fetch request to put and update the changes made to the quantity of the page using the + and - icons on each product card.

## Milestone 20

In this milestone we made the /profile endpoint to get the user data and then save it in an object. after this we made the profile.jsx where we will show all the user details.

## Milestone 21

In this Milestone I made the Address.jsx which consists of a form component where users can enter details such as country, state, pincode etc. I made use of usestate hook to store the inputs and then sent it to the backend using axios. Once the data has been sent to the backend the usenavigate hook kicks in and navigates to the /profile page. (Do note that only the frontend has been done in this milestone).

## Milestone 22
In this milestone I created an enpoint to recieve the data of the address from the frontend. I also used JWT to authenticate the process.

## Milestone 23
In this milestone we:
Create an placeorder button inside cart page and navigate to select address page when clicked.
Create and select address page that will display all the available address and have an option to select one address.
Write an backend endpoint that will send all the addresses of the user.

## Milestone 24
In this milestone we:
First we will display all the products we are ordering
Next we will display the address user selected to deliver
We will display the total value of the cart
We will have an place order button at the bottom.

## Milestone 25
created an endpoint that will receive the products, user, address details and get the mail of the user using that I will need to retrive the _id of the user.
For each product the order will be different with same address.
using order schema I created earlier I have stored the orders details in mongodb order collection.

## Milestone 26

I have created an endpoint that will receive the user mail
then I will get the mail of the user, using that I will then need to retrive the _id of the user
Using that _id I will need to then get all the orders of that user
after this I will Send all the users orders in the response.

## Milestone 27
In this milestone we created a orderpage in the forntend and the component for displaying the order products with button to cancel the order. Using axios patch and array methods I have been able to remove the product from the database when the user clicks on the remove or cancel button in the orderhistory page. followed this guideline: 
You need to create an my-orders page
You will send an get request to my-orders endpoint that we created in previous milestone.
We will send user mail in to endpoint to get all the user orders
Display all the user orders
We will add my-orders page in navbar for better navigation.

## Milestone 28

In my-orders page for every order add cancel order button has been added.
If the order is already canceled this button will not be displayed
I have created an endpoint that will receive the order-id
Get the order using this id and mark the status canceled and save

## Milestone 29
In this Milestone we created an account in paypal and got the Client ID. We also looked at NPM documentation for react-paypal-js and used it to make the paypal button and integrate the frontend logic for the payment page.
here are the steps I followed:
Please create an PayPal account first PayPal developer dashboard
Once you login you can see an option for an sandbox accounts.
Copy the UserID of that account and save it.
In this sandbox accounts you can find your client id copy and save it.
In your order conformation page you need two options for payment one is COD and another is online payment.
Create radio buttons to select COD or online payment and when we click on online payment PayPal buttons need to be displayed.
In next milestone we will write an code to display and use those PayPal online Payments buttons.

## Milestone 30,31 and 32
After creating a PayPal account and getting the UserID inside the sandbox account, implement online payment using the PayPal API with the client key created earlier. Install the react-paypal-js NPM package, which provides the PayPalScriptProvider component to display online payment methods like credit or debit cards. Learn how to use and integrate the PayPal API for handling payments. For global state management, install the react-redux package and create a store folder with two files: store.js and userActions.js. In store.js, configure a store with a userReducer to handle the global email state. In userActions.js, create a function called setEmail to store the email state inside the global store. In index.js, wrap the App component inside the Provider component with the store as props. Use useDispatch in the Login page to store the email in the global state and useSelector in all remaining pages to access the stored email.

## Milestone 33
In this milestone I used JWT to create a token upon login and then made stored it in a cookie.