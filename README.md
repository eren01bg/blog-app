# Project Documentation

## Project Overview

This project is a blogging platform that allows users to read and create blog posts on various topics. Users can register, log in, and create, edit, and delete their own posts. The application features a responsive design, making it accessible on both desktop and mobile devices.

## Technologies Used

- Frontend: Angular
- Backend: Node.js and Express
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS

## Project Architecture

### Frontend

The frontend of the application is built using Angular. Key components and services include:

- Components: PostsGridComponent, PostComponent, HeaderComponent, LoginComponent, RegisterComponent, ProfileComponent, and more.
- Services: PostService, AuthService, CategoryService, providing data access and user authentication.
- Routing: Utilizes Angular Router for managing different views and navigation.

### Backend

The backend is developed using Node.js and Express, providing RESTful APIs. Key components include:

- Routes: Various endpoints for user authentication, post creation, editing, and retrieval.
- Controllers: Handle incoming requests and communicate with models.
- Models: Define MongoDB schema and interact with the database.
- Authentication: JWT-based user authentication for securing routes.

### Database

MongoDB is used as the database for storing user data and blog posts. The schema includes models for users, posts, and categories.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/eren01bg/blog-app`
2. Navigate to the frontend directory: `cd frontend`
3. Install frontend dependencies: `npm install`
4. Start the frontend server: `ng serve`
5. Open a new terminal window.
6. Navigate to the backend directory: `cd backend`
7. Install backend dependencies: `npm install`
8. Set up environment variables: Create a `.env` file in the backend folder with a JWT_SECRET_KEY variable to store the secret key for JWT authentication.
9. Start the backend server: `node server.js`

## Planned Improvements and Features to Add

1. Implement user comments on blog posts.
2. Allow users to like and share posts.
3. Enhance the search functionality with filters and sorting.
4. Integrate social media sharing options.
5. Improve the user interface and add more styling options.
