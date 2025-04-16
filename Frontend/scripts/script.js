
const fic_button=document.getElementById("fiction_button");
const non_fic_button=document.getElementById("Non_fiction_button");

document.getElementById("fiction_button").addEventListener('click',(e)=>
{
     fic_button.classList.toggle('active_fiction')
     non_fic_button.classList.remove('active_fiction')
     const fiction_section=document.getElementById("fiction_genre_books_section")
     fiction_section.classList.toggle('display_genre_books')
     const non_fiction_section=document.getElementById("non-fiction_genre_books_section")
     non_fiction_section.classList.remove('display_genre_books')
     
})


document.getElementById("Non_fiction_button").addEventListener('click',(e)=>
    {
        non_fic_button.classList.toggle('active_fiction')
        fic_button.classList.remove('active_fiction')

        const non_fiction_section=document.getElementById("non-fiction_genre_books_section")
        non_fiction_section.classList.toggle('display_genre_books')
     const fiction_section=document.getElementById("fiction_genre_books_section")
     fiction_section.classList.remove('display_genre_books')
        
    })
    

function goToGenreBookPage(button) {
    const genre=button.innerText;
    console.log(genre)
    window.location.href=`GenreBooks.html?fetch=true&genre=${genre}`;
}

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
    location.reload();

})