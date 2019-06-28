---
title: Merge GIT repositories
tags:
- git
image:
  path: posts/tech/2011-06-25-merge-git-repositories/hero.png
  thumbnail: posts/tech/2011-06-25-merge-git-repositories/hero.png

---

When it comes to version control I am more and more convinced by Git and it's superb branching model. Lately I was confronted with the need to merge two GIT repositories. Per se this should not be difficult, but if the commit history should be preserved it might become a bit tricky! This article explains an easy way to do this without the help of any third party tools.

## Setup

The setup for merging the repositories looks as follows:

-   Main repository: `/repo`
-   Feature repository: `/repo/feature`

So the repository `feature` is a subfolder in the main repository.
This is a common pattern if you're using Git submodules.

There are a few tools out there that can handle this (`git-stitch` for
example), but I wanted to keep the main repository as-is, so this wasn’t
an option.
At least I do not know how to use/configure the tools in that manner and
the method I discovered worked without problems, so why bother?

## Step by Step Guide

**Step 1** - Create a bundle of the feature repository. I assume that
you have all changes committed to the master branch.


    cd feature
    git bundle create feature.bundle master

**Step 2** - Import the code into a new branch of the main repository
and check it out.


    cd ..
    git fetch feature/feature.bundle master:master-feature
    git checkout master-feature

**Step 3** - Move the files into a subdirectory called `feature`. Ensure
to also move hidden ones like the `.gitignore` (run `ls -la` in order to
check)


    mkdir feature
    git mv -k * feature
    git mv .gitignore feature/
    ls -la
    git commit -a -m"moving feature stuff in subfolder"

**Step 4** - Merge the feature into the master branch of the main
repository.


    git checkout master
    git merge master-feature
    git branch -d master-feature

By following these steps you should be able to import any
subrepositories back into the main repository.
Of course this method will leave you with two merged history lines, this means that there are two "initial commits" of the repository.

