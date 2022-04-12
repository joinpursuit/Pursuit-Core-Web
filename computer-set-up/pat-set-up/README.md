# Changing from Password to PAT on GitHub

On [August 13, 2021](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token), accessing GitHub via password will no longer work.

If this is your issue, your error looks something like this:

![Error on the command line showing "support for password authentication was removed."](./assets/github-pat-error.png)

## Steps To Take On GitHub's Page

Follow [these steps on GitHub's Site](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).

Please note the amount of time you are giving this PAT to expire; you will have to go through this process again after that time has expired for improved security.

Be sure to leave this view open so you can come back and copy/paste this PAT again if you need to. Once you're cloning/pushing again, you can close it.

## If You Need To Reset Your Mac Credentials

[Source](https://docs.github.com/en/get-started/getting-started-with-git/updating-credentials-from-the-macos-keychain)

**Anywhere in Terminal**

```sh
git credential-osxkeychain erase
```

This will not give you ANY feedback, but instead simply move the cursor to the next line.

Enter:

```sh
host=github.com
```

You will once again receive no feedback as your terminal just puts you on the next line, where you will enter:

```sh
protocol=https
```

After you have entered that and pressed Enter, you will have to press it AT LEAST one more time to get back to a regular prompt.

Then

- `git clone <any repo>`
- You will be prompted for your GitHub user name, hit enter.
- You will be prompted for your GitHub password, but INSTEAD OF entering your password, copy and paste the PAT that you generated and hit enter.

If you are successful, you will be able to clone the repository.
If you were not, you either got your username wrong, or you copied the PAT incorrectly. If you kept the page open, try copying it again. If you closed the page, you will have to create a new PAT.

Later, if the macOS Keychain has a popup, the password it is looking for is your computer login, NOT your PAT.

Happy coding!

## Expired Token Update

You will get an email prompt to update your key that is about to expire.

[Here is a helpful markdown for updaint](https://gist.github.com/jonjack/bf295d4170edeb00e96fb158f9b1ba3c)
