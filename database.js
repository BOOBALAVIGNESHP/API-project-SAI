const book = [
    {
        ISBN: "12345Book",
        title: "Tesla!!",
        pubDate: "2021-08-05",
        language: "en",
        numPage: 256,
        author: [1,2],
        publications: [1],
        category: ["space","education","tech"]

    },
    {        
        ISBN: "12341Book",
        title: "Wings of Fire",
        pubDate: "2006-05-01",
        language: "en",
        numPage: 365,
        author: [1],
        publications: [1],
        category: ["space","education","tech","history"]

    },
    {
        ISBN: "12344Book",
        title: "choices",
        pubDate: "2019-01-09",
        language: "en",
        numPage: 303,
        author: [1],
        publications: [1],
        category: ["army","history","life"]

    },
    {
        ISBN: "12349Book",
        title: "Secret",
        pubDate: "2012-08-05",
        language: "en",
        numPage: 251,
        author: [1],
        publications: [1],
        category: ["tech","education","comedy"]

    },
    {
        ISBN: "12340Book",
        title: "7th Generations",
        pubDate: "2018-08-05",
        language: "tamil",
        numPage: 256,
        author: [1,2],
        publications: [1],
        category: ["tech","education","ethics"]
    }
]

const author= [
    {
        id: 1,
        name: "Aradhana",
        books: ["12121Book","Secret"]
    },
    {
        id: 2,
        name: "ElonMusk",
        books: ["12345book"]
    },
    {
        id: 3,
        name: "APJ Kalam",
        books: ["Wings of Fire"]
    }
]

const publication = [
    {
        id: 1,
        name: "writex",
        books: ["12345Book"] 
    },
    {
        id: 2,
        name: "creator",
        books: []
    }
]

module.exports = {book,author,publication}; //command to export the array of objects specified inside`{}`