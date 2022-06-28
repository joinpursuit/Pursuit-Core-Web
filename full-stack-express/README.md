# Module 4: Full Stack: PERN-Stack: Postgres, Express, React, Node

We're going to be learning about full stack web development.

First, we're going to learn about servers and how to send:

- Simple strings
- Very short bits of HTML
- JSON

We won't be using a database yet. We're going to mock it by just using arrays of objects to represent the way the database would send and receive data. This will allow us to focus on the concepts and code of servers.

Then, we'll to create a more robust view of our data (connect to React app)

Next, we'll learn about databases and learn basic SQL.

Finally, we'll connect our server to our database so that we can create full stack web applications.

## Learning Outcomes

- Explain what is the internet
- Explain the request/response cycle
- Describe what a server does
- Use Express to build a server
- Use Express to build a RESTful API that has full CRUD functionality for one model
- Create views for the express API using React
- Explain what is a database
- Use Postgres to build a database and interact with it through its CLI
- Use SQL to run CRUD operations and JOINs
- Use pg-promise npm package to build a web application backed by SQL
- Build a backend with multiple models that have at least one relationship (one to many)

## Lessons and Labs

|                                                 Lesson                                                 |                                                                           Lab                                                                           |
| :----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: |
| Kickoff & [Introduction to Boostrap](https://github.com/joinpursuit/Intro-to-Bootstrap-CSS-Code-Along) |                                                                     Not Applicable                                                                      |
|              1a. [Intro to Internet & Servers](./intro-to-internet-and-servers/README.md)              |                                                                     Not applicable                                                                      |
|                  1b. [npm & Express Response](./intro-to-express-response/README.md)                   |                                           [Intro to Express](https://github.com/joinpursuit/intro-to-express)                                           |
|                       2. [Express Request](./intro-to-express-request/README.md)                       |      [99 Pokemon Express](https://github.com/joinpursuit/99-pokemon-express) [**BONUS:** Express UFO](https://github.com/joinpursuit/express-ufo)       |
|                     3. [Express CRUD/MVC](./express-rest-crud-mvc-index/README.md)                     |                                       [Express Fitness](https://github.com/joinpursuit/express-fitness)                                        |
|     4. [Express Middleware & RESTful Routes: Show & Create](./express-rest-show-create/README.md)      |                                        [Captain's Log Parts 1 & 2](https://github.com/joinpursuit/captains-log)                                         |
|          5. [Express Restful Routes: Update & Delete](./express-rest-delete-update/README.md)          |                                       [Captain's Log Part 3](https://github.com/joinpursuit/captains-log#part-3)                                        |
|               6. [Connect Express & React (2 Parts)](./express-connect-react/README.md)                |                     [Captain's Log Front End - submit separately from back-end](https://github.com/joinpursuit/captains-log-react)                      |
|               7. [Connect Express & React (2 Parts)](./express-connect-react/README.md)                |                     [Captain's Log Front End - submit separately from back-end](https://github.com/joinpursuit/captains-log-react)                      |
|                  8. [Intro to Databases/SQL Part 1](./intro-to-sql-part-1/README.md)                   |                                               [SQL Regifter](https://github.com/joinpursuit/sql-regifter)                                               |
|                         9. [App Planning: ERDs](./app-planning-erds/README.md)                         |                                                  [Wavetree.io](./app-planning-erds/activity/README.md)                                                  |
|                  10. [Intro to Databases/SQL Part 2](./intro-to-sql-part-2/README.md)                  | [Choose Your Own SQL Adventure](https://github.com/joinpursuit/Pursuit-Core-Web/blob/master/full_stack_express/intro-to-sql-part-2/README2.md#lab-time) |
|                  11. [Express & SQL: Seed & Read](./express-sql-seed-read/README.md)                   |                                           [Tuner Part 1](https://github.com/joinpursuit/tuner-full-stack-app)                                           |
|                12. [Express & SQL: Show & Create](./express-sql-create-show/README.md)                 |                                       [Tuner Part 2](https://github.com/joinpursuit/tuner-full-stack-app#part-2)                                        |
|              13. [Express & SQL: Update & Delete](./express-sql-delete-update/README.md)               |                                       [Tuner Part 3](https://github.com/joinpursuit/tuner-full-stack-app#part-3)                                        |
|                             14. [PERN Stack: CRUD](./pern-crud/README.md)                              |                              [Tuner Front-End](https://github.com/joinpursuit/tuner-full-stack-app/blob/main/README-FE.md)                              |
|                  15. [PERN Stack: One to Many Part 1](./pern-one-to-many-1/README.md)                  |            [Tuner Add One to Many](https://github.com/joinpursuit/tuner-full-stack-app#bonus-part-5-part-4-is-a-react-app-see-other-readme)             |
|                  16. [PERN Stack: One to Many Part 2](./pern-one-to-many-2/README.md)                  |                                             [API Planning](https://github.com/joinpursuit/api-planning-lab)                                             |
|                      17. [App Planning: Trello](./app-planning-trello/README.md)                       |                                      [Plan a veternarian App w. Trello](./app-planning-trello/activity/README.md)                                       |
|                  18. [App Planning: Wireframes](./app-planning-wireframes/README.md)                   |                                  [Plan a veternarian App w. Wireframes](./app-planning-wireframes/activity/README.md)                                   |
|                    BONUS [PERN Stack: Many to Many](./pern-many-to-many/README.md)                     |                             [Add Functionality to an Existing API](https://github.com/joinpursuit/resource-photography-api)                             |

## Individual Project/ Mid-Module Assessment

| Project                                                                   | Standards                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Budget App](https://github.com/joinpursuit/budgeting-app-project-prompt) | <ul><li>Use frequent, descriptive, small commits to demonstrate best practices with git and GitHub</li><li> Access and manipulate objects and objects in arrays</li><li>Connect a React App to the Express API</li><li>Create a responsive UI that is easy to use and has components that represent the data from the server</li><li> Create an Express app that uses a RESTful pattern to perform CRUD functionality </li><li> Use routes to send responses and errors</li><li> Use middleware to handle critical functionality of the server</li></ul> |

## Pair Project

| Project                                                   | Standards                                                                                                                                                                                                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Snack-A-Log](https://github.com/joinpursuit/snack-a-log) | <ul><li>Apply all learnings and techniques from last project</li><li>Use a databse connected to the express server to perform full CRUD across the PERN stack</li><li>Develop a more complex and useful app through collaboration</li></ul> |

## Full Stack Portfolio Project

Details forthcoming

## Additional Resources

- [Algorithm Challenges/Code Wars](https://github.com/joinpursuit/Pursuit-Core-Web/tree/master/full-stack-express/algorithm-challenges)
- [Bonus/Misc Lessons/Activities](https://github.com/joinpursuit/Pursuit-Core-Web/tree/master/advanced_or_misc/bonus_module_4)

- [Former Module 4 Content Pre 7.0 class](../node/)
