const cards = document.querySelectorAll('.card')
const lists = document.querySelectorAll(".list")

let dragged  = null

for(const card of cards){
    card.addEventListener('dragstart', dragStart)
    card.addEventListener('dragend', dragEnd)
}

for(const list of lists){
    list.addEventListener('dragover', dragOver)
    list.addEventListener('dragenter', dragEnter)
    list.addEventListener('dragleave', dragLeave)
    list.addEventListener('drop', dragDrop)
}


function dragStart(e){
    e.dataTransfer.setData("text/plain", e.target.id);
    // console.log(this)    this is pointing to the card 

    dragged = e.target;
}

function dragEnd(){
    console.log("Drag Ended")
}

function dragEnter(e){
    e.preventDefault()
    e.target.classList.add("over")
}

function dragLeave(e){
    e.target.classList.remove("over")
}

function dragDrop(e){
    e.preventDefault()  // by default browsers wont allow you to drop elements onto other elements
                        // so we have to prevent the default behaviour 
    e.target.appendChild(dragged)
}

function dragOver(e){
    e.preventDefault()
}