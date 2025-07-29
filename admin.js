const { kafka } = require('./client')

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