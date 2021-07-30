# GitHub, Change from Password to PAT


On [August 13, 2021](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
accessing GitHub via password will no longer work.

- [Steps to take on GitHub](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

- Note the amount of time your are giving this PAT to expire, you will have to go through this process again in the set amount of days

Be sure to leave this view open so you can go back and copy/paste this PAT when you are ready

If you need to [reset your Mac Credintials](https://docs.github.com/en/get-started/getting-started-with-git/updating-credentials-from-the-macos-keychain)


**Anywhere in Terminal**

```
git credential-osxkeychain erase
host=github.com
protocol=https
```

(hit enter at least once, maybe a few times to get the prompt back)

Then 
- `git clone <any repo>`
- You will be prompted for your GitHub user name, hit enter
- You will be prompted for your GitHub password, instead of entering your password, copy and paste the PAT that you generated

If you are successful, you will be able to clone the repository
Else, it will be rejected and you will have to try the cloning step again. 


Later, if MacOs Keychain has a popup, the password it is looking for is your computer login, not your PAT.

Happy coding!
