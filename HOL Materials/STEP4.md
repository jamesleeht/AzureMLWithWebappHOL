# 4. Deploying web app to Azure

## Introduction

There are 2 steps to this tutorial:

1. Pushing the webapp to Github
2. Deploying to Azure using CI from Github

## Prerequisites

- Install git - https://git-scm.com/downloads
- Make a Microsoft account if you don't have one
- Make a Github account if you don't have one

## Initialise a Github repository

A Github repository is a great way to store your code online and collaborate with others on a codebase. You can plug your repository in to a hosted web app and each time you make changes to the repository, the changes automatically deploy onto your web app (this is called Continuous Integration). Log in to [Github](http://github.com). Click on the + sign at the top right hand corner, and then click on New Repository. Name and create your repository. Once that's created, click on the Code tab of your repository. Click on the green "Clone or download" button, then copy the url (it should end with .git). 

Next, open your command prompt.

Navigate to the folder with the project. If your project is on the desktop, the command would be like this:

```shell
cd Desktop/AzureMLWithWebappHOL/MLDemoStart
```

Now, we need to make the current folder containing your webapp a Git repository. Use this command:

```shell
git init
```

We now need to link our local Git folder to the remote Github repository. Type in the following command:

```shell
git remote add origin https://github.com/yourusername/yourrepositoryname.git
```

Make sure you use the url you copied earlier in the above command. Your local Git repository is now remotely tracking your Github repository online. Type `git remote -v` to check that it points to the correct url.

Once that's done, let's commit and push our code to the Github repo. Run the following commands (separately):

```shell
git add .
git commit -m "Initial commit"
git push origin master
```

If you refresh your Github repository online, you should see that your code has been pushed to it. Now let's use continuous integration to deploy the code in our Github repo into a web app hosted online. 

## Deploying to Azure

Go to the [Azure Portal](https://portal.azure.com). Click on 'New' (it's at the sidebar), go into the web + mobile tab, and click on Web App. Name your web app whatever you'd like, name your resource group something sensible. Your Subscription should be free, and the location your app is hosted on can be anywhere, but it might be good to set it to a region close to you. Go ahead and create your web app.

It might take a while, but you will get notified when your web app has been successfully created. Once it has been created go into All Resources (it's on the sidebar) and look for the web app you just created. Click into it and it should display a dashboard with info about your web app. Click into the Github blade under Choose Source. Then, click into Authorization and log in with your Github credentials. Then, select the project and branch (should be master) that your webapp is in. Leave the Performance Test as not configured and hit ok. 

![CI](https://raw.githubusercontent.com/jamesleeht/XamarinMarsHOL/master/Images/cintegration.PNG)

It may take a while for the latest commit to sync and be deployed to your web app. If the latest commit doesn't seem to be syncing, just hit sync. You'll see a green tick with your latest commit once it's done. 

![CISuccess](https://raw.githubusercontent.com/jamesleeht/XamarinMarsHOL/master/Images/cintsuccess.PNG)

Congrats! Your webapp is now deployed. You can try going to the .azurewebsites.net URL you're provided to test your webapp online.