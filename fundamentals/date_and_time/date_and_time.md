# Date and Time in JavaScript

## Goals
* Be able get a new instance of Date. 
* Know some of the methods available to the Date object. 
* Be able to set a Date. 


## Lesson

Date and time in JavaScript are represented with the built-in `Date` object. It always holds **both** date and time. Months and days are both counted from `0` (January is the `0` month, Sunday is the `0` day).

### Creating a new Date object

To create a new Date object simply call `new Date()`. When no arguments are provided, it will return an object with the current date and time

```js
var now = new Date();# Date and Time in JavaScript
```

## Lesson

Date and time in JavaScript are represented with the built-in `Date` object. It always holds **both** date and time. Months and days are both counted from `0` (January is the `0` month, Sunday is the `0` day). Da

### Creating a new Date object

To create a new Date object simply call `new Date()`. When no arguments are provided, it will return an object with the current date and time

```js
let now = new Date();
```

To log the date in a presentable way in node, we use the `toString` method.

```js
console.log(now.toString())
// Sun Oct 01 2017 16:31:41 GMT-0400 (EDT)
```

**`new Date(year, month, date, hours, minutes, seconds, ms)`**

Create the date with the given components in the local time zone. Only the two first arguments are obligatory.

Note:

* The `year` must have 4 digits: `2013` is okay, `98` is not.
* The `month` count starts with `0` (Jan), up to `11` (Dec).
* The `date` parameter is the day of month, if absent then `1` is assumed.
* If `hours/minutes/seconds/ms` are absent, they are assumed to be equal `0`.

For example:

```js
new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default
```

## Getting date components 

There are many methods to access the year, month and so on from the `Date` object. But they can be easily remembered when categorized.

[getFullYear()](mdn:js/Date/getFullYear)
: Get the year (4 digits)

[getMonth()](mdn:js/Date/getMonth)
: Get the month, **from 0 to 11**.

[getDate()](mdn:js/Date/getDate)
: Get the day of month, from 1 to 31, the name of the method does look a little bit strange.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Get the corresponding time components.

[getDay()](mdn:js/Date/getDay)
: Get the day of week, where `0` stands for Sunday and `6` stands for Saturday.

### Setting date components

The following methods allow to set date/time components:

* [`setFullYear(year [, month, date])`](mdn:js/Date/setFullYear)
* [`setMonth(month [, date])`](mdn:js/Date/setMonth)
* [`setDate(date)`](mdn:js/Date/setDate)
* [`setHours(hour [, min, sec, ms])`](mdn:js/Date/setHours)
* [`setMinutes(min [, sec, ms])`](mdn:js/Date/setMinutes)
* [`setSeconds(sec [, ms])`](mdn:js/Date/setSeconds)
* [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)

Some methods can set multiple components at once, for example `setHours`. The components that are not given a value are not modified.

### Autocorrection

*Autocorrection* is a very handy feature of `Date` objects. We can set out-of-range values, and the date will self-correct automatically.

For example:

```js
let date = new Date(2013, 0, 32);
 // 32 Jan 2013 ?
console.log(date.toString())
// 'Fri Feb 01 2013 00:00:00 GMT-0500 (EST)'
```

Let's say we need to increase the date **28 Feb 2016** by 2 days. It may be "2 Mar" or "1 Mar" in case of a leap-year. We don't need to think about it. Just add 2 days. The `Date` object will do the rest:

```js
let date = new Date(2016, 1, 28);

date.setDate(date.getDate() + 2);


console.log( date.toString())
```

That feature is often used to get the date after the given period of time. For instance, let's get the date for "70 seconds after now":

```js
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

console.log(date.toString()); // shows the correct date
```

### String -> timestamp -> Date

A string cannot be converted to a date object directly. A string can be converted to a timestamp and the timestamp in turn can be converted to a date.

The timestamp is the number of milliseconds passed since January 1st 1970 (UTC-0).

The method `Date.parse(str)` can convert a string to a timestamp.

The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:

* YYYY-MM-DD – is the date: year-month-day.
* The character "T" is used as the delimiter.
* HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
* The optional 'Z' part denotes the time zone in the format +-hh:mm. Just the letter Z that would mean UTC+0.

It is possible to provide only part of the information, e.g. just `YYYY-MM-DD`.

Once we have a timestamp, we can pass provide it as an argument to `new Date` to create a date object.

```js
let timestamp = Date.parse('2012-01-26');
let date = new Date(timestamp);
```

### Date -> timestamp: Comparing Time

A date can be converted to a timestamp by using the `getTime` method.

We can use timestamps to check the time passed between two date objects.

```js
let msPassed = date2.getTime() - date1.getTime();
```

We can use the above to benchmark time passed in our code:

```js
let d1 = new Date();

console.log('starting benchmark')

sum = 0;
for (let i = 0; i < 10000; i++){
    sum += i;
}

let d2 = new Date();
let ms = d2.getTime() - d1.getTime();
console.log('completed.')
console.log('time passed in ms: ', ms)
console.log('time passed in seconds: ', ms / 1000)
```

```

To log the date in a presentable way in node, we use the `toString` method.

```js
console.log(now.toString())
// Sun Oct 01 2017 16:31:41 GMT-0400 (EDT)
```

**`new Date(year, month, date, hours, minutes, seconds, ms)`**

Create the date with the given components in the local time zone. Only the two first arguments are obligatory.

Note:

* The `year` must have 4 digits: `2013` is okay, `98` is not.
* The `month` count starts with `0` (Jan), up to `11` (Dec).
* The `date` parameter is the day of month, if absent then `1` is assumed.
* If `hours/minutes/seconds/ms` are absent, they are assumed to be equal `0`.

For example:

```js
new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default
```


## Resources

* [mdn - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [Date and Time - javascript.info](https://javascript.info/date)
