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
var now = new Date(); // Current Date and Time in JavaScript
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

* [`getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)
: Get the year (4 digits)

* [`getMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
: Get the month, **from 0 to 11**.

* [`getDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)
: Get the day of month, from 1 to 31, the name of the method does look a little bit strange.

* [`getHours()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours), [`getMinutes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes), [`getSeconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds), [`getMilliseconds()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds)
: Get the corresponding time components.

* [`getDay()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)
: Get the day of week, where `0` stands for Sunday and `6` stands for Saturday.

### Setting date components

The following methods allow to set date/time components:

* [`setFullYear(year [, month, date])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)
* [`setMonth(month [, date])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
* [`setDate(date)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)
* [`setHours(hour [, min, sec, ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)
* [`setMinutes(min [, sec, ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)
* [`setSeconds(sec [, ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)
* [`setMilliseconds(ms)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds)

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

console.log(date.toString())
```

That feature is often used to get the date after the given period of time. For instance, let's get the date for "70 seconds after now":

```js
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

console.log(date.toString()); // shows the correct date
```

### Parsing a Date from a string

A string can be converted into to a date but only if its in a few specific formats

#### Simple Format
A string in the format `YYYY/MM/DD HH:mm:ss`

```js
let a = new Date('2009/07/12 12:34:56')
a.toString() // 'Sun Jul 12 2009 12:34:56 GMT-0400 (Eastern Daylight Time)'
```

**Notes**
* This format does not allow milliseconds. Only Chrome handles milliseconds at the moment.
* The Date is interpreted to be in local time (GMT-0400 or EDT in my case.) You cannot specify a timezone offset.
  
#### ISO8601 Format
The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:

```js
let jul30 = new Date("2020-07-30T05:04:21.859Z")
jul30.toString() //=> 'Thu Jul 30 2020 01:04:21 GMT-0400 (Eastern Daylight Time)' 
```

**Notes**
* `YYYY-MM-DD` – is the date: year-month-day.
* The character `T` is used as the delimiter.
* `HH:mm:ss.sss` – is the time: hours, minutes, seconds and milliseconds.
* The optional `Z` part denotes the time zone. It can be a literal `Z`, which means no offset or `+00:00` from `GMT`, Or it can be an offset specified in the format `±hh:mm`. A `-04:00` offset would be minus 4 hours from `GMT` which is Eastern Time Zone or `ET` and is the timezone New York is in.
* This is a good format to save dates in databases. Use `myDate.toISOString()` to get a string representation in the ISO8601 format of a Date object.

**Is there anything interesting about this example? Why?**
```js
let aug2 = new Date('2020-08-02T01:00:00.553Z')
aug2.toString() //=> 'Sat Aug 01 2020 21:00:00 GMT-0400 (Eastern Daylight Time)'
```

⚠️ -> Date parsing has its nuances, in different browsers. Consult [The Comprehensive Cross-Browser JavaScript Date Parsing Table](http://dygraphs.com/date-formats.html) when in doubt or when getting weird results. Alternatively a third party packages like [Moment.js](https://momentjs.com/) can help

### Displaying & Serializing Dates

To display a date to the user the best formats are the ones returned by:

* [`.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString) would return `Tue Aug 19 1975 23:15:30 GMT+0200 (CEST)`
* [`.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString) would return `20/12/2012, 03:00:00`

To serialize a date to be saved in a Database a standard format is ISO8601.

* [`toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) would return `2011-10-05T14:48:00.000Z`

### Comparing Time

We can use dates to benchmark time passed in our code:

```js

console.log('starting benchmark')
let before = new Date();

sum = 0;
for (let i = 0; i < 10000; i++){
    sum += i;
}

let after = new Date()
let msPassed = after - before; // Result in milliseconds
console.log('completed.')
console.log('time passed in ms: ', msPassed)
console.log('time passed in seconds: ', msPassed / 1000)
```

## Exercises
* Find what is the oldest date you can represent in JavaScript.
* Find what is the largest(futuristic) date you can represent in JavaScript.
* If you have siblings calculate the numbers of day between your birthday and theirs.
* What is the result of `new Date(0)`? By what name is this date known?
* What is your birth date in ISO8601 format?
* [More Exercises](https://www.w3resource.com/javascript-exercises/javascript-date-exercises.php)
<details>
<summary> Solutions </summary>

Did you try it on your own already? Compared with the solutions [here](./exercises_solutions.js)
</details>

## Resources

* [MDN - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* [Date and Time - javascript.info](https://javascript.info/date)
* [Moment.js Library](https://momentjs.com/)
* [The Comprehensive Cross-Browser JavaScript Date Parsing Table](http://dygraphs.com/date-formats.html)
