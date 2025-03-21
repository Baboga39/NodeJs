const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: '6Uyq0Q47oVO6uln6h9TUW5QwDHhZmDzN',
    socket: {
        host: 'redis-17969.crce185.ap-seast-1-1.ec2.redns.redis-cloud.com',
        port: 17969
    }
});

client.on('error', err => console.error('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log("✅ Redis connected successfully!");
})();

module.exports = client;
