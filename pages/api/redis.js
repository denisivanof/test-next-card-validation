import Redis from 'ioredis'
let redis = new Redis("rediss://:700ae2c61dbb46ff8b63e8822e631f64@eu1-boss-slug-37352.upstash.io:37352")
function ID() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })}
const resId = ID()
export default async function handler(req, res) {
    const setRedis = await redis.set(resId, req.body)
    const getRedis = await redis.get(resId)
    const result = { "RequestId": resId, Amount: JSON.parse(getRedis).Amount}
    res.status(200).send(result)
}
