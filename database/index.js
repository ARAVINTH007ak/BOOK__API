let books = [
    {
        ISBN: "12345Book",
        title: "Getting Start with MERN",
        authors: [1, 2],
        language: "en",
        publication:1,
        pages: 250,
        pubDate: "2021-07-07",
        category: ["fiction", "programming", "tech", "Web dev"],
    },
    {
        ISBN: "123456789Secret",
        title: "Getting Start Python",
        authors: [1],
        language: "Tam",
        publication:1,
        pages: 200,
        pubDate: "2020-09-17",
        category: ["programming","tech"],
    },

];

let authors = [
    {
        id: 1,
        name: "Pavan",
        books: ["12345Book","123456789Secret"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"],
    },
    {
        id: 3,
        name: "waren buffet",
        books: ["747456"],
    }

];
const publications = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book","123456789Secret"],
    }, 
    {
        id: 2,
        name: "Dogex",
        books: ["ES6 JavaScript"],
    }, 

];

module.exports = {
    books,
    authors,
    publications
};


