# Databases


## Why do we need databases?

The JavaScript objects you create and the HTTP queries you make don't, by themselves, save anything after a user exits your application. This isn't much like the web apps that you're probably used to. For example, Facebook stores your messages, post history, images, etc., such that whenever and wherever you log in, that stuff will be there—in developer-speak, it will *persist*.

![database diagram](http://felixthea.com/wp-content/uploads/2014/04/Diagram-of-Fullstack.png)

You can probably imagine how you might save things with the tools you have now. You'd go into your JSON objects, you'd set keys to point to different values, and you'd save the file.

However, this method is limited in lots of ways. For example, what if you wanted to get the image URLs of photos of a user posted by that user's friends, but not by the user themselves? This seems like an edge case, but in fact, it's not that unusual—if you look at "advanced search" sections of websites you browse, you'll see all sorts of powerful, complex ways you can sort information.

This is where databases come in. More specifically, this is where **relational databases** come in.

## Relational databases

Relational databases are sometimes referred to as RDBMS, or Relational Database Management Systems. RDBMS store data in **tables**, which are exactly like they sound—not too different from Excel spreadsheets or any other way you've seen data stored in rows and columns.

For example:

| id  | title            | year |
| --- | ---------------- | ---- |
| 1   | Reservoir Dogs   | 1992 |
| 2   | Pulp Fiction     | 1994 |
| 3   | Jackie Brown     | 1997 |
| 4   | Kill Bill Vol. 1 | 2003 |
| 5   | Kill Bill Vol. 2 | 2004 |

True to their name, relational databases *relate* tables to one another. For example, above is our movies table, and there may be a directors table, and directors can have many movies. With this relationship in place, we can **query** our database to extract (in an easy way, without messy if/else statements or string comparison) all the movies a particular director has made.

We can even drill down further. If we had an actors table, for example, we could potentially query the database to find all of the movies an actor and a director have made together.

In the above example, the **id** column is key to accomplishing this. In fact, it's so key, it's known as our **primary key**. We might have a column called director_ids, containing the ids of corresponding directors for our movies. In the movies table, the director ids are known as **foreign keys**.

Let's see how that might look:

| id  | title            | year | director_id |
| --- | ---------------- | ---- | ----------- |
| 1   | Reservoir Dogs   | 1992 | 32          |
| 2   | Pulp Fiction     | 1994 | 32          |
| 3   | Jackie Brown     | 1997 | 32          |
| 4   | Kill Bill Vol. 1 | 2003 | 32          |
| 5   | Kill Bill Vol. 2 | 2004 | 32          |

In this table's case, we are just referring to Quentin Tarantino movies, so the director_id would be the same. However, we can store all sorts of movies this way, from all sorts of different directors, without a problem.

### Challenge

You are designing the database for Facebook. How do you organize the tables? How do the tables relate to one another? Feel free to discuss this in groups.

Organize your abstract database *schema* as follows:

```
Table USERS
Has many POSTS
Belongs to GROUPS
```
etc.

Questions to consider:
* What parts of Facebook make the cut to have their own tables?
* What parts are just columns in a table?
* How do your connections between tables allow you to access and sort information?

## Interacting With Databases

By this point, you might be asking yourself: "Okay. I understand (sort of) how tables are set up, but I still don't know how I'd use JavaScript to interact with them."

This makes sense! JSON files are accessible in the same way regular old JS objects are—you just key in to grab values. There isn't a clear way to do this with our relational tables.

The answer is something called **SQL**—or, "Structured Query Language." We won't get too deep into SQL at this point, but for now, just know that it doesn't look too much like JavaScript at all. It's a whole other language, designed for one specific purpose—to extract, add, change, and remove data from relational databases.

It looks something like this:

```sql
SELECT
  *
FROM
  movies
WHERE
  movies.director_id = 32
```

Abstracted, many SQL queries look like this:

```sql
SELECT
  columns
FROM
  table
WHERE
  conditions
```

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


**Resources**
* [Wikipedia on Databases](https://en.wikipedia.org/wiki/Database)
* [How websites work with databases](https://developer.mozilla.org/en-US/docs/Learn/Drafts/How_websites_work_with_databases)
* [SQL in Simple English](http://www.codecoffee.com/articles/sql1.html)
* [SQL Tutorial](http://www.sqltutorial.org/)

**Practice & Exercises**
* [SQLBolt](https://sqlbolt.com)
* [SQL Zoo](https://sqlzoo.net/)
