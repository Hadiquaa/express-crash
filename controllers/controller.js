const quotes = [
  {
    id: 1,
    author: "Albert Einstein",
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    category: "inspiration",
  },
  {
    id: 2,
    author: "Oscar Wilde",
    text: "Be yourself; everyone else is already taken.",
    category: "wisdom",
  },
  {
    id: 3,
    author: "Maya Angelou",
    text: "You will face many defeats in life, but never let yourself be defeated.",
    category: "motivation",
  },
  {
    id: 4,
    author: "Mark Twain",
    text: "The secret of getting ahead is getting started.",
    category: "productivity",
  },
  {
    id: 5,
    author: "Steve Jobs",
    text: "Your time is limited, so don’t waste it living someone else’s life.",
    category: "motivation",
  },
  {
    id: 6,
    author: "Abraham Lincoln",
    text: "Whatever you are, be a good one.",
    category: "leadership",
  },
  {
    id: 7,
    author: "Confucius",
    text: "It does not matter how slowly you go as long as you do not stop.",
    category: "perseverance",
  },
  {
    id: 8,
    author: "Dr. Seuss",
    text: "Don't cry because it's over, smile because it happened.",
    category: "life",
  },
  {
    id: 9,
    author: "Walt Disney",
    text: "The way to get started is to quit talking and begin doing.",
    category: "action",
  },
  {
    id: 10,
    author: "Helen Keller",
    text: "Keep your face to the sunshine and you cannot see a shadow.",
    category: "hope",
  },
];

export const getQuotes = (req, res) => {
  const limit = parseInt(req.query.limit);
  const category = req.query.category;
  let results = quotes;
  if (category) {
    results = quotes.filter(
      (q) => q.category.toLowerCase() === category.toLowerCase()
    );
    if (results.length === 0)
      return res.status(404).json({ message: "Category not found" });
  }
  if (!isNaN(limit) && limit > 0) {
    results = results.slice(0, limit);
  }
  res.json(results);
};

export const getRandomQuotes = (req, res) => {
  res.json(quotes[Math.floor(Math.random() * quotes.length)]);
};

export const getQuotesById = (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find((q) => q.id === id);
  if (!quote)
    return res.status(404).json({ message: "Quote with Id not Found" });
  else res.json(quote);
};

export const createQuotes = (req, res) => {
  const newQuote = { ...req.body, id: quotes.length + 1 };
  quotes.push(newQuote);
  res.status(201).json(newQuote);
};

export const updateQuotes = (req, res) => {
  const id = parseInt(req.params.id);
  const index = quotes.findIndex((q) => q.id === id);
  if (index !== -1) {
    quotes[index] = { ...quotes[index], ...req.body };
    res.status(201).json(quotes[index]);
  } else res.status(404).res.json({ message: `Quote with ${id} not found` });
};

export const deleteQuote = (req, res) => {
  const id = parseInt(req.params.id);
  const index = quotes.findIndex((q) => q.id === id);
  if (index !== -1) {
    const deleted = quotes.splice(index, 1);
    res.status(201).json({ message: "Deleted", deleted });
  } else res.status(404).res.json({ message: `Quote with ${id} not found` });
};