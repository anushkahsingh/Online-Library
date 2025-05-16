const express = require("express");
const userschema = require("./model/userSchema");
const app = express();
const mongoose= require('mongoose')
app.use(express.json());
const bcrypt = require("bcrypt");
const bookschema = require("./model/bookSchema");
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));

const port = 5000;
mongoose.connect("mongodb+srv://anushka0122be23:anushka0122.be23@cluster0.51lu4al.mongodb.net/online_library?retryWrites=true&w=majority&appName=Cluster0")
.then(console.log("Connection Successfull"))
.catch(err => console.log(err))


// fetch book according to genre
app.get("/get_genre_book/:genre", (req, res) => {
  const genre = req.params.genre;
  bookschema.find({genre:genre})   //.find(){schema:variable} {genre:romantic}  
  .then((books)=>
{
  if(books.length === 0)
    res.status(400).json({ message: "Requested genre books not found" });
  else{
    res.status(200).json({
      message: "Requested Genre Books fetched Successfully",
      genre_books: books,
    });
  }
})
.catch((err) => {
  res
    .status(500)
    .json({ message: "Server Encountered a error", error: err });
})
});

app.post("/login", (req, res) => {
  // const users = readUserDataFile()
  const username = req.body.username;
  const password = req.body.password;
  userschema
    .findOne({ username: username })
    .then((result) => {
      if (result === null) {
        res
          .status(400)
          .json({ msg: "Incorrect Username or user does not exist" });
      } else {
        const passres = bcrypt.compareSync(password, result.password);
        if (passres) {
         
          res.status(200).json({ msg: "Login Successful...", user: result });
        } else {
          return res.status(400).json({ msg: "Wrong Password..." });
        }
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Server Encountered a error", error: err });
    });
});

app.post("/signup", (req, res) => {
  userschema
    .find({ username: req.body.username })
    .then((result) => {
      if (result.length !== 0)
        res.status(400).json({
          msg: "User Already Exists. Please try with a different user or login with current user",
        });
      else {

        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const new_user = new userschema({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          password: hashedPassword,
          username: req.body.username,
          role: "user",
        });
        new_user.save()
          .then((saveres) =>
            res.status(200).json({
              msg: "User Created Successfully...",
              user_details: saveres,
            })
          )
          .catch((err) =>
            res.status(
              res
                .status(500)
                .json({ message: "Server Encountered an Error", error: err })
            )
          );
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Server Encountered an Error", error: err })
    );
});

app.post("/add_book", (req, res) => {
  bookschema
    .find()
    .then((books) => {
      if (books.length === 0) {
        console.log(books);
        res.status(400).json({ msg: "Books does not Exist" });
      } else {
        let book_id;
        console.log(books.length);
        
        if (books.length === 0) book_id = 1;
        else book_id = books[books.length - 1].image_id + 1;
        const new_book = new bookschema({
          _id: new mongoose.Types.ObjectId(),
          image_id: book_id,
          name: req.body.name,
          author: req.body.author,
          year: req.body.year,
          genre: req.body.genre,
          description: req.body.description,
        });

        new_book
          .save()
          .then((result) =>
            res.status(200).json({
              msg: "New Book Added Successfully...",
              book_details: result,
            })
          )
          .catch((err) =>
            res
              .status(500)
              .json({ message: "Server Encountered an Error", error: err })
          );
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Server Encountered an Error", error: err })
    );
});

app.delete("/delete_book/:id", (req, res) => {
  const book_id = req.params.id;
  bookschema
    .findByIdAndDelete(book_id)
    .then((result) => {
      res
        .status(200)
        .json({ msg: "Book Deteted Successfully...", deleted_book: result });
    })
    .catch((err) =>
      res.status(500).json({
        msg: "Unable to delete book at the moment. Please try again",
        error: err,
      })
    );
});

app.get("/get_all_books", (req, res) => {


  bookschema
    .find()
    .then((books) => {
      res.status(200).json({ books: books });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Server Encountered an Error", error: err })
    )
});

app.put("/update_book/:id", (req, res) => {
  const book_id = req.params.id;
  // console.log(book_id);

  bookschema.findByIdAndUpdate(book_id,{
        name:req.body.name,
        description:req.body.description
  })
  .then(result=>res.status(200).json({ msg: "Book Updated", updated_book: result }))
  .catch(err=>res
    .status(500)
    .json({ message: "Server Encountered an Error", error: err })
)

});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Request received successfully." });
});
//listen: start the server,listen for incoming requests on a specified port,it's part of setting up a basic HTTP server.
app.listen(port, () => {
  console.log("Server Running...");
});