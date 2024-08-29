# WTWR (What to Wear?): Back End

This project is focused on facilitating the back-end of the WTWR application. It will handle user authentication for signing in and signing up, while also providing authorization checks for items to ensure that users don’t accidentally delete someone else's belongings.

## Technologies Used and Techniques

The WTWR (What to Wear?) Back End project utilizes the following technologies and techniques:

- **Node.js**: The project is built using Node.js, a JavaScript runtime environment that allows for server-side execution of JavaScript code.

- **Express.js**: Express.js is a web application framework for Node.js that provides a set of features for building web applications and APIs. It is used in this project to handle routing, middleware, and other web-related functionalities.

- **npm**: npm (Node Package Manager) is the package manager for Node.js. It is used to manage project dependencies and run scripts defined in the project's `package.json` file.

- **Hot Reload**: The project includes a development script, `npm run dev`, which utilizes a hot reload feature. This allows for automatic server restarts whenever changes are made to the code, making the development process more efficient.

- **RESTful API**: The project follows the principles of a RESTful API design. It uses HTTP methods (GET, POST, PUT, DELETE) to perform CRUD (Create, Read, Update, Delete) operations on resources.

- **Middleware**: Express.js middleware functions are used to handle various tasks such as request parsing, authentication, error handling, and more. Middleware functions are executed in a sequential order, allowing for modular and reusable code.

- **Routing**: Express.js routing is used to define the endpoints and handle the incoming requests. It allows for mapping specific URLs to corresponding controller functions, making the code more organized and maintainable.

These technologies and techniques work together to create a robust and efficient back end for the WTWR (What to Wear?) project.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## Live View

If you want to see the project running live, here is the link to it. https://wtwrlarz.twilightparadox.com/
