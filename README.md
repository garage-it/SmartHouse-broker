# SmartHouse MQTT broker

[![Build Status](https://travis-ci.org/garage-it/SmartHouse-broker.svg?branch=master)](https://travis-ci.org/garage-it/SmartHouse-broker)

[![npm version](https://badge.fury.io/js/smart-house-broker.svg)](https://badge.fury.io/js/smart-house-broker)

## Prepare

Install npm dependencies

`npm i`

Install [mongodb](https://docs.mongodb.com/manual/installation/#tutorials) and run in at `:27017` port

## Run

Start the MQTT server

`npm start`

After MQTT server is up, it will report:

```
Mosca server is up and running
mqtt://localhost:1883
```


## options

- `log` -- start with logger, that will output all events to console

- `mock` -- add mocker, that will randomly send events to the MQTT

e. g. `npm start -- --log --mock` will run MQTT server logger and mocker

### For more details see

`npm start -- --help`
