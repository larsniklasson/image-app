# Image Uploading App

This repository contains an image uploading app.

- The backend is a Node & Express API using a Mongo database with Mongoose.
- The frontend is a React app.

## Setup

To run the app, you will need to install:

- [Node](https://nodejs.org/en)
- [Docker](https://docs.docker.com/get-docker/)

## Backend

Start the backend by starting the Docker daemon and then running
`docker-compose up -d --build`

The API is now available on `http://localhost:3002`

Any changes to the backend code should hot reloaded and you do not have to rebuild the backend between changes.

Stop the backend by running
`docker-compose stop`

If you want to see the data in the database directly, you can use [MongoDB Compass](https://www.mongodb.com/products/compass) and connect to the database on `localhost:27017`.

### API

The currently defined API routes are

#### `GET /images`

Returns an array with metadata for stored images like:

```
[{
    "_id": "5ebab07f4129f90039095823",
    "name": "myimage",
    "path": "/img/myimage.jpeg"
}]
```

#### `POST /images`

Expects a body of `Content-Type: multipart/formdata` with entries

- `name`: Image name as a String
- `photo`: Image file

Returns the uploaded image metadata:

```
{
    "_id": "5ebab07f4129f90039095823",
    "name": "myimage",
    "path": "/img/myimage.jpeg"
}
```

#### `GET /img/filename.jpg`

Uploaded files are served as static files from the `/img` directory

## Frontend

The frontend is a react app. Currently the app is just created and have basically no functionality.

Install Dependecies
`npm install`

Start the app
`npm start`

The app is now available on `http://localhost:3000`

## Resources

- [Express](https://expressjs.com/en/guide/routing.html)
- [Mongoose](https://mongoosejs.com/docs/index.html)
- [React](https://reactjs.org/tutorial/tutorial.html)
- [Multer](https://github.com/expressjs/multer)
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)
