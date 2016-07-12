'use strict';

require('colors');
const client = require('./common').connect();

const SMART_HOUSE_PREFIX = /^\/smart-home\/(out|in)\/(.*)$/;;

client.on('connect', ()=>{
    console.log('\r\n::listener connected::\r\n'.grey);
    client.subscribe('#');
    client.on('message', handle_message);
});


function handle_message(topic, message) {
    if (!SMART_HOUSE_PREFIX.test(topic)){
        show_generic_message(topic, message);
        return;
    }

    const matches = SMART_HOUSE_PREFIX.exec(topic);
    const direction = matches[1];
    const device_name = matches[2];
    show_formatted_SH_message(direction, device_name, message);
}

function show_generic_message(topic, message){
console.log(`
* Unrecognized event received
* ${ topic.grey }\t${ message.toString().yellow }
`.magenta);
}

function show_formatted_SH_message(direction, device_name, message){
    const IN_ARROW = '<-'.green;
    const OUT_ARROW = '->'.red;
    let direction_arrow = direction === 'in' ? IN_ARROW : OUT_ARROW;
    console.log(
        `${ direction_arrow } ${ device_name.grey }\t${ message.toString().yellow }`
    );
}
