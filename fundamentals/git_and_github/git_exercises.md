# Git Exercises

## First Set
1. Create a new directory on your Desktop called git_exercises and cd into that directory.
2. Using `git init`, create a new repository.
3. Using the `touch` command, create empty files called foo and bar in your repository directory.
4. Enter `ls` to make sure they were added.
5. Check your `git status`.
6. Using `git add foo`, add `foo` to the staging area. Confirm with `git status` that it worked.
7. Using `git commit -m` add an appropriate message, add foo to the repository.
8. Check your `git status`.
9. Using `git add bar`, add bar to staging area. Confirm with git status that it worked.
10. Now run `git commit -m` option, and add the message `“Add bar”`.
11. Using `git log`, confirm that the commits made in the previous exercises worked correctly.
  

## Second Set

1. Use touch to create an empty file called baz.
2. Check that it's there by entering `ls`.
3. Check the status of your git. 
4. Add baz to the staging area using `git add .`, then commit with the message `"Add bazz"`.
5. Realizing there’s a typo in your commit message, change bazz to baz using `git commit --amend -m Add baz`.
6. Run git log to get the id of the last commit, then view the diff using `git show <id>` to verify that the message was amended properly.

### Third Set

1. The `git log` command shows only the commit messages, which makes for a compact display but isn’t particularly detailed. Verify by running `git log -p` that the `-p` option shows the full diffs represented by each commit. Press `q` to escape.
2. Create a file `README.md`, add and commit it.
3. Got to github and create a new repository. Connect your local repo to the remote one.
4. Open your README.md and and add the line `# hello there` at the top of `README.md` and save.
5. Check the status, then add, check the status, and then commit the new line with a commit message of your choice. Verify using `git status` that the change was committed as expected.
6. Push your changes: `git push origin master`. Refresh your github and click on the commit to verify the changes.

### Fourth Set

1. Using the markdown below, add a line at the end of the README with a link to the official Git documentation:

```markdown
~/repos/website/README.md
 For more information on Git, see the
[official Git documentation](https://git-scm.com/).
```

2. Commit your change with an appropriate message. Why not?

3. Push your change to GitHub. By refreshing your browser, confirm that the new line has been added to the rendered README. Click on the “official Git documentation” link to verify that it works.
