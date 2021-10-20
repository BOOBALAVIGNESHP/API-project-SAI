const express = require("express");  //IMPORTING EXPRESS


const mongoose = require("mongoose"); //to import mongoose
//IMPORT BODY PARSER 

const bodyParser = require("body-parser");



    //Database
const database = require("./database");
    // INITIALIZING EXPRESS
const bookie = express();

bookie.use(bodyParser.urlencoded({extended: true}));
bookie.use(bodyParser.json());

/*!!!!!!!!!!  lines  1 to 15 is header */
/* bodyparser allows express to access/read the body, parse or convert it to json
ulencoded we can pass string/obj to url request
*/ 

mongoose.connect("mongodb+srv://BoobalaVignesh:<password>@shapeai.dee81.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("connection with Mongoose is Established"));


//get method 
/*

Route                           /
Description                     Get all the books 
Access                          PUBLIC
Parameter                       NONE
Methods                         GET
*/




bookie.get("/",(req,res) => {
    return res.json({books: database.book});
}
);

/*

Route                           /is
Description                     Get the specific book based on isbn 
Access                          PUBLIC
Parameter                       isbn
Methods                         GET
*/

bookie.get("/is/:isbn",(req,res) => {
    const getBook = database.book.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getBook.length === 0)
    {
        return res.json({error: `No book found for the isbn ${req.params.isbn}`}) // {} as it is changing dynamicly
    }

    return res.json({book: getBook});
});


/*

Route                           /c
Description                     Get the specific book based on category 
Access                          PUBLIC
Parameter                       category
Methods                         GET
*/

bookie.get("/c/:category", (req,res) => {
    const getBook = database.book.filter(
        (book) => book.category,includes(req.params.category)
    )

    if(getBook.length === 0){
        return res.json({error: `No book found with category of ${req.params.category}`});
    }

    return res.json({getBook});
});


bookie.get("/author/book/:isbn",(req,res)=>{
    const getAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getAuthor === 0){
        return res.json({error: `No author found for the book of ${req.params.isbn}`});
    }

    return res.json({getAuthor});
}
);

bookie.get("/l/:language",(req,res) =>{
    const getBook = database.book.filter(
        (book) => book.language === req.params.language
    )
    if(getBook.length === 0){
        return res.json({error: `No item found based on ${req.params.language}`});
    }

    return res.json({Book: getBook});
}
);

bookie.get("/author",(req,res)=>{
    return res.json({authors: database.author});
});


bookie.get("/a/:name",(req,res)=>{
    const getAuthor = database.author.filter(
        (author) => author.name === req.params.name
    )
    if(getAuthor.length === 0){
        return res.json({error: `No author found based on your search for ${req.params.name}`});
    }
    return res.json({getAuthor});
}
);

bookie.get("/ai/:id",(req,res)=>{
    const getAuthor = database.author.filter(
        (author) => author.id === req.params.id
    )
    if(getAuthor.length === 0){
        return res.json({error: `No author found for the ${req.params.id} id`});
    }
    return res.json({getAuthor});
});

bookie.get("/author/book/:isbn",(req,res)=>{
    const getAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getAuthor === 0){
        return res.json({error: `No author found for the book of ${req.params.isbn}`});
    }

    return res.json({getAuthor});
}
);

bookie.get("/publication",(req,res)=>{
   return res.json({Publication: database.publication});
}
);

//POST
/*

Route                           /book/new
Description                     add new books 
Access                          PUBLIC
Parameter                       none
Methods                         POST
*/

bookie.post("/book/new",(req,res)=>{
    const newBook = req.body;
    database.book.push(newBook);
    return res.json({UpdatedBook: database.book});

});

/*

Route                           /author/new
Description                     add new author 
Access                          PUBLIC
Parameter                       none
Methods                         POST
*/

bookie.post("/author/new",(req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({UpdatedAuthor: database.author});
});

/*

Route                           /publication/new
Description                     add new publication 
Access                          PUBLIC
Parameter                       none
Methods                         POST
*/

bookie.post("/publication/new",(req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json({UpdatedPublication: database.publication});
});

/*>>>>>>>>>>><<<<<<<<<< PUT METHOD >>>>>>>>>>>><<<<<<<<<< */
/*

Route                         /publication/update/book   
Description                     update book on isbn                    
Access                          PUBLIC
Parameter                       isbn
Methods                         PUT
*/


bookie.put("/book/update/:isbn", async (req,res) => {
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );
    return res.json({book: updatedBook})
});












/*

Route                         /publication/update/book   
Description                     update/add newPublication                    
Access                          PUBLIC
Parameter                       isbn
Methods                         PUT
*/

bookie.put("/publication/update/book/:isbn",(req,res) =>{
    //Update the publication database
    database.publication.forEach((pub) =>{
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });
    //Update the book database
    database.book.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = req.body.pubId;
            return;
        }
    });
    return res.json({books: database.book,
                    publication: database.publication,
                message: "Successfully updated publication" });
});




/*

Route                         /author/new   
Description                     Add new authors                    
Access                          PUBLIC
Parameter                       NONE
Methods                         POST
*/

bookie.post("/author/new" ,async (req,res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
                {
                    author: addNewAuthor,
                    message: "Author was added  !"
                }
    );
});



//***********delete***********

bookie.delete("/books/delete/:isbn", async(req,res)=>{
const updatedBookDatabase = awaitBookModel.findOneDelete(
    {
        ISBN: req.params.isbn
    }
);

return res.json({
    books: updatedBookDatabase
})
});


//accessing server through port

bookie.listen(3001,() =>{
    console.log("server is up and responding");

});