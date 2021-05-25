# You Shall Not Password - API

This is an API for a new app that helps users to keep track of all their passwords. These passwords are encrypted and stored in the database.

## API Documentation

### Endpoints:

all endpoints are based upon the url given by Heroku: https://stark-crag-77653.herokuapp.com/

1. `/users/register` is used to add a new user to the users table. The information must be sent in JSON format, with fields for name, email, password. A phone number is optional. Any user password is hashed and stored to prevent liability from a data breach.

2. `/users/login` is used to validate a user email and password. The password supplied is hashed and compared to the stored password. The user name, email address, and id number are supplied in the response.

3. `/passwords/` will return the passwords associated with the supplied user information.

4. `/passwords/add` will add a new password to the password database linked to the current user.

5. `/passwords/delete` will delete a user password found by the supplied password ID.

## Technology

Many different technologies were used to create this api. Postgres serves as the database for the storage and retrieval of user information. Node.js and express are the foundation of the server. Knex is used with a postgres driver to query the database. Bcryptjs is used to hash and compare user passwords. Cryptr is used for the encrypted storage and retrieval of passwords.

## Live Demos

The full app can be viewed [here](https://you-shall-not-pass-client.vercel.app/)
