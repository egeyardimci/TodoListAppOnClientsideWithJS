//A basic javascript todo app with localstorage.

//This function gets the saved tasks and the task count value (which i use below in my code) on window load.
window.onload = function(){
    let todoListArray;
    let taskCount;
    getLocalStorageData();
    getTaskCount();
}

//Every task has its own id and this function gets the starting point of id count for new tasks as i dont want to give the same id to different tasks.
function getTaskCount(){
    if(localStorage.getItem("TASKCOUNT") === null){
        taskCount = 0;
    }else {
        taskCount = JSON.parse(localStorage.getItem("TASKCOUNT"));
    }
}

//This function gets the saved todo task list from local storage.
function getLocalStorageData(){
    if(localStorage.getItem("TODOLIST") === null){
        todoListArray = [];
    }else {
        todoListArray = JSON.parse(localStorage.getItem("TODOLIST"));
    }
    displayTodoList();
    updateMarkedItems();
}

//This can be reffered as a class for todo tasks.
function TodoListItem() {
    let isDone = false;
    let isListed = false;
    let taskName = "";
    let taskID = "";
}

//This is a function which creates any html objects with given properties.
function createHtmlItem(elementType,type,id,name,style){
    let newElement = document.createElement(elementType);
    
    newElement.type = type;
    newElement.id = id;
    newElement.name = name;
    newElement.style = style;

    return newElement;
}

//This is the task id generator function and every task has its own id.
function generateTaskID(){
    taskCount++;
    let taskID = "li" + taskCount;
    return taskID;
}

//This function displays the current todo list to screen.
function displayTodoList() {
    for(let i = 0; i < todoListArray.length; i++) {
        if(todoListArray[i].isListed == false){
            displayTodoListProcessFunction(todoListArray[i].taskID,todoListArray[i].taskName);
            todoListArray[i].isListed = true;
        }
    }
}

//I wrote this function as i do not want to write these codes in the for loop above.
function displayTodoListProcessFunction(taskID,inputValue){

    let listItem = createHtmlItem("li","",taskID,"","","");  
    listItem.appendChild(document.createTextNode(inputValue));

    let deleteButtonItem = createHtmlItem("button","","","","margin-left : 10px"); 
    deleteButtonItem.onclick = function() {
        itemToBeRemoved = document.getElementById(taskID);
        itemToBeRemoved.remove();
        updateTodoListAfterDelete(taskID);
        }
    deleteButtonItem.appendChild(document.createTextNode("Delete"));

    let markButtonItem = createHtmlItem("button","","","","margin-left : 10px"); 
    markButtonItem.onclick = function() {
        updateTodoListAfterMark(taskID);
    }
    markButtonItem.appendChild(document.createTextNode("Mark"));

    todoList.appendChild(listItem);
    listItem.appendChild(deleteButtonItem);
    listItem.appendChild(markButtonItem);
}

//This function updates the marked one as marked after page reload.
function updateMarkedItems() {
    for(let i = 0; i < todoListArray.length; i++) {
        if(todoListArray[i].isDone == true){
            itemToBeMarked = document.getElementById(todoListArray[i].taskID);
            itemToBeMarked.style = "text-decoration: line-through;"
        }
    }
}

//This function updates the todoListArray value which is a array that stores the todo tasks after deleting a todo task.
function updateTodoListAfterDelete(taskID){
    todoListArray = todoListArray.filter(function(item){
        return item.taskID != taskID;
    })
}

//This function updates the isDone value which is value you can take a look in TodoListItem class.
function updateTodoListAfterMark(taskID){
    itemToBeMarked = document.getElementById(taskID);
    for(let i = 0; i < todoListArray.length; i++) {
        if(todoListArray[i].taskID == taskID){
            if(todoListArray[i].isDone == false){
                todoListArray[i].isDone = true;
                itemToBeMarked.style = "text-decoration: line-through;"
            }
            else{
                todoListArray[i].isDone = false;
                itemToBeMarked.style = " ";
            }
        }
    }
}

//This function is responsible for creating new tasks and saving them to the todoListArray.
function saveToTodoList(){
    let taskID = generateTaskID()
    let inputValue = document.getElementById("todoInputValue").value;

    todoTask = new TodoListItem();
    todoTask.taskName = inputValue;
    todoTask.taskID = taskID;
    todoTask.isDone = false;
    todoTask.isListed = false;

    todoListArray.push(todoTask);
    displayTodoList();
}

//This function sets the isListed value of every single todo item to false as i list the unlisted ones only in the displayTodoList function.
//If i don't unlist all the tasks before saving the items, website will not list the items after closing and opening the page again.
function setAllTodoTasksUnlisted() {
    for(let i = 0; i < todoListArray.length; i++) {
        todoListArray[i].isListed = false;
    }
}

//This function saves task list and the task count value before closing the site.
window.onbeforeunload = function(){
    setAllTodoTasksUnlisted();
    localStorage.setItem("TODOLIST", JSON.stringify(todoListArray));
    localStorage.setItem("TASKCOUNT", JSON.stringify(taskCount));
}
