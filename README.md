# SpotList API

potlistAPI is an API that enables you to get and create lists of songs as well as get songs lists from other users and even add songs to 
a given user list very easily.

## Installation

Use the node package manager [node.js](https://nodejs.org/en/) to install SpotList API.

```bash
cd js-express-mocha
npm install
```

## Initialization
``` bash
  npm start
```
## Running tests
```bash
  npm run test
```

## External dependencies
   - body-parser
   - compression 
   - cors
   - jest
   - morgan
   - supertest
   - uuid


## Usage

### important notes
the domain-name when you run it on your local-machine (your computer) is by default http://localhost:8000. Moreover to be able to use all of this endpoints you need to provide a basic authentication in the header of the request. 

Here you can find further information [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

### Get a specific list
where userid is a users id and listid is a lists id
```bash
/GET "[domain-name]/users/:userid/lists/:listid"
```
### Get all list made by a user
where userid could be any user's id
```bash
/GET "[domain-name]/users/:userid/lists"
```
### Important note
To make POST request to SpotList API you need to pass a body in the request here you can find further reading [HTTP - POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

### Add a new list
#### Body format
```javascript
 body: {
   list: {
     name: "my-list-name"
   }
}
```
#### Body format with songs
```javascript
 body: {
   list: {
     name: "my-list-name",
     songs: [
       {title:'song-title', artist: 'artist-name'},
       {title:'song-title', artist: 'artist-name'}
     ]
   }
}
```
``` bash
/POST "[domain-name]/users/:userid/lists"
```
### add a new song to a list

#### Body format
```javascript
 body: {
   title: 'song-title',
   artist: 'artist-name'
}
```

```bash
/POST "[domain-name]/users/:userid/lists/:listid/songs",
```

# Spotlist Challenge

Spotlist is a new indie music company that aims to provide better relationships with small artists.

Their product is _Spotlist_, a platform in which people can generate and share playlists for their favourite artists providing them with visibility.

## Current Status

The CEO of _Spotlist_ hired you to develop the initial version of his product. Its worth mentioning that she does not have any technical background.

However, she has a clear vision on how the product should behave, so she provided a list of functional requirements.

### Requirements
* Each user will have a **unique** id, and he will authenticate using a **non-empty name** and a **password**.
* Each user will be able to save a list of songs. Each song will have an **artist** and **title**, and each list will be defined by a **unique** id and a name.
* The system have to allow the following actions
    * Create a new list with a given name (auto-generate the **unique** id)
    * Get the users lists
    * Get an individual list for the user
    * Add songs to a given list (based on the generated id)
    * All endpoints have to be secured with Basic Auth (using name & password) 
* You should ensure that the password is strong enough

You can find the swagger documentation for the expected API on the [doc](./doc/swagger.yaml) folder.
## What are we looking for?

* **A well-designed solution and architecture** Avoid duplication, extract re-usable code
where makes sense. We want to see that you can create an easy-to-maintain codebase.
* **Storage** We do not need a full fledged database rollout, its ok to save your data on memory for now. _However_ we are looking for an architecture that allows us to add a database as easy as possible. For a start, you can find a users database in json format on the _doc_ folder.
* **Testing** Try to create tests covering the main functionalities of your code. Feel free to create both unit tests and functional tests.
* **Documentation** The CEO has a non-tech background so try to explain your decisions, 
as well as any other technical requirement (how to run the API, external dependencies, etc ...)
