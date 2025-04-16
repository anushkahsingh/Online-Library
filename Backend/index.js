const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt')
const{readUserDataFile,writeUserDataFile} = require ('./file1')
const{readBookDataFile,writeBookDataFile} = require ('./file2')
const cors=require('cors')
const path=require('path')
app.use(cors())
app.use(express.static('public'))

const port = 5000

//listen: start the server,listen for incoming requests on a specified port,it's part of setting up a basic HTTP server.
app.listen(port,()=>{
    console.log("Server Running...");
})

// fetch book according to genre
app.get('/get_genre_book/:genre',(req,res)=>{
    const genre = req.params.genre;
    const books = readBookDataFile()
    let genre_books = [];
    for(let i=0; i<books.length; i++){
        if(books[i].genre === genre){
            genre_books.push(books[i]);
        }
    }
    if(genre_books.length!==0){
    // console.log(genre_books)
        res.status(200).json({message:"Requested Genre Books fetched Successfully",genre_books:genre_books})
    
    }
    else
    res.status(400).json({message:"Genre not found"})
})

app.post('/login',(req,res)=>{
    const users = readUserDataFile()
    const username = req.body.username
    const password = req.body.password
    for(let i=0; i<users.length; i++){
        if(users[i].username === username){
            const result = bcrypt.compareSync(password,users[i].password)
            if(result){
                return res.status(200).json({msg: "Login Successful...",user:users[i]})
            }
            else{
                return res.status(400).json({msg: 'Wrong Password...'})
            }
        }
    }
    return res.status(400).json({msg: "Incorrect Username..."})
})

app.post("/signup",(req, res)=>{
    const users = readUserDataFile();
    const username=req.body.username;
    for(let i=0;i<users.length;i++)
    {
        if(users[i].username===username)
            return res.status(400).json({msg:"User Already Exists. Please try with a different user or login with current user"})
    }

    let user_id;
    if(users.length === 0){
        user_id = 1;
    }
    else{
        user_id = users[users.length-1].id +1;
    }
    const hashedPassword = bcrypt.hashSync(req.body.password,8)
    const new_user = {
        id : user_id,
        name : req.body.name,
        password : hashedPassword,
        username : req.body.username,
        role : "user"
    }
    users.push(new_user);
    writeUserDataFile(users);
    return res.status(200).json({msg: "User Created Successfully..."})
})

app.post("/add_book",(req,res)=>{
    const books = readBookDataFile();
    let book_id;
    if(books.length === 0){
        book_id = 1;
    }
    else{
        book_id = books[books.length-1].id +1;
    }
    const new_book = {
        id : book_id,
        name : req.body.name,
        author : req.body.author,
        year : req.body.year,
        link : req.body.link,
        genre : req.body.genre,
        description : req.body.description
    }
    books.push(new_book)
    writeBookDataFile(books);
    return res.status(200).json({msg: "New Book Added Successfully..."})
})

app.delete("/delete_book/:id",(req,res)=>{
    const book_id = req.params.id;
    const books = readBookDataFile();
    const humari_books = [...books];
    for(let i=0; i<books.length; i++){
        if(humari_books[i].id == book_id){
            humari_books.splice(i,1);
            writeBookDataFile(humari_books);
            return res.status(200).json({msg: "Book Deteted Successfully..."})
        }
    }
    return res.status(400).json({msg: "Book Not Found..."})
})

app.get("/get_all_books",(req,res)=>{
    const books = readBookDataFile();
    res.status(200).json({books: books})
})

app.put("/update_book/:id",(req,res)=>{
    const book_id = req.params.id;
    console.log(book_id);
    const books = readBookDataFile();
    console.log(books.length);
    for(let i=0; i<books.length; i++){
        console.log(books[i].id == book_id)
        if(books[i].id == book_id){
            books[i].name = req.body.name
            books[i].description = req.body.description
            // console.log(books)
            writeBookDataFile(books)
            return res.status(200).json({msg: "Book Updated Successfully..."})
        }
    }
    return res.status(400).json({msg: "Book not found..."})
})

app.get("/",(req,res)=>{
    res.status(200).json({msg: "Request received successfully."})
})