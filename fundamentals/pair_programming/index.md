# GitHub setup for pair programming

## Steps to follow

Person A and person B **must** do all the steps

- Fork the workshop starting point from Pursuit's repo on GitHub.

- In git (on your local machine): clone your fork, giving you a local copy of the code on your machine.

- Navigate to the repo (`cd [name of the directory]`).

- Slack your GitHub link to your partner (same link that the one you are using to `git clone`).

- In git (on your local machine): add your partner(s)’s github fork as “remote”. You can name the remote whatever you want (**except origin** which would already be taken by your own github repo).

## Example

Let’s say Person A is working with Person B on the conditionals lab.
Person A would fork: https://github.com/JOINPURSUIT/conditional_assignment

Then run: git clone https://github.com/PERSON_A/conditional_assignment.git.

Then Person A would cd into that new local conditionals folder and git remote add person-b https://github.com/PERSON_B/conditional_assignment.git.

At this point, Person A would have two “remote”s (which she could see by doing git remote -v):

- origin, pointing to https://github.com/PERSON_A/conditional_assignment.git
- person-b, https://github.com/PERSON_B/conditional_assignment.git

Person B needs to follow the same steps.

## To share changes made to your local codebase...

- Save your file
- `git add .`
- `git commit -m "commit message"`
- `git push`

## To get changes made on someone else’s codebase...
- `git pull person-b master`

Note that you can add more than 2 remotes, if you are working with three partners, all the partner should follow the above steps. 