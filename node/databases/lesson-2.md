# Databases 2: Postgres & PG-Promise

# Topics

- What is Postgres?

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

## Advanced SQL - JOINs

A quick refresher: databases, at their core, are made up of tables. Those tables can point to one another by way of _foreign keys_. For example, in a database of teachers in a school district, each teacher might have a column indicating their `school_id`. These integers would point to IDs in a `schools` table. That way, we can query the `teachers` table for teachers that come from a particular school.

This method of querying presents a problem. Database queries are expensive operations. In the modern web, querying a database is frequently a computational _bottleneck_, which simply means it's one of the more time-consuming actions our apps can perform. This means, if we want to query for information across multiple tables, it doesn't make sense for us to send multiple queries to our database.

Enter **joins**.

Joins are a way for us to grab information from two tables at once. Think of them as a way to grab all of the information that you'll find relevant from each table. This presents opportunities and problems, which is why different types of joins prove useful.

Take a look at the article in the Resources section, [A Visual Understanding of SQL Joins](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/). Here, you'll find the different types of joins, which I'll list below:

- `INNER JOIN` -OR- `JOIN`
- `FULL OUTER JOIN` -OR- `FULL JOIN`
- `LEFT OUTER JOIN` -OR- `LEFT JOIN`
- `CROSS JOIN`

There's a `RIGHT OUTER JOIN`, too, which works the same way as `LEFT OUTER JOIN`. Largely, we'll want to be doing the first three types of joins. Don't worry about `CROSS JOIN` for now.

In order to produce nice, orderly data, you'll want to join `ON` particular columns. To use our earlier example, let's say you wanted to get the school's name next to the teacher. You could do something like this:

```sql
SELECT first_name, last_name
FROM teachers
INNER JOIN schools
ON teachers.school_id = schools.id
```

This would produce a list of teachers with their corresponding schools next to their names. It would only include teachers that have `school_id`s that correspond to entries in the `schools` table-that's what our `INNER JOIN` is doing.

## `NULL`

So, what's the real difference between "outer" and "inner" joins?

The answer has something to do with `NULL`. `NULL` is SQL's way of saying that a piece of data does not exist in the database. INNER JOINs hate `NULL` values. In our above example, if a teacher didn't have a `school_id` (i.e. if it was `NULL`), it wouldn't show up in our response.

However, if we did a FULL OUTER JOIN, teachers without a `school_id` would show up. We might get something like this:

| id  | fname    | lname    | school_id | id  | name                   |
| --- | -------- | -------- | --------- | --- | ---------------------- |
| 1   | James    | Simpson  | 12        | 12  | Lapham Elementary      |
| 2   | Rita     | May      | 12        | 12  | Lapham Elementary      |
| 3   | Godfrey  | Paterson | 14        | 14  | O'Keeffe Middle School |
| 3   | Steve    | Leavitt  |           |     |                        |
| 5   | Eva      | Orton    | 16        | 16  | East High School       |
| 6   | Patricia | Clark    | 12        | 12  | Lapham Elementary      |

Without an OUTER JOIN, we'd never see Steve Leavitt. That's because his `school_id` is `NULL`. Keep this in mind!

### Installing Postgres

#### Resources

- [Installing Postgres on Linux](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04)
- [Postgres Mac App](https://postgresapp.com/)
