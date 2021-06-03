document.addEventListener("DOMContentLoaded",()=>{
//fetch request to get quotes
    function getQuotes(){
        fetch("http://localhost:3000/quotes?_embed=likes")
        .then(resp=>resp.json())
        .then(data=>data.forEach(renderQuote))
        .catch(error=>console.error("Error:",error))
    }
//function fetch post request
    function createQuote(newQuote) {
        fetch("http://localhost:3000/quotes", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newQuote)
        }).then(resp=>resp.json())
        .then(data=>renderQuote(data))
        .then(data=>console.log(data))
        .catch(error=>console.error("Error:", error))
    }

//function to delete
    function deleteQuote(id) {
        fetch(`http://localhost:3000/quotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        }).catch(error=>console.error("Error:",error))
    }
//function to like
    // function likeQuote(id,newLikes) {
    //     fetch(`http://localhost:3000/quotes/${id}`,{
    //         method:"PATCH",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body:JSON.stringify(newLikes)
    //     }).then(r=>r.json())
    //     }


    getQuotes();
    //function to render quotes
    function renderQuote(quoteCard){
        //create elements
        const quoteList=document.querySelector("#quote-list")
        const li=document.createElement("li")
        const h4=document.createElement("h4")
        const speaker=document.createElement("h5")
        const likes=document.createElement("p")
        const deleteBtn=document.createElement("button")
        const likeBtn=document.createElement("button")
        //add content to elements
        h4.textContent=quoteCard.quote
        speaker.textContent=quoteCard.author
        likes.textContent=0 + " Likes"
        deleteBtn.textContent="delete"
        likeBtn.textContent="like"
        //append elements
        quoteList.append(li)
        li.append(h4,speaker,likes,deleteBtn,likeBtn)
        //delete button
        deleteBtn.addEventListener("click", ()=> {
            li.remove();
            deleteQuote(quoteCard.id);
        })
        //likebutton
        likeBtn.addEventListener("click",()=>{
            let likeNumber=+likes.textContent.split(" ")[0]
            let newLikes= {
                likes: likeNumber+1 + " Likes"
            }
            // likeQuote(quoteCard.id, newLikes)
            addQuotes(quoteCard.id)
            likes.textContent=newLikes.likes
            
            
        } )
    }
//form event 
    document.querySelector("form").addEventListener("submit", (e)=> {
        e.preventDefault()
        let quoteObject= {
            quote: e.target.quote.value,
            author: e.target.author.value
        }
        createQuote(quoteObject);
    })

    function addQuotes(id) {
        fetch(`http://localhost:3000/likes`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quoteId: id
            })
        }).then(resp=> resp.json())
    }
    
    
    



















})