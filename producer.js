const { kafka } = require('./client')

async function init(){
    const producer = kafka.producer();
    
    console.log('Connecting Producer');
    await producer.connect();
    console.log('Producer Connected');

    console.log('Sending Message [rider-updates]');
    await producer.send({
        topic: 'rider-updates',
        messages: [
            {
                partition: 0,
                key: 'location-update', 
                value: JSON.stringify({name: 'Tony Stark', loc: 'NORTH'}), // need json.Stringify because without it it will send JS Object which is not required
            },   
        ]
    })
    console.log('Message Sent Successfully [rider-updates]');

    // Disconnect Producer
    console.log("Disconnecting Producer.......")
    await producer.disconnect();
    console.log('Producer Disconnected Successfully');
}

init();