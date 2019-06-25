---
title: Setup Bazaar Version Control via FTP with multiple users
categories: Tech
tags:
- git
- hacking
image:
  path: posts/tech/2010-01-15-setup-bazaar-version-control-via-ftp/hero.png
  thumbnail: posts/tech/2010-01-15-setup-bazaar-version-control-via-ftp/hero.png
---

*Have you ever been in need to setup a cheap Version Control System?*
Well, there are plenty of free alternatives out in the web that offer
this service for free. GitHub, GoogleCode and SourceForge being the
most popular ones.
But all of them have one disadvantage: They require you to publish the
code to the wild and release it under an open source license. This may
not be a problem if you are releasing the source of your software
anyways, but sometimes you might feel “I’m not ready to publish the
code” or “This project is commercial, I cannot offer the source on the
web.”.

This guide is quite old, nowadays with GitHub offering free private repositories,
I'd simply go that route or use GitLab instead.
Still the guide might be useful for someone---even if it's just entertainment.
{: .notice--info }

Buying a private SVN is expensive, so I’ve searched for another
solution: Wouldn’t it be cool to host the project data on my webspace?
My first idea was to use [IntraVersion](http://top-cat.com/intraversion.php), a
lightweight version control that uses FTP for storing data. But it turned out to
be too difficult to use. Especially if you want just use commandline
tools or a Tortoise-like explorer integration. IntraVersion is just
web-based, so doesn’t feature any of these requirements.
The second idea was to write an own software solution, but due to lack
of time I never came to this step.
Finally I stumbled on [Bazzar Version Control](http://bazaar.canonical.com). Among lots of features (like
distributed version control) Bazaar offers to store project files and
a repository via FTP/SFTP -- so exactly what I was searching for.
Setting things up was quite easy, but I had another requirement:
Access to selected project repositories for different FTP users - an with a
few tricks you can get this quite easy:

## Step-by-Step guide to setup a hosted Bazaar Version Control on your webserver for multiple users

**Requirements:** SSH access to your webspace, ability to
create multiple FTP Users (both fulfilled by the cheapest GoDaddy
Shared Linux Hosting solution). Bazaar being installed on your computer.

**(1)** Access your webspace using SHH (best to use PuTTY for this)

**(2)** Navigate to the root of your html folder (this is where your html,php,… files ly)

**(3)** Create a new folder called `bazaar` and open it

    mkdir bazaar
    cd bazaar

**(4)** Create for each FTP user (including yourself) a
directory. For example:

    mkdir userMe
    mkdir userOne
    mkdir userTwo

**(5)** Open your Hosting Manager via a Webbrowser and
navigate to Manage FTP Users. Here you add as much users as you have
created directories before. Name them according to the folder names
(easier to maintain later on) and specify the user path according to
`/bazaar/%username%`. After these changes are applied try to connect
with one of these users to your FTP Server (using FileZilla for example).
If you get a blank directory listing everything went fine.

**(6)** Now we setup a repository using your FTP account.
Open the Console and navigate to the directory where you want to store your project (or already store it).
Then create a Bazaar project via your FTP account and check it out.
You will be asked for your password each time.
You can prevent this by adding the password to the url (insecure)
*ftp://userMe:password@yourserver.com/myproject1*.

    bzr init ftp://userMe@yourserver.com/myproject1
    bzr checkout ftp://userMe@yourserver.com/myproject1 .


If you have already project files (otherwise create a few dummy files),
add them and do a commit:

    bzr add
    bzr commit -m "Initial Import."


If you want to have better branching (not recommended for beginners)
please refer to [this site](http://doc.bazaar.canonical.com/bzr.dev/en/user-guide/publishing_a_branch.html).

**(7)** Check if everything went fine

    cd ..
    mkdir testcheckout
    cd testcheckout
    bzr checkout ftp://userMe@yourserver.com/myproject1 .


Now you should see project files files in this directory as well.

**(8)** If you want give userOne access to this project as
well, take advance of directory soft links. Open the SSH connection
again and navigate to the `bazaar` directory.

    ln -s ~/html/bazaar/userMe/myproject1 userOne
    cd userOne
    ls -l

If everything went fine you should see a soft link from `myproject1` to `~/html/bazaar/userMe/myproject1`.

**(9)** Check if everything went fine using the shell (I asume you are still in the test scheckout directory)

    cd ..
    mkdir testcheckout2
    cd testcheckout2
    bzr checkout ftp://userOne@yourserver.com/myproject1 .


Now you should see project files files in this directory as well.

I hope, that this will help you setting up a cheap Bazaar Version Control on your webserver.