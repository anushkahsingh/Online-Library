let all_books=``;
let currentBookId = null;
let currentCard = null;
let deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
window.addEventListener("DOMContentLoaded",()=>
{


 


    const all_books_content=document.getElementById('all_books_content')
   
    document.getElementById('loader').style.display="block";
    fetch('http://localhost:5000/get_all_books')
    .then(res=>
    {
        if(!res.ok) throw new Error(`Error ${res.status}`)
            return res.json();
    }
    )
    .then((response)=>
    {  document.getElementById('loader').style.display="none";
        const requested_books=response.books;
        requested_books.forEach(book => {
                all_books+=`<div id=bookno-${book.image_id} class="card mb-3" style="max-width: 540px; " data-book-id=${book._id}>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="http://localhost:5000/images/img${book.image_id}.png" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="font-weight:700">${book.name}</h5>
                            <p class="card-text">${book.description}</p>
                            <button type="button" class="btn-danger btn read_book all_read_buttons delete_buttons">Delete</button>
                             <button type="button" class="btn read_book all_read_buttons update_buttons">Update</button>
                        </div>
                    </div>
                </div>
            </div>`
        });
        all_books_content.innerHTML=all_books;


        document.querySelectorAll('.update_buttons').forEach(button => {
            button.addEventListener('click', (e) => {
              const card = e.target.closest('.card');
              const bookId = card.dataset.bookId;
              const bookTitle = card.querySelector('.card-title').textContent.trim();
              const bookDesc = card.querySelector('.card-text').textContent.trim();
          
              // Pre-fill modal fields
              document.getElementById('updateBookId').value = bookId;
              document.getElementById('updateBookName').value = bookTitle;
              document.getElementById('updateBookDescription').value = bookDesc;
          
              // Show modal
              new bootstrap.Modal(document.getElementById('updateBookModal')).show();

            });
          });
          document.querySelectorAll('.delete_buttons').forEach(button => {
            button.addEventListener('click', (e) => {
              currentCard = e.target.closest('.card');
              currentBookId = currentCard.dataset.bookId;
              deleteModal.show();
            });
          });


    })
    .catch((err)=>{
        document.getElementById('loader').style.display="none";
        books+=`<div class="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div>`
all_books_content.innerHTML=books;

    })
    

    
})


// update book
  
  document.getElementById('updateBookForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const bookId = document.getElementById('updateBookId').value;
    const updatedName = document.getElementById('updateBookName').value;
    const updatedDesc = document.getElementById('updateBookDescription').value;


    fetch(`http://localhost:5000/update_book/${bookId}`, {
      method: 'PUT', // Or POST if your backend uses POST
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: updatedName,
        description: updatedDesc
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    })
    .then(data => {
      // Update the card on the page
      const card = document.querySelector(`[data-book-id="${bookId}"]`);
      card.querySelector('.card-title').textContent = updatedName;
      card.querySelector('.card-text').textContent = updatedDesc;
  
      // Hide modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('updateBookModal'));
      modal.hide();
    })
    .catch(err => {
      alert("Error: " + err.message);
    });
  });
  


//   delete book
  document.getElementById('deleteBook').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentCard || !currentBookId) return;
  
    fetch(`http://localhost:5000/delete_book/${currentBookId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          currentCard.remove();
          deleteModal.hide();
          alert('Book deleted successfully!');
        } else {
          alert('Failed to delete the book.');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Something went wrong while deleting the book.');
      });
  });
  
  if(localStorage.getItem('role')==='user' || localStorage.getItem('role')==='admin' )
    {
        document.getElementById("login/signup").style.display="none";
        if(localStorage.getItem('role')==='admin')
        document.querySelector(".logged_in_admin").style.display="none"
       else 
        document.querySelector(".logged_in").style.display="block"
    }
    

    document.getElementById('addBookForm').addEventListener('submit', (e) => {
        e.preventDefault();
      
        const bookData = {
          name: document.getElementById('name').value,
          author: document.getElementById('author').value,
          year: document.getElementById('year').value,
          link: document.getElementById('link').value,
          genre: document.getElementById('genre').value,
          description: document.getElementById('description').value
        };
      
        fetch('http://localhost:5000/add_book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookData)
        })
          .then(res => res.json())
          .then(data => {
            if (data.msg) {
              alert('Book Added successfully!');
              const addModal = bootstrap.Modal.getInstance(document.getElementById('addBookModal'));
              addModal.hide();
              document.getElementById('addBookForm').reset();
              // Optionally reload books
            } else {
              alert('Failed to add book.');
            }
          })
          .catch(err => {
            console.error(err);
            alert('Something went wrong!');
          });
      });
      

      if(localStorage.getItem("role")==="admin")
        document.getElementById("logout").style.display='block';
    
    document.getElementById("logout_btn").addEventListener("click",()=>
        {
            localStorage.removeItem('role')
          window.location.href = "/Frontend/index.html"
        
        })