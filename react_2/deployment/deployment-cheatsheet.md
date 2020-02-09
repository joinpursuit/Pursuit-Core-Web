# Full-Stack App Deployment Cheatsheet

## Commands

* `heroku create <NAME_OF_YOUR_APP>`. Create a new empty app on heroku.  
  * Better if done in the root directory of your app.
  * Your app name will probably be taken. Try to add something to the beginning or end of the name that could make it unique.
* `heroku addons:create heroku-postgresql:hobby-dev`. Add a Postgres database to your Heroku app. 
  * This database by default is empty. No tables.
  * Heroku will put the url of your database in an environment variable `DATABASE_URL` that you can then use in your code to connect to it.

* `heroku pg:psql -f <PATH_TO_.SQL_FILE>`. Seed your Heroku database by executing your seed file.
  * Example: `heroku pg:psql -f db/seed.sql`
  * Make sure that your comment out the `DROP/CREATE DATABASE` lines as well as the connecting `\c` lines.

* `git push heroku master`. Push your app to Heroku to be deployed to the Heroku app you created earlier.
  * Only what is `commit`ed will go to Heroku so make sure you have added and committed all your files before pushing.

### Other Helpful Commands
* `heroku config`. Helps you see any environment or configuration variables your app will have available when running. Useful to verify if we got a  `DATABASE_URL` correctly set.

* `heroku logs —tail`. See the logs of your app running in Heroku. If anything crashed and you left console.logs when things go wrong then you would see those console.logs here.

* `heroku --help`. If you forget any of the Heroku commands this will display a help page with all of them

* `heroku <SUBCOMMAND> --help`. If you forget the syntax for any of the `heroku` subcommands like `create` or `pg:psql` you can add `--help` at the end to display help information like syntax and options.
  * Example `heroku create --help`

## Troubleshooting 
* When running any of the commands starting with `heroku`

  ```
  Error: Missing required flag:
  ›     -a, --app APP  app to run command against
  ``` 

  If you are getting this error then you should make sure you're running these commands in the project directory, or include `-a <YOUR_APP_NAME_HERE>`

* When trying to push to heroku with `git push heroku master`

  ```
  fatal: 'heroku' does not appear to be a git repository
  fatal: Could not read from remote repository.

  Please make sure you have the correct access rights
  and the`` repository exists.
  ```

  This probably means you didn't create a Heroku App while beeing in the root directory of your project and no remote called `heroku` was added to your git repo so that it could push there. [Checkout this article](https://devcenter.heroku.com/articles/git)
