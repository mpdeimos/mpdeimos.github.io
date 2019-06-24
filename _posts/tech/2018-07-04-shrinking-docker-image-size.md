---
title: Shrinking the Size of our Teamscale Docker Image
layout: external
external: https://www.cqse.eu/en/blog/shrinking-docker-image-size/
image:
  path: posts/tech/2018-07-04-shrinking-docker-image-size/hero.png
  thumbnail: posts/tech/2018-07-04-shrinking-docker-image-size/hero.png
categories: Tech
tags:
  - docker
  - cqse
---

In this post on my company's blog I present the steps we took to cut our product Docker images in half---from over 1GB down to under 500MB. It outlines some common pitfalls when working with Docker images and shows some tricks of dealing with required third party dependencies.