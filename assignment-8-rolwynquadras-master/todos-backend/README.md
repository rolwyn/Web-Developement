# Assignment 8 Backend

```Name: Rolwyn Quadras, NUID - 001554737, Email - quadras.r@northeastern.edu```

**Create a simple Nodejs/Express REST API for a simple to-do app.**

**Requirements**

The goal of this assignment is to learn about Nodejs and REST API.

**User Requirements**

1. As a developer, I should be able to fetch all existing to-do items using Todo Resource.
2. As a developer, I should be able to add a to-do item using Todo Resource.
3. As a developer, I should be able to update a to-do item using Todo Resource.
4. As a developer, I should be able to delete a to-do item using Todo Resource.

**Technical Requirements**

1. The goal of this assignment is to learn about Nodejs and REST API.
2. Use the express framework for developing the endpoints.
3. Use MongoDB for the persistence layer.
4. A todo object has id, title, description, createdDate, & lastModifiedDate properties.

**How to run**

1. Clone the Repo using ```git clone``` command followed by the HTTPS link in terminal.

    Example: ```https://github.com/neu-mis-info6150-fall2021/assignment-7-rolwynquadras.git```

2. Do ```npm install``` to install all the development dependencies
3. Go to terminal and run ```node server.js```
4. Open a web browser and enter the url which was set ```http://localhost:4200/todos

**Project Structure tree**

```
├── app
│   ├── main.js
├── api
│   ├── controllers
│   │   ├── todo.js
│   ├── models
│   │   ├── todo.js
│   │   ├── index.js
│   ├── routes
│   │   ├── todos.js
│   │   ├── index.js
│   ├── services
│   │   ├── todo.js
│   ├──app.js
├── README.md
├── package.json
├── package-lock.json
└── .gitignore
└── server.js
```
