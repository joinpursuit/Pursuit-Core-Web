# AJAX

## Goals
* Understand what AJAX is and how it is implemented
* Use XML to make requests

## Keywords
* Asynchronous JavaScript and XML (AJAX)
* Extensible Markup Language (XML)
* JavaScript Object Notation (JSON)

# 1. Getting Data from the Internet

So far, all of the data that we've used has been provided to us.  Over the last couple days, we've seen how companies create resources (endpoints) so that other people can access their information.  Today, we'll build a simple web app that accesses data from the internet instead of essentially working offline.  Our app will load a list of random users from the [Random User Generator API](https://randomuser.me/documentation).

# 2. AJAX: A(synchronous) J(avaScript and) X(ML)

How can we get data from the internet?  We want to make sure that we are getting data *asynchronously*.  This is so that our whole website doesn't freeze while we're waiting for data to come back.  The tool that we'll use to get data is called `AJAX` which stands for A(synchronous) J(avaScript and) X(ML).  Why is it called `XML`?  It's essentially a misnomer at this point, but back when it was first created, it was used primarily for XML instead of JSON.  You can find more information [here](https://stackoverflow.com/questions/12067185/why-is-it-called-xmlhttprequest).

AJAX is extremely helpful because it allows you to:

* Update a web page without reloading the page.
* Request data from a server - after the page has loaded.
* Receive data from a server - after the page has loaded.
* Send data to a server - in the background.

A very common use of the AJAX technique is to interact with RESTful APIs through a web app.  To actually make a call to get data, we will use the class `XMLHttpRequest`.


# 3. Using XMLHttpRequest to get data

Let's start by putting together a simple HTML file that can display a list of users:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Random Users</title>
    <script src="index.js"></script>
</head>
<body>
    <h1>Random Users</h1>
    <ul id="userList"></ul>
    <button id="loadUsersButton">Load 10 random users</button>
    <button id="removeAllRandomUsers">Remove all random users</button>
</body>
</html>
```

Now let's hook it up to a JavaScript file that will handle the load button being clicked:

```js
document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector('#loadUsersButton')
    button.addEventListener('click', loadUsers)
})

function loadUsers() {
    console.log("Loading Users...")
}
```

Check your console to make sure that you are listening to button click events.  Now, let's add functionality to get 10 random users from our API at https://randomuser.me/api/?results=10:

```js
document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector('#loadUsersButton')
    button.addEventListener('click', loadUsers)
})

function loadUsers() {
    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function() {
        console.log(this.readyState)
        if (this.readyState === this.DONE) {
            console.log(JSON.parse(this.response))
        }
    }
    xml.open("GET", "https://randomuser.me/api/?results=10")
    xml.send(null)
}
```

Let's break down what we have above:

First, we create a new `XMLHttpRequest`.  This class has 3 important properties / methods that we are using:

1. `onreadystatechange`
2. `open``
3. `send`

### onreadystatechange

`onreadystatechange` is a method that gets called several times in the process of getting data back.  Each time something interesting happens to the state of our request, this method is called and the `readyState` of the request updates with its current progress.  The list of `readyState`s is below:

```
0	UNSENT	Client has been created. open() not called yet.
1	OPENED	open() has been called.
2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
3	LOADING	Downloading; responseText holds partial data.
4	DONE	The operation is complete.
```

### open

Once we've made our request, we need to open a connection to our endpoint using the `open` method.  We also list the type of request that we want to make; here it's a `GET` request.

### send

After we open a connection to our endpoint, we have to send it any information that it needs.  For `POST` requests, we would send the data that we want to be posted.  Here, we don't need to give any additional information, so we send `null` instead.

### JSON.parse(this.response)

Every `XMLHttpRequest` has a `response` property that contains the data that we get back from the endpoint.  However, it's not necessarily in JSON form (more reading [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response)).  To ensure we can use it like every other object we've made so far, we use the `JSON.parse()` class method.

Now we can see all of the users!  Go in the console and look at the structure of the JSON you get back.  It should look something like this:

<details>
<summary>Expand JSON</summary>
    
```js
// 20190911122412
// https://randomuser.me/api/?results=10

{
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "john",
        "last": "alonso"
      },
      "location": {
        "street": "3630 calle de ferraz",
        "city": "ciudad real",
        "state": "castilla la mancha",
        "postcode": 62395,
        "coordinates": {
          "latitude": "-17.7911",
          "longitude": "-135.6430"
        },
        "timezone": {
          "offset": "+3:30",
          "description": "Tehran"
        }
      },
      "email": "john.alonso@example.com",
      "login": {
        "uuid": "90957349-5a08-4065-ba81-3edb00677a35",
        "username": "orangebutterfly290",
        "password": "ou8122",
        "salt": "vNbFaAt8",
        "md5": "f2ef73d09a77a1eabd7de62d7562d560",
        "sha1": "68e6516169c4b126ee50d2807b854976d66e7151",
        "sha256": "274d0f7d7540d5754b708826e322685f10da04ab2eeb1346155b13e24abf1a58"
      },
      "dob": {
        "date": "1992-02-01T17:05:22Z",
        "age": 27
      },
      "registered": {
        "date": "2015-10-19T07:39:14Z",
        "age": 3
      },
      "phone": "900-344-613",
      "cell": "617-157-152",
      "id": {
        "name": "DNI",
        "value": "01176833-B"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/72.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/72.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/72.jpg"
      },
      "nat": "ES"
    },
    {
      "gender": "female",
      "name": {
        "title": "miss",
        "first": "yara",
        "last": "leithe"
      },
      "location": {
        "street": "hjalmar jordans vei 9266",
        "city": "napp",
        "state": "aust-agder",
        "postcode": "5428",
        "coordinates": {
          "latitude": "-59.7754",
          "longitude": "96.2923"
        },
        "timezone": {
          "offset": "-3:30",
          "description": "Newfoundland"
        }
      },
      "email": "yara.leithe@example.com",
      "login": {
        "uuid": "28c28402-3bad-4560-8ef7-048581d263a9",
        "username": "ticklishelephant179",
        "password": "2233",
        "salt": "lzoQKQCu",
        "md5": "6ffb26a510c2cb8a17e68a69d2ae627e",
        "sha1": "a9cce4db05cfd698cf1514df94cbe0884912159e",
        "sha256": "66495d1f4a1d8041a47f8336dcd3ee2c81c65f64285d469e569aa5c718f73219"
      },
      "dob": {
        "date": "1977-12-03T21:00:49Z",
        "age": 41
      },
      "registered": {
        "date": "2005-12-22T02:16:32Z",
        "age": 13
      },
      "phone": "57872764",
      "cell": "92973917",
      "id": {
        "name": "FN",
        "value": "03127739551"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/75.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/75.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/75.jpg"
      },
      "nat": "NO"
    },
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "necati",
        "last": "adal"
      },
      "location": {
        "street": "9745 bağdat cd",
        "city": "nevşehir",
        "state": "çanakkale",
        "postcode": 39252,
        "coordinates": {
          "latitude": "32.5116",
          "longitude": "-14.0781"
        },
        "timezone": {
          "offset": "-5:00",
          "description": "Eastern Time (US & Canada), Bogota, Lima"
        }
      },
      "email": "necati.adal@example.com",
      "login": {
        "uuid": "50d31a3c-5ccc-43ba-bb3f-b6f1c3e9e6b0",
        "username": "blackgorilla698",
        "password": "1016",
        "salt": "gy9KZZfS",
        "md5": "cf6bba12c18166cb8fb9b0d4e2bf8b14",
        "sha1": "07b3baef56e6655a0c99dc44b6367fd1a6ade76e",
        "sha256": "f59889df068bdb8e61eae27c5c1ce9c95863bd531986c55a3e77f7089939ccda"
      },
      "dob": {
        "date": "1945-01-04T08:40:41Z",
        "age": 74
      },
      "registered": {
        "date": "2003-06-10T21:19:51Z",
        "age": 16
      },
      "phone": "(169)-438-1173",
      "cell": "(335)-847-6202",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/86.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/86.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/86.jpg"
      },
      "nat": "TR"
    },
    {
      "gender": "female",
      "name": {
        "title": "miss",
        "first": "janita",
        "last": "eisma"
      },
      "location": {
        "street": "2967 lepelenburg",
        "city": "rijnwaarden",
        "state": "utrecht",
        "postcode": 87629,
        "coordinates": {
          "latitude": "-44.6907",
          "longitude": "170.8260"
        },
        "timezone": {
          "offset": "-3:30",
          "description": "Newfoundland"
        }
      },
      "email": "janita.eisma@example.com",
      "login": {
        "uuid": "d93516f9-dd1b-4026-a01d-3bf75e11b454",
        "username": "yellowfrog900",
        "password": "kong",
        "salt": "5Yq4T7gp",
        "md5": "06074ba8eca6df82e45dc35ce28bb15d",
        "sha1": "248fcc4295020b6707df04d15a42dd6579598dc8",
        "sha256": "04913d708391f4366f53f93896656a1be7aa414f708375e3083a917cd6ec3043"
      },
      "dob": {
        "date": "1980-06-20T23:00:41Z",
        "age": 39
      },
      "registered": {
        "date": "2003-11-17T23:15:48Z",
        "age": 15
      },
      "phone": "(925)-518-3641",
      "cell": "(614)-716-3452",
      "id": {
        "name": "BSN",
        "value": "07047549"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/87.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/87.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/87.jpg"
      },
      "nat": "NL"
    },
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "ethan",
        "last": "barnaby"
      },
      "location": {
        "street": "1542 peel st",
        "city": "field",
        "state": "newfoundland and labrador",
        "postcode": "I7N 5T8",
        "coordinates": {
          "latitude": "15.6931",
          "longitude": "124.0815"
        },
        "timezone": {
          "offset": "-8:00",
          "description": "Pacific Time (US & Canada)"
        }
      },
      "email": "ethan.barnaby@example.com",
      "login": {
        "uuid": "6ba413b8-6354-448b-8ded-4ebe138f5ea1",
        "username": "redostrich306",
        "password": "1013",
        "salt": "WsQSw9iz",
        "md5": "a2befad92fd3f0bfdb80fe88889a7ceb",
        "sha1": "479942b57e6605e5e65f63c210c3c1f21eddb994",
        "sha256": "2e1730f55d3312d120a8593840dcd8f40c49562458c9eed357fab60fb40d46d0"
      },
      "dob": {
        "date": "1982-03-29T01:12:11Z",
        "age": 37
      },
      "registered": {
        "date": "2006-05-26T20:22:15Z",
        "age": 13
      },
      "phone": "945-977-6607",
      "cell": "001-262-7723",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/90.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/90.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/90.jpg"
      },
      "nat": "CA"
    },
    {
      "gender": "female",
      "name": {
        "title": "ms",
        "first": "marilou",
        "last": "andersen"
      },
      "location": {
        "street": "5627 9th st",
        "city": "delisle",
        "state": "british columbia",
        "postcode": "O3K 5W3",
        "coordinates": {
          "latitude": "71.7074",
          "longitude": "169.7862"
        },
        "timezone": {
          "offset": "-3:30",
          "description": "Newfoundland"
        }
      },
      "email": "marilou.andersen@example.com",
      "login": {
        "uuid": "4993d597-1a17-4c19-a784-0b06c87f2751",
        "username": "beautifulpeacock850",
        "password": "gonzales",
        "salt": "Vp5Bi85R",
        "md5": "6fd83d6d6c4560cdfe46133a55707d95",
        "sha1": "c49dbf8711cd8d73509d8a8ebb0256d5f60cc29b",
        "sha256": "3929a3d977c576914b69b3bba9a2f674d21e3b89a9b94e6f426f17643d361080"
      },
      "dob": {
        "date": "1970-11-03T09:28:35Z",
        "age": 48
      },
      "registered": {
        "date": "2007-12-05T06:38:41Z",
        "age": 11
      },
      "phone": "737-915-1438",
      "cell": "474-562-1199",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/15.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/15.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/15.jpg"
      },
      "nat": "CA"
    },
    {
      "gender": "female",
      "name": {
        "title": "ms",
        "first": "dantela",
        "last": "da cunha"
      },
      "location": {
        "street": "6404 rua mato grosso ",
        "city": "rio verde",
        "state": "rondônia",
        "postcode": 76376,
        "coordinates": {
          "latitude": "-60.1944",
          "longitude": "-124.5095"
        },
        "timezone": {
          "offset": "-3:00",
          "description": "Brazil, Buenos Aires, Georgetown"
        }
      },
      "email": "dantela.dacunha@example.com",
      "login": {
        "uuid": "b55bc4bb-5f26-40aa-bb4e-e68fbca90c00",
        "username": "orangewolf232",
        "password": "dominion",
        "salt": "NGZjD4lG",
        "md5": "01288bf5bc2d665432d58b39abf0ee26",
        "sha1": "36faa4d0a60c5d990132d8a88ab427b740de40c8",
        "sha256": "4ed42038c37769703aef9ebfc2df6564449b2b7042b67ee70dd11a4fed2ea1ee"
      },
      "dob": {
        "date": "1951-04-21T00:21:46Z",
        "age": 68
      },
      "registered": {
        "date": "2003-08-22T02:31:49Z",
        "age": 16
      },
      "phone": "(79) 3790-7272",
      "cell": "(52) 9997-8544",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/85.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/85.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/85.jpg"
      },
      "nat": "BR"
    },
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "said",
        "last": "green"
      },
      "location": {
        "street": "fossumveien 9265",
        "city": "skjærhalden",
        "state": "description",
        "postcode": "6818",
        "coordinates": {
          "latitude": "-61.2779",
          "longitude": "-101.9876"
        },
        "timezone": {
          "offset": "0:00",
          "description": "Western Europe Time, London, Lisbon, Casablanca"
        }
      },
      "email": "said.green@example.com",
      "login": {
        "uuid": "a4cc355c-88cc-419c-8b59-1425c4e72feb",
        "username": "bigleopard481",
        "password": "ginscoot",
        "salt": "VWpk0fs9",
        "md5": "5a167e1ca87641e15b3e6a0318dc69b4",
        "sha1": "44fc334aa82741e167075f000674fbfbe3a57347",
        "sha256": "74d86ddb0bec328ac88ada49d2b92e916e7e49abcbeeb94cbeb0b290c1ef461e"
      },
      "dob": {
        "date": "1951-01-09T19:48:28Z",
        "age": 68
      },
      "registered": {
        "date": "2008-11-15T23:33:22Z",
        "age": 10
      },
      "phone": "72195436",
      "cell": "94037406",
      "id": {
        "name": "FN",
        "value": "09015139819"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/72.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/72.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/72.jpg"
      },
      "nat": "NO"
    },
    {
      "gender": "female",
      "name": {
        "title": "miss",
        "first": "ayse",
        "last": "manke"
      },
      "location": {
        "street": "grüner weg 62",
        "city": "richtenberg",
        "state": "sachsen-anhalt",
        "postcode": 22385,
        "coordinates": {
          "latitude": "-17.9911",
          "longitude": "-154.8626"
        },
        "timezone": {
          "offset": "-11:00",
          "description": "Midway Island, Samoa"
        }
      },
      "email": "ayse.manke@example.com",
      "login": {
        "uuid": "cd752b5b-f282-475d-bc79-9322fe9568d5",
        "username": "crazywolf367",
        "password": "carlton",
        "salt": "DZwcRvKF",
        "md5": "d2928f2e91c905b2a7692bd529efdc54",
        "sha1": "dc1c8cb9a0c9c4a5ae68a7c51ee5b3ebb621f458",
        "sha256": "fd22ad23cc7d7e238839510b25fecbd7c00a5d7b1add612c02ab9b67c3c78038"
      },
      "dob": {
        "date": "1961-01-11T20:40:33Z",
        "age": 58
      },
      "registered": {
        "date": "2012-10-20T14:22:37Z",
        "age": 6
      },
      "phone": "0512-1138734",
      "cell": "0175-4993019",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/9.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/9.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/9.jpg"
      },
      "nat": "DE"
    },
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "jesus",
        "last": "iglesias"
      },
      "location": {
        "street": "8390 calle de tetuán",
        "city": "ciudad real",
        "state": "melilla",
        "postcode": 56769,
        "coordinates": {
          "latitude": "-79.2691",
          "longitude": "44.7178"
        },
        "timezone": {
          "offset": "+3:00",
          "description": "Baghdad, Riyadh, Moscow, St. Petersburg"
        }
      },
      "email": "jesus.iglesias@example.com",
      "login": {
        "uuid": "34e5a6cc-ba8d-427e-a848-f221ebf6ce0c",
        "username": "greentiger591",
        "password": "heather1",
        "salt": "SuNIj0Xr",
        "md5": "6494c98f22a220b14a6b75e633ed367f",
        "sha1": "b592896bc41f8382e8371b0b15439a31bc8d3aad",
        "sha256": "45ba52832a343c8e9fd75f50dbe3be0bc2776d3fdf8043c05a098237ec827f4a"
      },
      "dob": {
        "date": "1987-01-25T02:10:02Z",
        "age": 32
      },
      "registered": {
        "date": "2004-05-04T15:52:25Z",
        "age": 15
      },
      "phone": "993-107-559",
      "cell": "667-792-477",
      "id": {
        "name": "DNI",
        "value": "43270218-O"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/81.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/81.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/81.jpg"
      },
      "nat": "ES"
    }
  ],
  "info": {
    "seed": "92dbae6dca916246",
    "results": 10,
    "page": 1,
    "version": "1.2"
  }
}
```
</details>

# 4. Adding the users to our app

Now that we have the JSON of the users, we can iterate over it and access the information that we're interested in.  Let's display a list of all of their names.  

```js
document.addEventListener("DOMContentLoaded", () => {
    let loadButton = document.querySelector('#loadUsersButton')
    loadButton.addEventListener('click', loadUsers)
    let removeButton = document.querySelector('#removeAllRandomUsers')
    removeButton.addEventListener('click', removeUsers)
})

function loadUsers() {
    let xml = new XMLHttpRequest()
    xml.onreadystatechange = function() {
        console.log(this.readyState)
        if (this.readyState === this.DONE) {
            let usersJSON = JSON.parse(this.response)            
            let randomUsers = usersJSON.results
            addUsersToDOM(randomUsers)
        }
    }
    xml.open("GET", "https://randomuser.me/api/?results=10")
    xml.send(null)
}

function removeUsers() {
    let userList = document.querySelector("#userList")
    userList.innerHTML = ''
}

function addUsersToDOM(users) {
    let userList = document.querySelector("#userList")
    for (user of users) {
        let newListItem = document.createElement("li")
        console.log(user)
        let title = capitalize(user.name.title)
        let firstName = capitalize(user.name.first)
        let lastName = capitalize(user.name.last)
        newListItem.innerText = `${title}. ${firstName} ${lastName}`
        userList.append(newListItem)
    }
}

function capitalize(str) {
    if (typeof str !== "string") {
        return ""
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}
```

Notice that the page does not reload with each request. This is EXCITING!


## Resources

* [AJAX - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)
* [AJAX - W3Schools](https://www.w3schools.com/xml/ajax_intro.asp)
