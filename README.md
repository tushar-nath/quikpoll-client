
# QuikPoll
QuikPoll is a real-time polling and chat application. This repository contains the server-side code.

 

## Getting Started 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites  
Node.js (v14 or later) - npm (comes with Node.js) - MongoDB

### Installation

1. **Clone the repository:**
    
    `git@github.com:tushar-nath/quikpoll-server.git`
    
2.  **Install the dependencies:**
    
    `npm install` 
    
    
3. **Set up environment variables:**  Create a `.env` file in the project root directory and add the following variables:

    `REACT_APP_NODE_SERVER_BASE_URL=http://localhost:4000`

4. **Start the server:**
	`npm start`
	The server will be running at `http://localhost:4000`.

## Features 
- User authentication (signup/login) 
-  Real-time chat 
- Create and participate in polls
- Real-time updates for poll results

## API Documentation

### API Endpoints

- `POST /api/users/signup`: Register a new user. 
-  `POST /api/users/login`: Authenticate and log in a user. 
-  `PUT /api/users/:id` (Authenticated): Update a user's profile. 
-  `DELETE /api/users/:id` (Authenticated): Delete a user's account. 
-  `GET /api/users/` (Authenticated): Get a list of all users. 
-  `GET /api/users/search?name=<name>` (Authenticated): Search for users by name. 
-  `PUT /api/users/follow/:id` (Authenticated): Follow another user.

  

### WebSocket Events  
- `connection`: Fired when a client connects
-  `disconnect`: Fired when a client disconnects
-  `message`: Receive and broadcast chat messages
-  `typing`: Broadcast typing indicators 
- `vote`: Handle and broadcast poll votes

### Health Check Endpoint -
-  `GET /api/healthcheck/`: Check the health status of the application.


## Built With  
- [React](https://reactjs.org/) 
- [React Router](https://reactrouter.com/) 
- [Socket.IO Client](https://socket.io/docs/v4/client-api/) 
- [Axios](https://axios-http.com/) 
- [Tailwind CSS](https://tailwindcss.com/)
