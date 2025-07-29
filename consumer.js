const { kafka } = require('./client')
const group = process.argv[2];  // takes group name as second parameter from CLI


async function init() {
    const consumer = kafka.consumer({ groupId: group })     //  consumer is part of the group you specified
    await consumer.connect();

    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true })   // message shuru se chaiye; from beginning

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`${group}: [${topic}]: PART:${partition}:`, message.value.toString())
        }
    })

}

init()