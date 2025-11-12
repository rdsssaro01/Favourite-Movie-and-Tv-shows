import express from 'express';
import entryRouter from './modules/entry/entries.routes';
import { errorHandler } from './middlewars/errorHandler.middleware';

const app = express();
app.use(express.json());
app.use('/api',entryRouter );
app.use(errorHandler);

export default app;
