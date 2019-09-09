# Document Object Model: Extended

## Goals 
  * Gain a deeper understanding of DOM manipulation.
  * Know more `document` methods. 

## Keywords

  - document.querySelector()
  - document.querySelectorAll()
  - document.getElementsByTagName()
  - document.getElementsByClassName()
  - HTMLElement.style
  - Element.classList
  - classList.add()
  - classList.remove()

  ## Lesson

  In​ ​this​ ​session​ ​we​ ​simply​ ​expand​ ​our​ ​toolkit.​ ​We​ ​use​ ​new​ 
  ​document​ ​selector​ ​methods​ ​and​ ​more Element​ ​properties​ ​to​ ​advance​ ​our​ ​ability​ ​to​ ​manipulate​ 
  ​a​ ​web​ ​page.

  ### document.querySelector()

  document.querySelector(selector) returns the first element object that matches its argument. The argument should be written as 
  a string and equivalent to a CSS selector (id: #id, class: .class, etc). 

  To see this in action let's go back to our `test.js` file, change the getElementById to `document.querySelector()` pass in '#first'
  and add our debugger on the line underneath. 
  
  What happens if you pass in 'div'? 

  ### document.querySelectorAll()

  document.querySelectorAll(selector) returns​ ​a​ ​NodeList​ ​object​ (that behaves the same as an array) ​of​ ​all 
  elements matching its argument, where it's argument is the​ ​string​ ​equivalent​ ​to​ ​a​ ​CSS​ ​selector.
  
  In our `test.js` file let's change querySelector to querySelectorAll and try passing in the argument ".heading". As you can see
  we get a NodeList back with six nodes. You can call `.length` on the list, index into it, and even iterate through the list with forEach. 
  
  Inside of the debugger copy and paste this code:
  
  ```js 
 first.forEach((el) => {
    console.log(el.innerHTML)
})
```

What happens if you pass in 'div'? 
  

 

  ### Other​ ​Document​ ​Selectors

  `document.getElementsByTagName([tag])` and
  `document.getElementsByClassName([class])`​​ ​work​ ​as​ ​you​ ​would​ ​expect. Try using 'div' with getElementsByTagName and try using heading with 
  getElementsByClassName.
  
  **NOTE** these selectors return an HTMLCollection, this is different than with querySelector. You can
  still index into the collection and check it's length but methods like forEach will throw an error.
  
  You'll often see getElementsByTagName and getElementsByClassName in​ 
  ​sample​ ​code​ ​because​ ​querySelector​​ ​and​ ​querySelectorAll have​ ​only​ ​recently​ ​been​ ​implemented​
  ​in​ ​all​ ​major​ ​browsers.

  ### HTMLElement.style

  The​ ​`.style`​ ​property​ ​of​ ​an​ ​HTMLElement​ ​has​ ​nested​ ​properties​ ​that​ ​allow​ ​you​ ​to​ 
  ​directly manipulate​ ​the​ `​style​` ​of​ ​an​ ​element.
  ​ ​Use​ ​dot​ ​notation​ ​and​ ​camel​ ​case​ ​to​ ​assign​ ​a​ ​value​ ​to​ ​a​ ​style property.

  Let's try this out. Using one of the selectors grab the first li on your page. Inside your debugger try altering the some of it's CSS style 
  properties.
  
  Exp:
  ```js
  // Make an element's font size 100 pixels. 
  el.style.fontSize = '100px'
  // give an element a small-caps font-variant
  el.style.fontVariant = 'small-caps'
  ```
  
  How could you make all the li's in your documents the color green? 
  <details>
    
  <summary>
  Solution:
  </summary>
      let listItems = document.querySelectorAll('li');
      
      listItems.forEach((el) => {
      
           el.style.color = 'green'
           
      })

  </details>

  Challenge: Make you li's colors alternate between blue and red.
  Challenge: Try and change the background color of the body to your favorite color.

  ---

  ### Element.classList

  Use the `.add()` and `.remove()` methods of `Element.classList` to​ ​reference​ ​and manipulate
  the​ ​classes​ ​of​ ​an​ `​Element​` ​object.​ ​This​ ​is​ ​more​ ​elegant​ ​than​ ​using
  `HTMLElement.style​`.
  
  Let's try this:
  
  Throughout our test.html file we have many tags with the class `heading`. This is responsible for our underlines. 
  Let's grab all the elements with the class 'heading'.
  
  Now inside the debugger, let's iterate through our NodeList and remove the class 'heading' from each element. 

  ```js
  let headings = document.querySelectorAll('.heading');
  debugger
  ```
  <details>
    <summary>
      Solution to write in console. You try first though!
    </summary>
    
    headings.forEach((el) => {
    el.classList.remove('heading')
})
  </details>
  
  Now try adding it back. How would you add the class 'heading' to all your li's? 

    ## Resources

  - [MDN​ ​-​ ​document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
  - [MDN​ ​-​ ​NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
  - [MDN​ ​-​ ​HTMLElement.style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)
  - [MDN​ ​-​ ​Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
