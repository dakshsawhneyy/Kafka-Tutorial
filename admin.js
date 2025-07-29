const { kafka } = require('kafkajs')

// Creating Kafka Client
const kafka = new kafka({
    clientId: 'my-app',
    brokers: ["http://10.61.127.207:9092"],

})

async function init() {
    const admin = kafka.admin();
    console.log('Admin Connect');
    admin.connect();
    console.log('Admin Connected Successfully')

    // Creation of topic
    console.log("Creating Topic [rider-updates] ")
    admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2,
        }],
    })
    console.log('Topic Created Successfully [rider-updates]');

    // Disconnect Admin
    console.log("Disconnecting Admin.......")
    admin.disconnect();
}

init();