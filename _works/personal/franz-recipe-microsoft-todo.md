---
title: Microsoft To-Do Franz Recipe
date: 2019-01-05
categories: Personal
image:
  path: works/personal/franz-recipe-microsoft-todo/hero.png
  thumbnail: works/personal/franz-recipe-microsoft-todo/thumb.png
---

Keeping things organized is key to master tasks at work and at home.
In digital life you can choose between a plethora of apps and services that want to support you at staying organized.
I've iterated through a few of these as well---especially after the shutdown of Google Inbox and my Trello "ToDo" board becoming not manageable anymore.
Soon I have found myself very comfortable with [Microsoft To-Do](https://to-do.microsoft.com/) [^1], a lightweight task management solution that focuses on getting stuff done *today*. You basically fill an one day micro-iteration from one ore more of your backlogs (=lists).

As I prefer keeping my communication and task management hub separate from the webbrowser I use [Ferdi](https://getferdi.com/) for these kind of webservices.
Microsoft To-Do, however, was missing in the list of supported services.
Fortunately Franz has a neat mechanism to add further services, called recipes.
So I've spent the hour to create a recipe for Microsoft To-Do.
Besides adding the service to Franz, it displays the count of today's open tasks as badge in the sidebar and contains subtle CSS optimizations to make it look more integrated.

# Installation

1. [Download](https://github.com/mpdeimos/franz-recipe-microsoft-to-do/archive/master.zip){: .btn .btn--inverse .btn--small } the recipe
2. Extract the contents to a new subfolder called e.g. `microsoft-todo` in the `dev` directory (may ot yet exist) of your Franz configuration files:
  * Mac: `~/Library/Application Support/Franz/recipes/dev/`
  * Windows: `%appdata%/Franz/recipes/dev/`
  * Linux: `~/.config/Franz/recipes/dev/`
3. Restart Franz
{: .instructions }

[^1]: Microsoft To-Do is the successor of Wunderlist after its Microsoft acquisition
[^2]: Ferdi is a fork of [Franz](https://meetfranz.com/) with additional features and removed bloat