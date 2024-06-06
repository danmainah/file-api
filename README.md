# file-api  

### this is an API that lets you store your files


## Live demo link

[Demo link](https://booking-vacations.herokuapp.com/api-docs/index.html)


## Built With

- Node JS
- Express JS
- sqlite

### Setup

Clone the repository with:


git clone [https://github.com/danmainah/file-api.git](https://github.com/danmainah/file-api.git)


### Install
To install all dependencies, run:
```
npm  install
```

### Usage
To run the server, in the project directory, run:

 ```
 npm run start

 ```

 ### Endpoints
If you are using the app localy 
```
{defaultHost} = http://localhost:3000
```

- Create a new user: `POST` `{defaultHost}/user/signup `
- Authenticates the user: `POST` `{defaultHost}/users/login`
- Logout the user: `POST``{defaultHost}/users/logout`
- Add new files: `POST` `{defaultHost}/uploads/:username`
- Retreives added files: `GET` `{defaultHost}/uploads/:username`

