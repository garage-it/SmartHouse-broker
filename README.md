# SmartHouse-broker

npm i

## Cloud

Change CLOUDNAME, UserName:Password in cloud/publisher.js, cloud/subscriber.js

```sh
node index --deploy cloud --url <url> --auth <username>:<pathword>

example
node index --deploy cloud --url mqtt://m21.cloudmqtt.com:12787 --auth destroyer:querty12345
```

## Local
Install mongoDB and run it

```sh
npm start
```
