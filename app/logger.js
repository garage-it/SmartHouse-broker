'use strict';

require('colors');
const client = require('./common').connect();

const SMART_HOUSE_PREFIX = /^\/smart-home\/(out|in)\/(.*)$/;;

client.on('connect', ()=>{
    console.log('\r\n::log legend::'.grey);
    console.log(`
${ '-> in\t\tvalue'.cyan }
      ${ '[device id]'.grey }
${ '<- out\t\tvalue'.yellow }
`);

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

function show_formatted_SH_message(direction, device_name, raw_message){
    const IN_ARROW  = '->'.cyan;
    const OUT_ARROW = '<-'.yellow;
    const IS_INWARD = direction === 'in';
    const message = (raw_message || '').toString();
    let direction_arrow;
    let formatted_message;
    if (IS_INWARD) {
        direction_arrow = IN_ARROW;
        formatted_message = message.cyan;
    } else {
        direction_arrow = OUT_ARROW;
        formatted_message = message.yellow;
    }

    console.log(
        `${ direction_arrow } ${ device_name.grey }\t${ formatted_message }`
    );
}
