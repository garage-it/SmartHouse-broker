# SmartHouse-broker

npm i

## Cloud

Change CLOUDNAME, UserName:Password in cloud/publisher.js, cloud/subscriber.js

cd cloud

```sh
node publisher.js & node subscribe.js
```


## Local
Install mongoDB and run it

cd local

```sh
node server.js & node publisher.js & node subscribe.js
```

