let todoListArray = []

function TodoListItem() {
    let isDone = false;
    let isListed = false;
    let taskName = "";
    let taskID = "";
}

function createHtmlItem(elementType,type,id,name,style){
    let newElement = document.createElement(elementType);
    
    newElement.type = type;
    newElement.id = id;
    newElement.name = name;
    newElement.style = style;

    return newElement;
}

let taskCount = 0;

function generateTaskID(){
    taskCount++;
    let taskID = "li" + taskCount;
    return taskID;
}

function displayTodoList() {
    for(let i = 0; i < todoListArray.length; i++) {
        if(todoListArray[i].isListed == false){
            displayTodoListProcessFunction(todoListArray[i].taskID,todoListArray[i].taskName);
            todoListArray[i].isListed = true;
        }
    }
}

function updateTodoListAfterDelete(taskID){
    todoListArray = todoListArray.filter(function(item){
        return item.taskID != taskID;
    })
}

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
