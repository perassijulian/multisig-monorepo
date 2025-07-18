import { app } from "./app";
import { initRedis } from "./infra/cache/redis";

const PORT = process.env.PORT || 4000;

(async () => {
  await initRedis();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})();
