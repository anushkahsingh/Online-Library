window.addEventListener("DOMContentLoaded", () => {
      const params = new URLSearchParams(window.location.search);
      const shouldFetch = params.get("fetch");
      const genre = params.get("genre")
      console.log(genre)
      const book_card=document.getElementById('book_card')
    if(shouldFetch === 'true')
    {
        let books=``;
        document.getElementById('loader').style.display="block";

        fetch(`http://localhost:5000/get_genre_book/${genre}`)
        .then((res)=>
        {
               if(!res.ok) throw new Error(`Error ${res.status}`)
               return res.json();
        })
    .then((response)=>
    {

        document.getElementById('loader').style.display="none";
        console.log(response);
        const requested_books=response.genre_books
        console.log(requested_books)
        requested_books.forEach(book => {
            books+=`<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="http://localhost:5000/images/img${book.image_id}.png" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="font-weight:700">${book.name}</h5>
                            <p class="card-text">${book.description}</p>
                            <a class="btn read_book all_read_buttons" role="button">Read Book</a>
                        </div>
                    </div>
                </div>
            </div>`

        });
      book_card.innerHTML=books
      const read_btns = document.querySelectorAll('.all_read_buttons');
 
      const userRole = localStorage.getItem('role');
      read_btns.forEach((btn, index) => {
        if (userRole === 'user' || userRole==='admin') {
         
          btn.setAttribute('href', `http://localhost:5000/pdfs/book${requested_books[index].image_id}.pdf`);
          btn.setAttribute('target', '_blank'); // optional: open in new tab
        }
        else {
            // 👉 Not logged in: open modal instead of redirect
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
              myModal.show();
            });
          }
        });
    
    })
    .catch((err)=>
    {
        document.getElementById('loader').style.display="none";
        books+=`<div class="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div>`
book_card.innerHTML=books;




    })

    }

 })
 


 if(localStorage.getItem('role')==='user' || localStorage.getItem('role')==='admin' )
    {
        document.getElementById("login/signup").style.display="none";
        document.getElementById("logout").style.display="block"
        if(localStorage.getItem('role')==='admin')
        document.querySelector(".logged_in_admin").style.display="block"
       else 
        document.querySelector(".logged_in").style.display="block"
    }
    
    // localStorage.removeItem('role') 
    document.getElementById("logout_btn").addEventListener("click",()=>
    {
        localStorage.removeItem('role')
      window.location.href = "/Frontend/index.html"
    
    })