# iag-challenge

- NodeJS (Typescript) server using Express. Exposes the following endpoints on port 5000:

  1. GET `/new-password` -> generates a new 8 digit password, and a shuffled hint. The password is cached based on the hint.
  2. POST `/verify-password` -> uses the `hint` in the request to obtain the password, and compares it to the `answer` in the request. Response is if the answer is correct or not, along with which digits are guessed correctly.

- React SPA (Typescript):
  1. On load will call `/new-password` and display the hint.
  2. User can type up to 8 unique digits to guess the password.
  3. Verifies the user's guess by calling the server. If it's correct, the user can start a new game.
  4. If it's incorrect, the user's attempt is displayed along with any digits that are correct highlighted.

## Setup

### server

1. `cd server`
2. `npm i`
3. `npm test`
4. `npm start`

Will start a dev server on `localhost:5000`

### frontend

1. `cd frontend`
2. `npm i`
3. `npm test`
4. `npm start`

Will start a dev server on `localhost:3000`

### Dev Environment

This was developed on Linux Ubuntu (WSL), Node 14.16 and NPM 7.10.
