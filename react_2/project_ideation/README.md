# Planning a Project

This unit, we're going to start working on personal projects for our portfolios. Although not all of this advice will be useful right now, we thought this was a good opportunity to discuss how to create a plan for a large-scale project.

## Step 1: Ideation

If you are creating an original project, it's important to come up with a strong concept. There are a few key things to remember as you're brainstorming:

* **No idea is dumb. All ideas should be saved.**

As you're planning your project, you may have a silly idea. That idea might not work, but the concept might fit into something different - or might be adapted to work. Whether you're working by yourself or as part of a team, it's a bad practice to dismiss ideas outright.

Working on a whiteboard? Take a picture. Working on a Google Doc? Don't erase anything. Sometimes it's when you're scraping the bottom of the barrel that you strike gold.

* **Don't overscope.**

A well-executed bad idea will always be better than a poorly-executed good idea. If your app concept uses Blockchain to encrypt live messages that you collect and display via HTML5 video with support for legacy Internet Explorer versions, then it might be a good idea to scale back. Especially at this early stage, it's better to hold onto your brilliant, difficult ideas for when you're a little bit more experienced. These are our first major projects, and rather than overscoping and pulling our hair out, we should polish them until they absolutely sparkle.

* **Consider the tech landscape.**

If you're coming up with an original concept, don't try to create an app that competes with YouTube. Your app will always be compared unfavorably to it. Think about what can be improved or reimagined about YouTube, and make an app that focuses on that specific thing.

## Step 2: Outlining

Now that you've got a concept, create a README file for your app and do the following:

* **Architect your database and imagine your frontend.**

What does your database look like? What tables does it have? How are they connected? What does it send to the frontend? What does your frontend store? How does your frontend stay performant even if the user-base of your app scales? It's important here to **actually write this stuff out** - create a database schema and an example React centralized state object, put them in your README, and explain what they represent and the choices you made that led you to that structure.

* **Create speculative routing, component structure, and wireframe.**

Routing is super important because it dictates how the user is going to see, use, and understand your website. Component structuring is a little bit trickier, as issues are difficult to anticipate and architecture may change. However, it's still good practice to imagine how your app might look and how your components might contribute to that representation. Once you've got an idea for what your routes and components are going to be, [wireframe](https://en.wikipedia.org/wiki/Website_wireframe) each route to understand what you'd like to represent visually. Free wireframing tools are all over the place - we like [wireframe.cc](https://wireframe.cc/). Put all of this in your README, with descriptions that assume your reader is a random GitHub user who has never seen your project before!

* **Conceptualize a design language and color scheme.**

Tools like [Coolors](https://coolors.co) will help you generate a color scheme. Besides that, what's your design language? Is it blocky? Smooth? Rounded? Sharp? What's that conveying? Are there any websites you're trying to emulate or use for inspiration? What will the mobile experience be? These aspects are super important!

## Step 3: Planning

Now it's time to actually plan your project's implementation. This is convenient, because you've already broken out your project into parts.

* **Determine how much time you have and adjust accordingly.**

Depending on how much time you have, you may have to work fast, or make tough decisions and cut features. It is almost always preferable to have fewer features and great implementation than to have lots of features that only-kind-of work.

* **Implement vertically.**

If your Feed component includes Users, Posts, Likes, Pictures, and Comments, don't implement it first. As much as you can, try to implement each data type/feature set one-by-one. When you're starting your project, *I'm going to implement user profile information today* is a much easier and more straightforward thing to approach than *I'm going to make my feed today*.

* **Separate your time into units.**

If you have a month, break it out into weeks. A week, break it into days. A day, hours. Then determine which features you'll complete by which times. Put it in your README. You don't have to stick to this schedule, but it's important to have so you know if you're behind schedule. Bugs happen, and things frequently don't go according to plan, but at least you *have* one, which puts you in a better position to budget your time - whether you're ahead, behind, or right on time.