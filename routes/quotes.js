import express from 'express';
import { getQuotes, getRandomQuotes, getQuotesById, createQuotes, updateQuotes, deleteQuote} from '../controllers/controller.js';
const router = express.Router();



router.get("/", getQuotes);

router.get("/random", getRandomQuotes);

router.get('/:id', getQuotesById);

// post routes

router.post('/', createQuotes)

router.put('/:id', updateQuotes);

router.delete("/:id",deleteQuote);

export default router;