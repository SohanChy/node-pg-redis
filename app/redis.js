const  { redis, createClient } = require("redis");
const client = createClient({
    'host' : process.env.REDIS_HOST,
    'port' : process.env.REDIS_PORT
});
const {promisify} = require('util');

class redisObject {
    constructor() {
        this.redis = redis;
        this.client = client;

        this.getAsync = promisify(client.get).bind(client);
        this.setAsync = promisify(client.set).bind(client);
        this.delAsync = promisify(client.del).bind(client);
    }
}
client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = new redisObject();