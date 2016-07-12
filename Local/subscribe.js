'use strict';

require('colors');
const client = require('./common').connect();

const SMART_HOUSE_PREFIX = /^\/smart-home\/.*$/;

client.on('connect', ()=>{
    console.log('\r\n::listener connected::\r\n'.grey);
    client.subscribe('#');
    client.on('message', handle_message);

    function handle_message(topic, message, packet) {
        if (SMART_HOUSE_PREFIX.test(topic)){
            show_formatted_SH_message(topic, message, packet);
        } else {
            show_generic_message(topic, message, packet);
        }
    }
});

function show_formatted_SH_message(topic, message, packet){
    const PREFIX = /^\/smart-home\/(out|in)\/(.*)$/;
    let matches = PREFIX.exec(topic);
    if (!matches) { throw 'wrong message' };
    let direction_arrow = matches[1] === 'in' ? '<-'.green : '->'.red;
    let device_name = matches[2];
    console.log(
        `${ direction_arrow } ${device_name.grey}\t${ message.toString().yellow }`
    );
}

function show_generic_message(topic, message, packet){
console.log(
`
* Unrecognized event received
* ${topic.grey}\t${message.toString().yellow}
`.magenta
);
}
