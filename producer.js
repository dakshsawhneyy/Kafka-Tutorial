const { kafka } = require('./client')
const readline = require('readline')

// Taking Multiple Inputs from User
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init(){
    const producer = kafka.producer();
    
    console.log('Connecting Producer');
    await producer.connect();
    console.log('Producer Connected');

    // Ask for various inputs from the user     // rl is the interface that listens for typed lines
    rl.setPrompt('>');      // every time you type in terminal, > shows a prompt like
    rl.prompt();    // print prompts to the terminal

    // Whenever user prompts    
    rl.on('line', async function(line) {    // reads line from the terminal
        const [riderName, location] = line.split(' ');      // split the line into two wordss
        
        console.log('Sending Message [rider-updates]');
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() == 'north' ? 0 : 1,   // for north -> use 0 else 1
                    key: 'location-update', 
                    value: JSON.stringify({name: riderName, loc: location}), // need json.Stringify because without it it will send JS Object which is not required
                },   
            ]
        })
        console.log('Message Sent Successfully [rider-updates]');
    
    }).on('close', async() => {     // when press control C or exits, it disconnect the producer
        // Disconnect Producer
        console.log("Disconnecting Producer.......")
        await producer.disconnect();
        console.log('Producer Disconnected Successfully');
    })
    
}

init();