import redisClient from "../../../infra/cache/redis";

const SESSION_TTL_SECONDS = 60 * 60 * 24; // 1 day

export async function setSession(key: string, value: any) {
  await redisClient.set(key, JSON.stringify(value), {
    EX: SESSION_TTL_SECONDS,
  });
}

export async function getSession(key: string) {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

export async function deleteSession(key: string) {
  await redisClient.del(key);
}
