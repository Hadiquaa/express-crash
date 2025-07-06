const output = document.querySelector('#output');
const allBtn = document.querySelector('#get-quotes-btn');
const categoryBtn = document.querySelector('#get-quotes-category-btn')
const categoryInput = document.querySelector('#category-input');
const randomBtn = document.querySelector('#random-quote-btn');
const form = document.querySelector('#add-quote-form');
const authorInput = document.querySelector('#quote-author');
const textInput = document.querySelector('#quote-text');
const quoteCategory = document.querySelector('#quote-category');

const showAllQuotes = async () => {
    try {
        const res = await fetch('http://localhost:8080/api/quotes');
        if(!res.ok){
            throw new Error("Failed to fetch posts");
        }
        const quotes = await res.json();
        output.innerHTML = '';
        quotes.forEach(quote => {
            const quoteEl = document.createElement('div');
            quoteEl.textContent = `${quote.text} - ${quote.author}`;
            output.appendChild(quoteEl);
        });
    } catch (error) {
        console.log("Error fetching quotes")
    }
}

const showCategoryQuotes = async () => {
    const category = categoryInput.value.trim();
    if(!category){
        output.innerHTML = `<p>Please Enter a Category</p>`;
        throw new Error("Please Enter a category");
    }
    try {
        const res = await fetch(`http://localhost:8080/api/quotes?category=${category}`);
        if(!res)
            throw new Error('Category Not Found');
        const quotes = await res.json();
        output.innerHTML = '';
        quotes.forEach((quote) => {
            const div  = document.createElement('div');
            div.innerHTML = `${quote.text} - ${quote.author}, ${quote.category}`;
            output.appendChild(div);
        })
    } catch (error) {
        console.log(error);
    }
}

const showRandomQuote = async () => {
    try {
        const res = await fetch('http://localhost:8080/api/quotes/random');
        if(!res.ok)
            throw new Error("Error Fetching Random Quote");
        const quote = await res.json();
        output.innerHTML = '';
        const quoteEl = document.createElement('div');
        quoteEl.innerHTML = `${quote.text} - ${quote.author}, ${quote.category}`;
        output.appendChild(quoteEl);

    } catch (error) {
        console.log(error);
    }
}

const addQuote = async (e) =>{
    e.preventDefault();
    const formData = {
        author: authorInput.value.trim(),
        text: textInput.value.trim(),
        category: quoteCategory.value.trim()
    }
    try {
        const res = await fetch('http://localhost:8080/api/quotes', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({...formData})
        })
        if(!res.ok)
            throw new Error('Failed to post');
        const newQuote = await res.json();

        const quoteEl = document.createElement('div');
        output.innerHTML = '';
        quoteEl.textContent = {...formData};
        output.appendChild(quoteEl);
        authorInput.value = "";
        textInput.value = "";
        quoteCategory.value = "";
        showAllQuotes();
    } catch (error) {
        console.log(error);
    }

}

allBtn.addEventListener('click',showAllQuotes);
categoryBtn.addEventListener('click', showCategoryQuotes);
randomBtn.addEventListener('click', showRandomQuote);
form.addEventListener('submit', addQuote);