# Deploying a React App (Frontend) to Netlify

Netlify is a service that make it painless to deploy static websites. It's much easier to work with, and supports a lot of predefined projects, like create-react-app.

### Sign up for a Netlify Account
Go to https://app.netlify.com/signup and sign up for an account using your GitHub account.

### Install `netlify-cli`
Once you have an account and are logged in. Lets install `netlify-cli` globally

```
npm install -g netlify-cli
```
This will gives the `netlify` command that we will use to deploy our app.

### Lets bundle/compile our React App
```
npm run build
```

This will take some time. This command will compile our App into a few files and put them in a folder called `build/`
Our compiled app has all the code we wrote for our app but it is often uglified/minified to save space and protect our code of being inspected. 
Once building its is done we can inspect the build folder.

### Login in netlify with `netlify-cli`
```
netlify login
```

### Deploy

While in your react app:

```
netlify deploy
```

Follow the prompts in the terminal. This will take some time but by the end your app should be deployed. For further detail keep reading:

Choose "Create & configure a new site". You can use your arrow keys to cycle through the options and press enter to make your selection. 

When asked with directory type "build" (without the quotes). This will give a sample URL to check your site. When you're ready to deploy to production run: `netlify deploy —prod` 

Again type "build" when asked which directory. 

Congrats! Your site should now be deployed. 

### Alternatives step by steps
* To deploy though the Netlify Website follow [this tutorial](https://dev.to/easybuoy/deploying-react-app-from-github-to-netlify-3a9j)

### Troubleshooting the "routes refresh" error
If you deploy your site and you get a "404 error" when clicking links or refreshing, create a new file in your public folder and name it "_redirects"

```
touch public/_redirects
```

inside that file, write:

```
/* /index.html 200
```
