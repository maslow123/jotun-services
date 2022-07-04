const redis = require("redis");
require("dotenv").config();

const redisClient = async () => {
    const client = await redis.createClient('6379');
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();

    return client;
};

module.exports = redisClient;