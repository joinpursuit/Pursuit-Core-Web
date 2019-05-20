# Factory Functions

## Goals 
* Know what a factory function is. 
* Be able to implement your own Factory Function. 

## Keywords

* Factory Functions

## Lesson

Objects are often useful when combined with arrays. This is typically seen as an array holding a collection of object, with each of the objects having the same keys. Here is an example:
```js
let films = [
  {
    name: 'Psycho',
    director: 'Alfred Hitchcock',
    released: 1960
  }, {
    name: 'Citizen Kane',
    director: 'Orson Welles',
    released: 1941
  }, {
    name: 'The Usual Suspects',
    director: 'Bryan Singer',
    released: 1995
  }
]
```

We can create a function that, whenever called, will return a new `film` object. We call this kind of function a **factory function**.

```js
function createFilm(name, director, released){
  let film = {
    name: name,
    director: director,
    released: released
  }

  return film
}

let myFilm = createFilm('The Truman Show', 'Peter Weir', 1998)
```

A variable that is defined within a function is created anew every time the function is called. When we get to the end of a function, the variables that have been created within it are forgotten. We can, however, return a variable that was created inside a function. The variable itself will be forgotten, but its value will be assigned to a variable that lives outside the function. So, in the above example, we are assigning the value of the `film` variable from inside the function to the `myFilm` variable outside the function.

An advantage of a factory function is that we can ensure that each object will have the same properties. This will make it easier to do things while iterating over the array. In our films example, when we only use the `createFilm` function to add new films to the films array, we can then create a function to get the film title for any film in the array.

```js
function logTitle(film){
  console.log(film.title)
}

films.push(createFilm('The Truman Show', 'Peter Weir', 1998))
films.push(createFilm('Citizen Kane', 'Orson Welles', 1941))
films.push(createFilm('The Usual Suspects', 'Bryan Singer', 1995))

logTitle(films[2])
// will log: 'The Usual Suspects'
```

We can now use the `getTitle` function as input to a `forEachElem` function, that applies a callback function to each element in an array.

```js
function forEachElem(arr, callback){
  for (let i = 0; i < arr.length; i++){
    callback(arr[i])
  }
}

forEachElem(films, logTitle)
// will log:
// The Truman Show
// Citizen Kane
// The Usual Suspects
```

We can rewrite the second argument for `forEachElem` as an anonymous callback function:

```js
forEachElem(films,(film) => {
  console.log(film.title)
})
```


