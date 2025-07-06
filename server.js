import express from 'express';
import {fileURLToPath} from 'url'
import router from './routes/quotes.js';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import notFound from './middleware/notFoundHandler.js';
import errorHandler from './middleware/error.js';
import path from 'path';
dotenv.config();
const PORT = process.env.PORT || 3005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(logger);

app.use(express.static(path.join(__dirname,'public')));

app.use('/api/quotes',router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));