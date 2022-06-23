# feathersjs-sequelize-transaction-across-multiple-services

> The goal for this project is demonstrate a way to call a service inside another service using the same transaction. (ACID Transaction).

## Important files to see the transaction control changes

- [app.hooks.js](src/hooks/../app.hooks.js)
- [sequelize-transaction-hook.js](src/hooks/sequelize-transaction-hook.js)
- [notification.class.js](src/services/notification/notification.class.js)

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3 (maybe 4).

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathersjs-sequelize-transaction-across-multiple-services
    npm install
    ```
3. Run a MySQL in a docker container (or use a previous installed mysql, you need to create the database notification-service)

   ```
	docker run -p 3306:3306 --name notification-service-mysql	-e MYSQL_ROOT_PASSWORD=root	-e MYSQL_DATABASE=notification-service -d mysql:8.0
	```
4. Start your app

    ```
    npm run start
    ```

## Using Docker

1. Make sure you have installed docker and docker-compose
2. Go to `docker` folder

    ```
    cd docker
    ```
3. Run the docker compose

    ```
    docker-compose up -d
    ```

# Modeled Tables

## Table: notification

### Columns:
	id	int AI PK
	source	varchar(64)
	user	varchar(64)
	title	varchar(128)
	message	text
	icon	varchar(64)
	link	varchar(128)
	is_read	tinyint(1)
	read_at	datetime
	expire_days	int
	expire_at	datetime
	created_at	datetime
	updated_at	datetime

## Table: tag

### Columns:
	notification_id	int PK
	tag	varchar(32) PK
	created_at	datetime
	updated_at	datetime

# API Reference

[Sample Requests](src/../test/http-requests/notification.http)


## `POST /notification`

  * Will create a new notification and it's tags

### Request sample
```
POST http://localhost:3030/notification HTTP/1.1
Content-Type: application/json

{
  "source": "matrix",
  "user": "thomas.a.anderson",
  "title": "My first notification using this service",
  "message": "This your last chance. After this there is no turning back. You take the blue pill, the story ends. You wake up in your bed and believe whatever you want to. You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes. Remember, all I'm offering is the truth. Nothing more.",
  "icon": "icon-plus",
  "link": "https://en.wikipedia.org/wiki/Matrix",
  "tags": [ "#COOL", "#NICE", "#TEST" ]
}
```
