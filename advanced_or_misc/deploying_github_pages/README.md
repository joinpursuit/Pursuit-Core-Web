# Deploying to github pages

The extremely thorough documentation is located [here](https://docs.github.com/en/github/working-with-github-pages/getting-started-with-github-pages)

Below is a summary of what you need to do to get your site online!

## Basic ideas

* Create a repo on github called `yourusername.github.io`
	* Mine is called `jabyess.github.io`
* Set up your local repo to point to it
* Push your commits to the new repo
* Configure your github settings to publish the master/main branch
* Visit the live URL!

## Checklist

- [ ] I have created a new (empty) repo on github named `myGithubUsername.github.io`
- [ ] This new repo does not have any commits or files in it
	- If it does, go to the settings tab and delete it and follow the directions below called **Creating a new repo**
- [ ] I have navigated in my terminal to my project directory
- [ ] I have added and committed my work to my local repo
	- [ ] Run `git status` to make sure
- [ ] My main html page is named `index.html`
	- [ ] If not, I have changed it and committed the change
- [ ] I have set my remote url to the new repo I created
	- See **Setting your remote url** below
- [ ] When I run `git remote -v` I see the url as something that contains `mygithubusername.github.io`
	- ex: `git@github.com:jabyess/jabyess.github.io.git`
- [ ] I have pushed my work to the new repository (`git push`)

In the settings tab on github:
- [ ] My repository visibility is set to `Public`
- [ ] `Source` is set to my primary branch (either `Master` or `Main`) and the URL is set to `/(root)`
- [ ] My site is accessible at `https://mygithubusername.github.io`

### Setting your remote url

* Go to github and navigate to the new repo you created 
* Copy the _**SSH**_ URL
* Navigate to the directory where your project is located
* Run `git remote`. Take note of the remote name - it's probably `origin` by default
* Run `git remote set-url <remoteName> <paste your copied url here>`, replacing the `< >` with the proper values

### Creating a new Repo

* Go to github.com
* Make sure you are logged in
* Click the + in the top right next to your username and select `New Repository`
* In repository name, type `yourgithubusername.github.io`
	* If your github user is `jabyess` put `jabyess.github.io`
* Make sure `Public` is set for the visibility 
* DO NOT CHECK ANY BOXES
* Click `Create Repository`