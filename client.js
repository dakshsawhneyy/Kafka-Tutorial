const { Kafka } = require('kafkajs')

// Creating Kafka Client
exports.kafka = new Kafka({     // use this to export, if you exporting multiple things
    clientId: 'my-app',
    brokers: ["localhost:9092"],
})