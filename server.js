require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const database = require("./database")
app.use(express.json());

//!Models:::

const BookModel=require("./database/book")
const AuthorModel=require("./database/author")
const PublicationModel=require("./database/publication")



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("Connection Established!!!!!!!!!");
})

 


/*
!ROUTE       /
!Descrption  Get all books
!Access      PUBLIC
!Parameters  none
!Methods     Get
*/

app.get("/", async (req, res) => {
    const getAllBooks=await BookModel.find();
    const getAllAuthors=await AuthorModel.find();
    const getAllPublications=await PublicationModel.find();
    return  res.json({book: getAllBooks,authors:getAllAuthors,publications:getAllPublications})
})

/*
!ROUTE       /is
!Descrption  Get specific book based on ISBN
!Access      PUBLIC
!Parameters  isbn
!Methods     Get
*/

app.get("/is/:isbn", async (req, res) => {
    var x = req.params.isbn;

    const getSpecificBook=await BookModel.findOne({ISBN:x})

    if (!getSpecificBook) {
        return res.json({error: `NO Book Found for ISBN: ${x}`})
     } 
    return res.json({book: getSpecificBook})

})

/*
!ROUTE       /c
!Descrption  Get specific book based on Category
!Access      PUBLIC
!Parameters  cat
!Methods     Get
*/


app.get("/c/:cat", async (req, res) => {

    var x = req.params.cat;
    const getSpecificBook = await BookModel.find({category:x})

     if(getSpecificBook.length==0){
        return res.json({error: `NO Book Found for the Category ${x}`})
    }
    return res.json({book:getSpecificBook})

})



/*
!ROUTE       /aaaaaid
!Descrption  Get specific book based on authors
!Access      PUBLIC
!Parameters  id
!Methods     Get
*/

app.get("/aaaaaid/:id", async (req, res) => {

    var x = Number(req.params.id);
    const getSpecificBook = await BookModel.find({authors:x})
    if(getSpecificBook.length==0){
        return res.json({error: `NO Book Found for the author id: ${x}`})
    }
    return res.json({book:getSpecificBook})

})




/*
!ROUTE       /author
!Descrption  Get all author
!Access      PUBLIC
!Parameters  None
!Methods     Get
*/

app.get("/author", async (req, res) => {
    const getAllAuthors=await AuthorModel.find();
    return  res.json({authors: getAllAuthors})

})


/*
!ROUTE       /aid
!Descrption  Get  author  based on id
!Access      PUBLIC
!Parameters  id
!Methods     Get
*/

app.get("/aid/:id", async (req, res) => {

    var x = Number(req.params.id);

    const getSpecificAuthor=await AuthorModel.findOne({id:x})
    if (!getSpecificAuthor) {
        return res.json({
            error: `NO Book Found for the author ID: ${x}`
        })
    }
    return res.json({author:getSpecificAuthor})

})



/*
!ROUTE       /abb
!Descrption  Get  author  based on book isbn
!Access      PUBLIC
!Parameters  isbn
!Methods     Get
*/



app.get("/abb/:isbn",async (req, res) => {

    var x = req.params.isbn;
    const getSpecificAuthor=await AuthorModel.findOne({books:x})
    if (!getSpecificAuthor) {
        return res.json({
            error: `NO Book Found for the author BOOKS ISBN: ${x}`
        })
    }
    return res.json({authors:getSpecificAuthor})

})



/*
!ROUTE       /publication
!Descrption  Get all publications
!Access      PUBLIC
!Parameters  None
!Methods     Get
*/

app.get("/publication",async (req, res) => {
    const getAllPublications=await PublicationModel.find();
    return  res.json({publications: getAllPublications})

})


/*
!ROUTE       /pubid
!Descrption  Get  Publication based on id
!Access      PUBLIC
!Parameters  id
!Methods     Get
*/

app.get("/pubid/:id", async(req, res) => {

    var x = Number(req.params.id);
    const getSpecificPublication= await PublicationModel.findOne({id:x})
    if (!getSpecificPublication) {
        return res.json({
            error: `NO Book Found for the publication  ID: ${x}`
        })
    }
    return res.json({publications:getSpecificPublication} )

})



/*
!ROUTE       /pubbb
!Descrption  Get  publication  based on book isbn
!Access      PUBLIC
!Parameters  isbn
!Methods     Get
*/



app.get("/pubbb/:isbn", async (req, res) => {

    var x = req.params.isbn;
    const getSpecificPublication= await PublicationModel.findOne({books:x})
    if (!getSpecificPublication) {
        return res.json({error: `NO Book Found for the Publication  BOOK ISBN: ${x}`})
    }
    return res.json({publications:getSpecificPublication})

})

//! *****************************************************GET END******************************************************************!/


/*
!ROUTE       /book/add
!Descrption  Add new book
!Access      PUBLIC
!Parameters  None
!Methods     Post
*/


app.post("/book/add", (req, res) => {

    const {newbook} = req.body
    BookModel.create(newbook)
    return res.json({message:"books was added"})
})

/*
!ROUTE       /author/add
!Descrption  Add new author
!Access      PUBLIC
!Parameters  None
!Methods     Post
*/

app.post("/author/add", (req, res) => {

    const {newauth} = req.body
    AuthorModel.create(newauth)
    return res.json({message:"Author was added"})
})

/*
!ROUTE       /publication/add
!Descrption  Add new publication
!Access      PUBLIC
!Parameters  None
!Methods     Post
*/

app.post("/publication/add", (req, res) => {

    const {newpub} = req.body
    PublicationModel.create(newpub)
    return res.json({message:"Publication was added"})
})

//! ****************************************************************POST END*****************************************************!/

/*
!ROUTE       /book/update
!Descrption  Update the TITLE with ISBN
!Access      PUBLIC
!Parameters  isbn ,tit
!Methods     Put
*/


app.put("/book/update/:isbn/:tit", async(req, res) => {

    var x = req.params.isbn;
    var y = req.params.tit;

    await BookModel.findOneAndUpdate({ISBN:x},{title:y})


/*     return res.json({
        books: updatedBook
    }) */
})

/*
!ROUTE       /book/update/auth
!Descrption  Update the author in book and author database
!Access      PUBLIC
!Parameters  isbn ,aid
!Methods     Put
*/



app.put("/book/update/auth/:isbn/:aid", async (req, res) => {

    var x = req.params.isbn;
    var y = Number(req.params.aid);

    const updatedAuthor= await BookModel.findOneAndUpdate({ISBN:x},{$push:{authors:y}},{new:true})

/*     database.books.forEach((book) => {
        if (book.ISBN === x) {
            return book.authors.push(Number(y));
        }
    }) */
    
    const updatedBooks= await AuthorModel.findOneAndUpdate({id:y},{$push:{books:x}},{new:true})


/*     database.authors.forEach((author) => {
        if (author.id === Number(y)) {
            return author.books.push(x);
        }
    }) */
    return res.json({
        books: updatedAuthor,
        authors: updatedBooks
    })
})

/*
!ROUTE       /book/update/authname
!Descrption  Update the author name
!Access      PUBLIC
!Parameters  aid,aname
!Methods     Put
*/



app.put("/book/update/authname/:aid/:aname", async(req, res) => {

    var x = req.params.aname;
    var y = Number(req.params.aid);

    const updatedAuthor=await AuthorModel.findOneAndUpdate({id:y},{name:x},{new:true})

    /*     database.authors.forEach((author) => {

        if (author.id === y) {
            return author.name = x;
        }
    }) */
    return res.json({
        authors: updatedAuthor
    })
})

/*
!ROUTE       /book/update/pubname
!Descrption  Update the Publication name
!Access      PUBLIC
!Parameters  pid,pname
!Methods     Put
*/

app.put("/book/update/pubname/:pid/:pname", async (req, res) => {

    var x = req.params.pname;
    var y = Number(req.params.pid);

    const updatedPublication=await PublicationModel.findOneAndUpdate({id:y},{name:x},{new:true})

/*     database.publications.forEach((publication) => {
        if (publication.id === y) {
            return publication.name = x;
        }
    }) */
    return res.json({
        Publications: updatedPublication
    })
})

/*
!ROUTE       /publication/update/book
!Descrption  Update/add new book to a publication
!Access      PUBLIC
!Parameters  isbn,pid
!Methods     Put
*/

app.put("/publication/update/book/:isbn/:pid", async (req, res) => {

    var x = req.params.isbn;
    var y = Number(req.params.pid);
    const Modifiedbook = await  BookModel.findOneAndUpdate({ISBN:x},{publication:y})

/*     database.books.forEach((book) => {

        if (book.ISBN == x) {
            return book.publication = y
        }

    }) */

    const Modifiedpubilcation = await  PublicationModel.findOneAndUpdate({id:y},{$push:{books:x}})


/*     database.publications.forEach((publication) => {

        if (publication.id === y) {
            return publication.books.push(x)
        }
    }) */
    
    return res.json({
        books: Modifiedbook,
        publications: Modifiedpubilcation,
        message: "Successfully Updated",

    })
})

//! ***************************************************************PUT END*****************************************************!/



/*
!ROUTE       /book/delete
!Descrption  delete a book
!Access      PUBLIC
!Parameters  isbn
!Methods     delete
*/

app.delete("/book/delete/:isbn",async (req, res) => {


   var x = req.params.isbn
   const deletedBook= await BookModel.deleteOne({ISBN:x})
/*     var fig = database.books.filter((book) => {

        return book.ISBN !== x

    })
    database.books = fig; */
    return res.json({
        message:"Successfully Deleted"
    })

})

/*
!ROUTE       /book/deleteauth
!Descrption  delete a author from book
!Access      PUBLIC
!Parameters  isbn,aid
!Methods     delete
*/

app.delete("/book/deleteauth/:isbn/:aid",async (req, res) => {

    var x = req.params.isbn
    var y = Number(req.params.aid)

    const updatedBook= await BookModel.findOneAndUpdate({ISBN:x},{$pull:{authors:y}},{new:true})

 
/*     database.books.forEach((book) => {
        if (book.ISBN == x) {
            let ind = book.authors.indexOf(y)
            return book.authors.splice(ind, 1)
        }
    }) */

    const updatedAuthor=await AuthorModel.findOneAndUpdate({id:y},{$pull:{books:x}},{new:true})

    /*     database.authors.forEach((author) => {
        if (author.id === y) {
            let ind = author.books.indexOf(x)
            return author.books.splice(ind, 1)
        }
    }) */

    return res.json({
        books: updatedBook,
        authors: updatedAuthor
    })

})

/*
!ROUTE       /book/deleteinauthdata
!Descrption  delete a author 
!Access      PUBLIC
!Parameters  aid
!Methods     delete
*/
app.delete("/book/deleteinauthdata/:aid", async(req, res) => {


    var x = Number(req.params.aid)
    const deletedAuthor= await AuthorModel.deleteOne({id:x})

/*     var fig = database.authors.filter((author) => {
        return author.id !== x
    }) 
    database.authors = fig; */
    return res.json({author:deletedAuthor})


})


/*
!ROUTE       /book/deleteinpubdata
!Descrption  delete a Publication 
!Access      PUBLIC
!Parameters  pubid
!Methods     delete
*/

app.delete("/book/deleteinpubdata/:pubid", async(req, res) => {


    var x = Number(req.params.pubid)
    const deletedPublication= await PublicationModel.deleteOne({id:x})

    /*     var fig = database.publications.filter((publication) => {
        return publication.id !== x
    })
    database.publications = fig; */
    return res.json({publications:deletedPublication});


})


/*
!ROUTE       /book/deletepublicationbook
!Descrption  delete a book from Publication 
!Access      PUBLIC
!Parameters  isbn,pubid
!Methods     delete
*/


app.delete("/book/deletepublicationbook/:isbn/:pubid", async (req, res) => {

    var x = req.params.isbn
    var y = Number(req.params.pubid)

    const deletedPublication= await PublicationModel.findOneAndUpdate({id:y},{$pull:{books:x}},{new:true})
    

/*     database.publications.forEach((publication) => {
        if (publication.id === y) {
            let ind = publication.books.indexOf(x)
            return publication.books.splice(ind, 1)
        }
    }) */

   
    const deletedBook= await BookModel.findOneAndUpdate({ISBN:x},{publication:0},{new:true})

/*     database.books.forEach((book) => {

        if (book.ISBN === x) {
            return book.publication = 0;
        }
    }) */

    return res.json({
        books: deletedBook,
        publications:deletedPublication
    });

})

//! ************************************************************DELETE END*************************************************************************!/



app.listen(3000, () => {
    console.log("Server Running in 3000");
})