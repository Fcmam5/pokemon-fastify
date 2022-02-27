import app from './app';
import { CONFIG } from './config';

app.listen(CONFIG.PORT);

app.log.info(`🚀  Fastify server running on port ${CONFIG.PORT}`);
