[![Pursuit Logo](https://avatars1.githubusercontent.com/u/5825944?s=200&v=4)](https://pursuit.org)

# The Internet

It's a series of tubes.

## Learning Objectives

- Talk about what the internet is
- Discuss client/server architecture
- What happens when you type in a url?
- Request/response lifecycle
- Javascript requests

## Prerequisites

- Some familiarity with javascript

---

## Framing & Background

What is the internet? What is it actually made of? How does it work? How do computers talk to each other? All of this is relevant to our jobs as programmers. 

So far, all the code we have written has only existed and run on our local computers. Starting today, we're going to be learning about many things, but most importantly we'll talk about **requests** and how they work. They will be an essential part of our skillset as software engineers building web applications.

## What is the internet?

Short answer: it's a [series of tubes](https://www.youtube.com/watch?v=R8XSo0etBC4)

Long answer: 

The internet is made up of many different types and layers of computers. These computers are connected by fiber optic cables that run around the world. Some even run [across the bottom of the ocean](https://en.wikipedia.org/wiki/Transatlantic_communications_cable).

There is no one place that the internet lives - it's distributed across many different cities, though in many places it's especially concentrated. For example, in Ashburn, VA there are dozens of warehouses holding rows and rows of computers. Some estimates say that 70% of all US internet traffic flows through there, but there's no way to reliably measure that.

Since the internet doesn't live only in one place, there are many challenges with routing internet traffic. There are special computers called DNS servers that just tell other computers where a website's traffic should be routed. Other computers (switches) do the actual routing - literally moving electrons from one fiber optic cable to another.

Just like the internet doesn't exist in one place, there is no single company that runs the internet. There are only a handful of companies that manage networks though, and the networks they manage are called [Tier 1 networks](https://en.wikipedia.org/wiki/Tier_1_network). Sometimes they're called `backbone` networks, and they are extremely large and critical to the continued operation of the internet. If one of these backbones went down, everything connected to it would be unable to communicate - though the rest of the networks would be able to.

![tier 1 network map](https://www.ntt.com/content/nttcom/hq/en/services/network/gin/_jcr_content/par02/tabinpage/tabInPagePar1/image.img.png/1459936652746.png)

![tier 1 network map 2](https://yudhanjaya.com/wp-content/uploads/2016/06/image03.png)

## Clients and servers

You've probably heard the words `client` and `server` before. In a general sense, both of these words just refer to computers. A computer can be either a client, or a server, or sometimes (like your laptop) both!

A `server` is a computer, listening for requests, that holds information. 

A `client` is a computer that asks that computer for information.



## Summary

Do a quick review at the end of the lesson to talk about what you covered.

### Resources

- [A link to relevant documentation](https://www.google.com/)
- Or another [free practice resource](https://www.google.com/)
- etc.
