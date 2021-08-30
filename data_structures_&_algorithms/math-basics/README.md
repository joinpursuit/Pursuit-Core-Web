# Math Basics, Reviewed

## Setting Intent

> I will work on making my math skills adequate

Most coding jobs require basic math skills and far less require advanced math skills. 

There are a handful of really useful math methods in JavaScript that can help you get what you need to get done. 


> You are enough

American culture and media is very focused on being _the best_. This can cause feelings and thoughts like 'If I am not going to be the best, what is the point?'

What if we applied this to cooking? What if everyone who cooks just stopped cooking because they were not the best and they believed only the best people should cook? Our world would be a much sadder and emptier place.

You don't have to be the best to make strong positive contributions. You do have to strive to be good, thoughtful, and be willing to learn from your mistakes. This will make a valuable contributor on whatever you work on and a welcome member of any team.

> Don't ask yourself whether you _can_ do it. Ask yourself if you want to try. If the answer is yes, just do your best - Karolin 

This course is hard. Getting stuck is normal. Getting stuck for hours is normal. Part of programming is learning to cope with feelings of being stuck. During the course, you are in a time of transition in your life. It is easy to let the mind wander into questioning your life decisions, especially when you feel stuck/down. 

Most of us don't know what the future holds. Worrying about whether in a year or five you'll be one of the best coders in the world and using that to determine whether you should push through, is going to be much harder on yourself that simply asking "Do I want to be here? Do I want to try to get better?" 

> Live to work or work to live?



## Trivia Questions

Write an answer somewhere that you can easily reference later to practice talking/writing about code:

- What is the difference between `=`, `==` and `===`?
- What is `NaN`?
- Is `NaN == NaN` true or false?
- Is `NaN === NaN` true or false?

## Find the Median 

Using the following numbers array, find the median 

```js
const nums = [14,11,16,15,13,16,15,17,19,11,12,14,19,11,15,17,11,18,12,17,12,71,18,15,12];
```

## Bonus

### Clock Hands



Write a function `clock` that takes two integers, `hour` and `minute`. The function should calculate the two angles in degrees between the **hour hand** and **minute hand** on a twelve-hour analog clock face.

Note that the hour hand has 'drift'. If the time is **6:30**, the hour hand will be halfway through its travel between **6** and **7**. If the time is **9:45**, the hour hand will be three quarters of the way between **9** and **10**.

Return an "out of range" message if an input is greater than the clock's range.


Expected output:

```
clock(6, 00)

=> [180, 180]
```

```
clock(12, 00)

=> [360, 0]
```

```
clock(12, 15)

=> [277.5, 82.5]
```

```
clock(9, 45)

=> [22.5, 337.5]
```

```
clock(1, 59)

=> [294.5, 65.5]
```

```
clock(500, 34)

=> "out of range"
```