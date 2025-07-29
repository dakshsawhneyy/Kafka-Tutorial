const { kafka } = require('./client')

async function init() {
    const consumer = kafka.consumer({ groupId: "user-1" })
    await consumer.connect();

    await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true })   // message shuru se chaiye; from beginning

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`[${topic}]: PART:${partition}:`, message.value.toString())
        }
    })

}

init()