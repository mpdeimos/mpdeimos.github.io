---
layout: post
title:  "Jekyll Reloaded"
categories: Tech
image: 
  path: posts/tech/2021-08-21-jekyll-reloaded/hero.png
  thumbnail: posts/tech/2021-08-21-jekyll-reloaded/hero.png
  caption: |
    [Ocean Shoreline Jekyll Island \| CC0 Public Domain](https://www.maxpixel.net/Ocean-Shoreline-Jekyll-Island-Atlantic-Coastline-684152)
tags:
  - myself
  - jekyll
---

It's now two years since [Jekyll 4.0 has been released](https://jekyllrb.com/news/2019/08/20/jekyll-4-0-0-released/).
The release fosters several build performance improvements, but sadly GitHub Pages [remains at Jekyll 3.9](https://github.com/github/pages-gem/issues/651) and there is no willingness to update.
In addition, compiling this site locally became an increasing problem after my Arch Linux workstation was upgraded to the Ruby 3.0 release.
This post explains how to ditch GitHub Pages automatic Jekyll compilation and use GitHub Actions instead.

# Rotting

I really [liked]({% post_url tech/2011-12-01-beta-launch %}) the idea of Jekyll and the ease of hosting a personal site using GitHub Pages---especially that there is no need to run a CMS or manage a webspace.
I'm loosely following the development of Jekyll and was exited to read that version 4.0 will improve compilation times of Liquid, Markdown and SCSS due to extensive caching.
As Jekyll is (was?) developed at GitHub, I expected to see an update to the newest version on GitHub Pages as well.
Sadly they did not update---and the initial 4.0 release is now already two years old.

While there might be reasons of not breaking existing sites, they leave users with an outdated Ruby Gem stack.
GitHub Dependabot already [moaned](https://github.com/mpdeimos/mpdeimos.github.io/pull/4) about several dependencies with security issues.
Moreover, also the Ruby community moved on to Ruby 3.0.
Even worse, after the Ruby package has been updated on my Arch Linux workstation I was left with a [compilation error](https://talk.jekyllrb.com/t/error-no-implicit-conversion-of-hash-into-integer/5890):

    ~/git/mpdeimos.github.io$ bundle exec jekyll serve
    Configuration file: /home/mpdeimos/git/mpdeimos.github.io/_config.yml
                Source: /home/mpdeimos/git/mpdeimos.github.io
          Destination: /home/mpdeimos/git/mpdeimos.github.io/_site
    Incremental build: disabled. Enable with --incremental
          Generating... 
          Remote Theme: Using theme mpdeimos/so-simple-theme
          Jekyll Feed: Generating feed for posts
                        done in 4.18 seconds.
    jekyll 3.9.0 | Error:  no implicit conversion of Hash into Integer
    /home/mpdeimos/.gem/gems/pathutil-0.16.2/lib/pathutil.rb:502:in `read': no implicit conversion of Hash into Integer (TypeError)
            from /home/mpdeimos/.gem/gems/pathutil-0.16.2/lib/pathutil.rb:502:in `read'
            from /home/mpdeimos/.gem/gems/jekyll-3.9.0/lib/jekyll/utils/platforms.rb:75:in `proc_version'

I worked around this issue with [chruby](https://github.com/postmodern/chruby) to keep Ruby 2.7 installed alongside 3.0.
Still, this requires to switch environments each time I want to change something on the site.
So I searched for alternatives.


# Modernization Plan

The immediate goal was to modernize the stack and make things more reliable and reproducible---just as you would do with regular CI/CD.
This means an upgrade to Ruby 3.0, latest Jekyll and replace the automatic compilation and publishing by a CD pipeline. 

Thankfully GitHub Pages supports not only Jekyll-powered websites but also plain HTML sites.
Moreover, with the advent of GitHub Actions, also a CI/CD service is available for free on the same platform.

The idea is simple:

1. Compile the site using GitHub Actions using the __same__ Ruby version as I have locally.
2. Publish the site as plain HTML to the `gh-pages` branch, which GitHub will serve.

# Required changes

The outlined modernization required less changes than I initially anticipated.

## Gemfile

The first step is to update the `Gemfile` and replace the `github-pages` dependency by `jekyll`:

```ruby
gem "github-pages", group: :jekyll_plugins
```

...will turn into...

```ruby
gem "jekyll", "~> 4.2.0"
gem "webrick", "~> 1.7"
```

If you are running on Ruby 3 or newer [also add](https://github.com/jekyll/jekyll/issues/8523) the `webrick` dependency. 
In addition, add any themes and used plugins as dependency.

You may also want to add the directories `.bin` and `.jekyll-cache` to your `.gitignore`.

## GitHub Action

That was already all that's required to compile the site with latest dependencies.
The next step is to create the GitHub Action.
The official Jekyll documentation [covers this topic](https://jekyllrb.com/docs/continuous-integration/github-actions/) as well, hence I'll just briefly outline my variant.

Basically you need to create an action workflow file, e.g. `.github/workflows/ci.yml`, like this:


```yaml
name: Build and deploy jekyll site

on:
  push:
    branches:
      - master

jobs:
  jekyll:
    runs-on: ubuntu-20.04
    steps:
      - name: 📂 checkout
        uses: actions/checkout@v2

      - name: 💎 setup ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 3.0.2

      - name: 🔨 install dependencies & build site
        uses: limjh16/jekyll-action-ts@v2
        with:
          enable_cache: true

      - name: 🚀 deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
          publish_branch: gh-pages
```

This wil do the following things each time a commit is pushed to `master`:

1. Checkout the repository
2. Setup the environment using Ruby 3
3. [jekyll-action-ts](https://github.com/limjh16/jekyll-action-ts) is used to compile the site. You can also use the [Docker-based variant](https://github.com/helaili/jekyll-action) or simply compile 'by hand' as you would do locally.
4. The last step will publish everything that is compiled into the `_site` folder to the `gh-pages` branch. You will need to create a [deploy token](https://github.com/settings/tokens) for this.

Please note that the `gh-pages` branch will be reset on each action execution.
{: .notice--warning}

With the action in place, you should also exclude the `.github` folder in your `_config.yml`:

```yaml
exclude:
  - .github/
```

That's it.
Commit and push the changes to GitHub and the action will be executed and update the site automatically.

# Further improvements

Instead of relying on GitHub for compiling and hosting and alternative would have been to migrate to [Netlify](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-4.0-on-netlify/) or [Cloudflare](https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site).
But in the end I was too lazy to change CNAMEs and familiarize with yet another stack.

I'd also favor to remove the 'local part' of the tech stack altogether and edit and preview the site using a Web IDE like [GitHub Code Spaces](https://github.com/features/codespaces) or [GitPod](https://www.gitpod.io/).
This would eliminate the problems with keeping the local and remote ruby versions in sync.
On the other hand, I'm forced to stay up to date with the current setup.