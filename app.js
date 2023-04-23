//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.querySelector(".add-item__button");//button; changed for precise element definition
var incompleteTaskHolder=document.getElementById("incomp-tasks");//ul of #incomp-tasks
var completedTasksHolder=document.getElementById("compl-tasks");//compl-tasks

//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
  //label
  var label=document.createElement("label");//label
  //input (text)
  var editInput=document.createElement("input");//text
  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  listItem.className="task-item";

  label.innerText=taskString;
  label.className="task-item__label";

  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className="task-item__checkbox input";
  editInput.type="text";
  editInput.className="task-item__input input input-text";
  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="task-item__button button button_type_edit";
  deleteButton.className="task-item__button button button_type_delete";
  deleteButtonImg.className="task-item__button-img";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.alt="delete button";
  deleteButton.append(deleteButtonImg);

  //and appending.
  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}

var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem=this.parentNode;

  var editInput=listItem.querySelector(".input-text");
  var label=listItem.querySelector(".task-item__label");
  var editBtn=listItem.querySelector(".task-item__button");
  var containsClass=listItem.classList.contains("task-item_edit");
  //If class of the parent is .edit-mode
  if(containsClass){

    //switch to .task-item_edit
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  //toggle .task-item_edit on the parent.
  listItem.classList.toggle("task-item_edit");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  this.parentNode.remove();//remove task list item
}

//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

  //Append the task list item to the #compl-tasks
  var listItem=this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomp-tasks.
  var listItem=this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector(".task-item__checkbox");
  var editButton=taskListItem.querySelector(".button_type_edit");
  var deleteButton=taskListItem.querySelector(".button_type_delete");

  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.