# Assignment 6 - JS Todo app

```Name: Rolwyn Quadras, NUID - 001554737, Email - quadras.r@northeastern.edu```

**Create a simple Todo application using JavaScript.**

**Requirements**

The goal of this assignment is to learn about JavaScript & Webpack

**User Requirements**

1. As a user, I should be able to see all to-do items fetched using an fetch/XHR call from a JSON file.
2. As a user, I should be able to click a to-do item and able to see its detailed view.
3. As a user, I should be able to open add a new to-do item view by clicking the add button and this need not be persisted.
4. As a user, I should be able to add a to-do item by entering the title, description, due date, and time.
5. As a user, I should be able to mark a to-do item as complete.
6. As a developer, I should be able to build the app using Webpack.

**Technical Requirements**

1. The goal of this assignment is to learn about JavaScript & Webpack
2. Should use SCSS for styles.
3. Should use webpack for building the app including styles.
4. Should use webpack-dev-server for running the project.
5. Should document your code extensively.
6. Should have .gitignore, ReadMe.md files.
7. ReadMe.md file should have the project description and the instructions to run the project.
8. No JavaScript & CSS libraries should be used for this assignment.
9. No need to save the changes made on UI to JSON file.

**How to run**

1. Clone the Repo using ```git clone``` command followed by the HTTPS link in terminal.

    Example: ```https://github.com/neu-mis-info6150-fall2021/assignment-4-rolwynquadras.git```

2. Do ```npm install``` to install all the development dependencies
3. Use ```npx webpack --config .\webpack.config.js``` to compile the files to a dist folder
4. Use ```npx webpack serve``` to start the webpack development server on localhost 4200
5. Open a web browser and enter the url ```http://localhost:4200/```

**Project Structure tree**

```
├── assets
│   ├── images
├── app
│   ├── main.js
├── sass
│   ├──_variables.scss
│   ├──_functions.scss
│   ├──_mixins.scss
│   ├──main.scss
│   ├──content.scss
├── data
│   ├── todolist.json
├── index.html
├── dist (or build)
├── README.md
├── package.json
├── package-lock.json
└── .gitignore
└── webpack.config.js
```
