# Short Project

<!-- 
## Goals

  - Team Communication And Group Dynamics
    - How To Work As Part Of A Team
    - How To Manage Individual Needs And Expectations In Service A Shared Goal
  - Learn Project Architecture Fundamentals
  - Pragmatic Project Management (design And Implementation)
  - Writing A Maintainable Codebase
  - Inheriting Legacy Code Base 
-->


#### Table of Contents
- [Overview](#overview)
- [Basic Requirements](#basic-requirements)
  - [Brain Storming](#brain-storming)
  - [Role Assignment](#role-assignment)
  - [Project Org](#project-org)
  - [Product Design](#product-design)
  - [Project Infrastructure](#project-infrastructure)
    - [Contribution Guide](#contribution-guide)
    - [Style Guide](#style-guide)
    - [Project Readme](#project-readme)
    - [Automatic Deployment](#automatic-deployment)
  - [Product Development](#product-development)
- [Extra Credit](#extra-credit)



## Overview

The short project has a unique feature in that codebases will be swapped on Monday after solo week (Week 7, Day 1). Diving into legacy code is the mostly likely scenario for a new engineer. Displaying confidence under this pressure will be a distinguishing factor for you. To simulate this, short projects will be swapped. To prepare, the originating team will document their code, syntax styling, git workflow and feature roadmap in sufficient detail so that it can be handed to an arbitrary team with virtually no explanation.

Additionally, this allows you to contribute to an additional project that you'll be able to talk about with potential employers and hype on hiring day. More really _is_ merrier.

I've created a [project-documentation](https://github.com/hackreactor/project-documentation) repo (referenced repeatedly below) that you'll need to refer to as a guide regarding how to successfully document and structure your project on github.

You're also welcome to refer to [Satellite](https://github.com/satellite-game/Satellite/wiki) for inspiration.

## Basic Requirements

#### Brain Storming

- [ ] Execute 'Group Storming Process' as part of the [group formation algorithm](http://en.wikipedia.org/wiki/Tuckman's_stages_of_group_development)

#### Role Assignment

There are three core roles committed to the project in the Scrum process. They are the ones producing the product (objective of the project). They represent the scrum team. Although other roles may be encountered in real projects, Scrum does not define any team roles other than those described below.

As a group, decide which team members will fulfill each of the three core scrum roles.
  - [ ] Scrum Master
  - [ ] Product Owner
  - [ ] Development Team Members

#### Project Org
  - [ ] Your product owner must [Create a new GitHub Organization account](https://help.github.com/articles/creating-a-new-organization-account) for your team. This ensures that all members share equally in the glory of the project, and makes the hand-off after solo week much smoother.
  - [ ] Add all your team-mates as members to the new org.
  - [ ] Create a repo within your new org for your project.

#### Product Design

Create product vision by drafting a 'Project Summary'

  - [ ] Copy [PRESS-RELEASE.md](https://github.com/hackreactor/project-documentation/blob/master/PRESS-RELEASE.md) from the [project-documentation](https://github.com/hackreactor/project-documentation) repo into the root directory of your own project repo and complete the exercise described therein. Note that the actual instructions are hidden in a comment block. You'll need to view the raw file, not the rendered markdown version to see them.
  - [ ] Post the URL in to [Project Dashboard](https://docs.google.com/a/hackreactor.com/spreadsheet/ccc?key=0Ag7daAeJW-4BdDNJa25EWGlydDZTRFlyTzhsUF92UGc&usp=drive_web# gid=5)
  * [ ] Check-in with your Hack Reactor Project Mentor (should appear on you calendar)
  
#### Project Infrastructure

In order to support your current team _and_ future contributers to your project, you'll need to document your project as you build it. It should be the case that, without any intervention or additional explanation from you, the next team of collaborators can dive in and figure out how to start hacking easily.

Document your project and codebase to the point that if you decide to push it to hacker-news, anyone with a solid understanding of JavaScript can (after reviewing your documentation and comments) start submitting pull requests. Plan on not having any face-to-face interaction with the next team of collaborators. The most effective and efficient way to accomplish this is to do it right from the very start. Don't wait till the last minute. That will never work.

Be sure keep your project backlog (in asana or Github issues) up to date. These should be clear documentation of tasks completed (asana and github provide this functionality automatically) and next steps/features in your project backlog so that your collaborators can just dive right in.

##### Contribution Guide

- [ ] Document your team's git workflow by creating a file, `CONTRIBUTING.md` in the root directory of your repo.
  - Feel free to refer to the [project-documentation](https://github.com/hackreactor/project-documentation) repos [CONTRIBUTING.md](https://github.com/hackreactor/project-documentation/blob/master/CONTRIBUTING.md) file for some ideas. It follows the [forking workflow](https://www.atlassian.com/git/workflows#!workflow-forking).
  - Remember, you're welcome to use which ever git workflow you want, this one is provided here as a suggestion.
  
- The [Feature branch workflow](https://www.atlassian.com/git/workflows#!workflow-feature-branch) is another very simple, very popular method  
  - There are several other workflows you can choose from as well, but no matter which you choose, you should always have someone other than the person who wrote the code review it before it's merged into the central repository.
  - Read this excelent (and brief) [article about pull requests](https://github.com/blog/1124-how-we-use-pull-requests-to-build-github)
  - Remember, you're welcome to use which ever git workflow you want, this one is provided here as a suggestion. But whichever workflow you choose, you __must__ be consistent.

##### Style Guide

- [ ] Document your team's style guide by creating a file, `STYLE-GUIDE.md` in the root directory of your repo.
  - Feel free to refer to [STYLE-GUIDE.md](https://github.com/hackreactor/project-documentation/blob/master/STYLE-GUIDE.md) within the [project-documentationn](https://github.com/hackreactor/project-documentation) repo for some ideas. [AirBnB's](https://github.com/airbnb/javascript) and [The Google JS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) are also excellent examples

##### Project Readme

Your project readme is the very first thing that users will see when they view your github project. It's the portal that must link to the other content files in the root of your repo. 
- [ ] Create a thorough readme that has sections structured like the ones found in the project-documentation repos [README.md](https://github.com/hackreactor/project-documentation) file. 
  - It must link to the documentation you've created (as described by the items above).

##### Automatic Deployment

- [ ] Configure automatic deployment of your master branch using Azure

##### Product Development

- [ ] Create a home page for your project. 
  - If you're not sure where to start, checkout using GitHub pages. It's free, robust, and can easily be personalized to your own domain.
  - [ ] Make the landing page a salesman's dream (clear, flashy, cool design, etc)! Templates are your friends!
- [ ] Add a sweet "Made a Hack Reactor" Banner with this simple script:

  ```javascript
  $('body').append(
    '<a href="http://hackreactor.com"> \
    <img style="position: fixed; top: 0; right: 0; border: 0;" \
    src="http://i.imgur.com/x86kKmF.png" \
    alt="Built at Hack Reactor"> \
    </a>'
  );
  ```

## Extra Credit
- [ ] Create a screencast demo of the product and share on landing page.
- [ ] Write a technical blog post
- [ ] Maximize project exposure via reddit stuff
- [ ] Run usability tests, collect user feedback and simplify UI
- [ ] Schedule architecture and product review with mentor

<!-- LINKS -->

[1]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Roles
