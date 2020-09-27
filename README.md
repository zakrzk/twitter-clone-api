## Twitter Clone REST API

REST API developed with Express and Sequelize.

Deployed to AWS at `awslink`

### How to run it

```
git clone git@github.com:zakrzk/twitter-clone-api.git
cd twitter-clone-api
```

Make sure to rename `.env.template` to `.env` and set your secrets.

```
docker-compose build
docker-compose up
```

___

### Endpoints

**POST /auth/register**

Use this endpoint to register a new user. 


Request body:

```json
{
    "email": "elton@john.com",
    "password": "mySecret",
    "passwordConfirmation": "mySecret",
    "name": "Elton John",
    "description": "I'm a Rocket Man"     // (optional)
}
```
**Response:**

201 CREATED:

```
{
    "message": "User registered successfully.",
    "email": "elton@john.com",
    "name": "Elton John"
}
```

400 BAD REQUEST:

```
[
    {
        "value": "elton@john.com",
        "msg": "Email already registered.",
        "param": "email",
        "location": "body"
    }
]
```
___

**POST /auth/login**

Once registered, use this endpoint to get the JWT. 


Request body:

```json
{
    "email": "elton@john.com",
    "password": "mySecret"
}
```
**Response:**

200 OK:

```
{
    "userId": 1,
    "token": "[JWT]"
}
```

___

**POST /tweet/add**

Use this endpoint to create a new Tweet. 

Tweet must not be longer than 255 chars.

Request body:

```json
{
    "value": "I'm still standing!"
}
```

Request `Authentication` header: 

```
Bearer [JWT]
```

**Response:**

201 CREATED


___

**POST /tweet/delete**

Use this endpoint to delete a Tweet.

Only the author of a Tweet can delete it, within 3 minutes from posting it.

Request body:

```json
{
    "tweetId": 3
}
```

Request `Authentication` header: 

```
Bearer [JWT]
```

**Response:**

204 NO CONTENT


___

**GET /tweet/feed**

Use this endpoint to get the latest 100 Tweets, sorted from the latest.

Request `Authentication` header: 

```
Bearer [JWT]
```

**Response:**

200 OK

```json
[
    {
        "value": "I'm not crazy. My mother had me tested.",
        "createdAt": "2020-09-27T21:20:34.000Z",
        "user": {
            "name": "Sheldon Cooper"
        }
    },
    {
        "value": "And there's a cold, lonely light that shines from you",
        "createdAt": "2020-09-27T21:13:20.000Z",
        "user": {
            "name": "Elton John"
        }
    },
    {
        "value": "I'm still standing!",
        "createdAt": "2020-09-27T21:10:25.000Z",
        "user": {
            "name": "Elton John"
        }
    }
]
```