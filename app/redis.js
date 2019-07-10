import redis, { createClient } from "redis";
const client = createClient();

class redisObject {
    constructor() {
        this.redis = redis;
        this.client = client;
    }
}
export default new redisObject();