const removeButtons = document.querySelectorAll('li button');
const form = document.querySelector('#add-todo');
const input = document.querySelector('#todo-item');
const todoList = document.querySelector('#todo-list')

/* fortunately, I wrote the code along with the videos for the friends
list applet, and that is easily repurposed for this todo list */

// want to make updating storage simple every time we change the list
function updateStorage(){
    /* stringify is leaving my objects empty and isn't even having them
    load as lis containing their text. So. Fine. I'll do this the ugly
    hackish way */
    
    localStorage.setItem('todoList', todoList.innerHTML);
    
    /* commenting out the part where I try to be object-oriented
    const todoArray = [];
    const listItems = todoList.children;

    for(child of listItems){
        todoArray.push(child);
        console.log(child);
        console.log(JSON.stringify(child))
    }
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
    */
}

// move this out of the event listener into a function
function buildTodo(text){
    const newTodo = document.createElement('li');
    newTodo.innerText = text + ' ';

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    newTodo.appendChild(removeButton);

    todoList.appendChild(newTodo);
    updateStorage();
}

todoList.addEventListener('click', function(evt){
    if (evt.target.tagName === 'BUTTON') {
        evt.target.parentElement.remove();
    }
    else if(evt.target.tagName === 'LI') {
        evt.target.classList.toggle('completed');
    }
    updateStorage();
})

form.addEventListener('submit',function(e){
    e.preventDefault();
    buildTodo(input.value);
    input.value = '';
})

// and the only thing that just runs when the script is called
// loading the todo list from storage
const storedText = localStorage.getItem('todoList');
if (storedText == null){
    buildTodo('Make to-do list');
}
else {todoList.innerHTML = storedText;}