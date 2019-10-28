# Databases 2: Creating Databases & Tables in Postgres

# Goals

- Know what Postgres is.
- Learn to create a Postgres Database.
- Learn to create tables in a Postgres Database.
- Define columns in a Postgres table.
- Understand basic Postgres data types.
- Build a small Postgres database.
- Learn about table constraints.
- Understand Primary Key and Foreign Key constraints and how to create them.

# Lesson

## Postgres

Okay, so we've been learning how to make SQL queries and get information from databases using SQLZoo. That's nice, but it's not the full picture. If we're developing production apps, we don't just want to be able to ask for and get data—we want to create, update, and delete information from our own databases.

In order to do this, we need something called a **database server**, which is handled by an **RDBMS** or a Relational Database Management System. In this case, we're going to use a service called **PostgreSQL** (AKA Postgres).

### Postgres Intro

You should be familiar with the **client-server model** from our work with HTTP. SQL is simply another language used for querying a server to get, update, or delete
information. You can think of Postgres like Node's HTTP module in that it acts as a middleman between these requests and responses.

Previously, if we wanted to store data to be displayed we needed to keep it in our state. If you refreshed the page, the state was reset and the data was lost. Also, the saved information in state could only be viewed on one computer. With a database, we can save our information forever and it can be viewed by anyone. What's different now is we need to _request_ the data from the database by sending a request to our server. Similar to how we would get data from an API except the data is coming from a database _we_ create and manage.

With an API:
**User** -> _HTTP Request_ -> **Outside API Server** -> _Database SQL Query_ -> **Outside API Database**

With our Database:
**User** -> _HTTP Request_ -> **Our Node Server** -> _Database SQL Query_ -> **Our Database**

### Installing Postgres and setting up a server:

https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/


### pg-promise

https://github.com/vitaly-t/pg-promise

#### Resources

- [Installing Postgres on Linux](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)
- [Postgres Mac App](https://postgresapp.com/)
