## Table of Contents
- Introduction
- Features
- Technologies Used.
- Installation
- Environment Variables
- Usage
- Demo
- Contributing
- Author

## Ecommerce App - Server Side
an E-commerce platform that features Product listing with categories and search functionality,Add to cart and remove items, Persistent cart using MongoDB,Order creation and tracking and integrating Paystack as the online payment gateway to handle transactions securely.it was built using the MERN stack (MongoDB, Express.js, React, Node.js) with Redux for state management and Tailwind CSS for styling.

## Features
- **Product Management:** Add, update, and delete products with detailed descriptions, images, and prices.
- **User Authentication:** Secure user login and registration with JWT-based authentication.
- **Shopping Cart:** Add products to a cart, view cart items, and manage quantities.
- **Checkout Process:** Seamless checkout process with order confirmation and payment integration with PAYSTACK.
- **Order Management:** Admin dashboard to view and manage customer orders.
- **Search and Filter:** Search for products and filter by categories, price, and ratings.
- **Responsive Design:** Fully responsive design ensuring a smooth experience on both desktop and mobile devices.

## Technologies Used
### Frontend 
- React JS
- Redux for state management
- Tailwind CSS for styling

### Backend
- Node JS
- Express JS

### Database
- MongoDB

### Payment Integration
- Paystack
 
## Installation
### Prerequisites
- Node.js and npm installed

From your command line, first clone the repo:
### 
```bash
# Clone this repository
$ git clone https://github.com/mr-atuzie/ecommerce_BE

# Go into the repository
$ cd ecommerce_BE

# Install dependencies
$ npm install
```

### Set up environment variables:
Ensure your backend server is running
```bash
REACT_APP_BACKEND_URL=your_backend_base_url
```

### Start the development severs
```bash
$ npm run start
$ npm run dev
```
## Related Repositories 
Backend Repository: [https://github.com/mr-atuzie/ecommerce_FE](https://github.com/mr-atuzie/ecommerce_FE)

## Usage
### API Endpoints:
Here are some of the key API endpoints available,to test your API endpoints, you can use Postman. 

**User Endpoints:**
```bash
# Register a new user
POST /api/users/register

#Log in a user and obtain a JWT token
POST /api/users/login

# Add product to user cat
POST /api/users/addToCart

# Remove product from user cart
POST /api/users/remove

# Destroy user HTTPS cookie
POST /api/users/logout

# Retrieve user profile data (authentication required).
GET /api/users/profile
```

## Demo
[https://2fa-form.netlify.app](https://2fa-form.netlify.app)

## Contributions
Steps to Contribute
### 1-Fork the repository
Click on the "Fork" button at the top right of the repository page to create a copy of this repository under your own GitHub account.

### 2-Clone your forked repository
```bash
$ git clone https://github.com/yourusername/ecommerce_FE.git
$ cd ecommerce_FE
```
### 3-Create a new branch:
```bash
$ git checkout -b feature/your-feature-name
```
### 4-Make your changes
Make the necessary changes or additions to the codebase.

### 5-Commit your changes
```bash
$ git add .
$ git commit -m "Add feature: description of the feature"
```
### 6-Push your changes to your forked repository
```bash
$git push origin feature/your-feature-name
```

### 7-Create a pull request
- Go to the original repository on GitHub and you should see a prompt to create a pull request from your new branch. Follow the instructions to open a pull request.
- Ensure your pull request description clearly explains the changes and why they are necessary.

### 8-Review process
- Your pull request will be reviewed by the project maintainers. You might be asked to make some changes before it gets merged.

## Author 👨‍💻
- **Rex Atuzie** - **[Linkedin](www.linkedin.com/in/rex-atuzie-0ab67820)**, **[Twitter](https://twitter.com/AtuzieR)**, **[Github](https://github.com/mr-atuzie)**, **[Portfolio](https://rexatuzie.netlify.app)**  




