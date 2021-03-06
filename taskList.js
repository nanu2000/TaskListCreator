///////////////////////////////
//CREATED BY RICHARD T. SIKRA//
///////////////////////////////

//TODO
//
//CLEAN UP getTaskListMarkup() FUNCTION
const VERTICAL_SPACING            = "</br>"


const TASK_OUTPUT_PARENT_ID       = "output-parent";


const EDITOR_PARENT_ID            = "task-editor-table";

const EDITOR_ENTER_NAME_ID        = "operators-name";
const EDITOR_ADD_NEW_TASK_ID      = "create-new-task";

const EDITOR_GROUP_PARENT_ID      = "task-editor-group-parent";
const EDITOR_GROUP                = "task-editor-group";
const EDITOR_OUTPUT_ITEM          = "task-editor-item";


const TASK_ITEM_BREAK_CLASS       = "task-break-row";


const OUTPUT_NAME_BASE_ID         = "task_name";
const OUTPUT_TIME_BASE_ID         = "task_time";
const OUTPUT_REMOVE_BASE_ID       = "task_remove";




var tasksInputs = [];
var currentIter = 0;

//&nbsp for indenting on pasted source (like email or notepad) by default tables dont have horizontal spacing, only padding
const SPACING_FOR_COPY_COMPATABILITY = "&nbsp"; 

function onLoad()
{
  document.getElementById(EDITOR_ADD_NEW_TASK_ID).onclick = addTask;
  document.getElementById(EDITOR_ENTER_NAME_ID).onkeyup   = update;

  document.getElementById(EDITOR_GROUP_PARENT_ID).appendChild(createVerticalSpaceElement(VERTICAL_SPACING));
}

window.onload = onLoad;



function TaskItem(taskid, taskinputid, tasktimeid, taskremoveid) 
{
    this.taskID       = taskid;
    this.taskInputID  = taskinputid;
		this.taskTimeID   = tasktimeid;
    this.taskRemoveID = taskremoveid;
}


function getHoursWithoutDecimal(mins)
{
  return  Math.floor(mins / 60);
}
function getModulusOfHoursInMins(hrs)
{
  return hrs % 60 ;
}

function isNumberNaN(num)
{
  return num !== num;
}


function getDate()
{

    var today = new Date();
    var dd    = today.getDate();
    var mm    = today.getMonth() + 1 ;
    var yyyy  = today.getFullYear();

    if(dd < 10)
    {
        dd='0'+dd
    } 

    if(mm < 10)
    {
        mm='0'+mm
    } 

    this.month  = mm;
    this.year   = yyyy;
    this.day    = dd;
}

function getTotalMinutesFromTasks()
{

  var totalMins = 0;

  for (i = 0; i < tasksInputs.length; i++) 
  {

    var time = parseInt(document.getElementById(tasksInputs[i].taskTimeID).value);

    if(isNumberNaN(time))
    {
        time = 0;
        continue;
    }

    totalMins += time;
  }

  return totalMins;

}

function getLongestStringFromTaskList(startingString)
{

  var longestVal = startingString;

  for (i = 0; i < tasksInputs.length; i++) 
  {
    var taskInput = (i + 1) + ". " + document.getElementById(tasksInputs[i].taskInputID).value;

    if(taskInput.length > longestVal.length)
    {
      longestVal = taskInput;
    }
  }

  return longestVal;

}


function getIndents(indents, strLength)
{
  return indents.substr(0, indents.length - ( strLength * SPACING_FOR_COPY_COMPATABILITY.length))
}


function createTaskOutputItem(desc, timeTaken)
{

    var task        = document.createElement("TR");
    var time        = document.createElement("TD");
    var description = document.createElement("TD");

    task.setAttribute("class", EDITOR_GROUP);
    description.setAttribute("class", EDITOR_OUTPUT_ITEM);
    time.setAttribute("class", EDITOR_OUTPUT_ITEM);

    description.innerHTML = desc;
    time.innerHTML        = timeTaken;

    task.appendChild(description);
    task.appendChild(time);

    return task;
}


function getTaskList()
{


  var newElements = [];


  var totalMins = getTotalMinutesFromTasks();

  var hours     =  getHoursWithoutDecimal(totalMins);
  var mins      =  getModulusOfHoursInMins(totalMins);

  var today = new getDate();

  var nameAndDate = document.getElementById(EDITOR_ENTER_NAME_ID).value;

  nameAndDate += "'s Task List ";
  nameAndDate += today.month;
  nameAndDate += "/";
  nameAndDate += today.day;
  nameAndDate += "/";
  nameAndDate += today.year;



  var longestVal = getLongestStringFromTaskList(nameAndDate);


  var indents = "";
  for (i = 0; i < longestVal.length; i++) 
  {
    indents += SPACING_FOR_COPY_COMPATABILITY; 
  }

  {
    var desc = "<b>" + nameAndDate + "</b>" +  getIndents(indents, nameAndDate.length - 1);
    var time = "<b>Total Time : </b> " + hours + "hrs " + mins + 'mins';

    var taskoutput = createTaskOutputItem(desc, time);
    
    newElements.push(taskoutput);
    newElements.push(createVerticalSpaceElement(VERTICAL_SPACING));
  }

  for (i = 0; i < tasksInputs.length; i++) 
  {
  
    var taskTime = parseInt(document.getElementById(tasksInputs[i].taskTimeID).value);

    if(isNumberNaN(taskTime))
    {
      taskTime = 0;
    }

    var taskInput = " " + document.getElementById(tasksInputs[i].taskInputID).value;
    
    var hour  =  getHoursWithoutDecimal(taskTime);
    var min   =  getModulusOfHoursInMins(taskTime);
    var numberStr = (i + 1) + ".";


    var desc = "<b>" + numberStr + "</b>" + taskInput + getIndents(indents, (numberStr + taskInput).length - 1);

    var time = hour + 'hrs ' + min + 'mins';

    var taskoutput = createTaskOutputItem(desc, time);

    newElements.push(taskoutput);

    newElements.push(createVerticalSpaceElement(VERTICAL_SPACING));

  }



  return newElements;

}


function update()
{

  var outputParent = document.getElementById(TASK_OUTPUT_PARENT_ID);

  outputParent.innerHTML = "";

  var newElements = getTaskList();

  for (var i = 0; i < newElements.length; i++) {
    outputParent.appendChild(newElements[i]);
  }
  

}



function removeTask(taskID, parentID)
{
  var parent  = document.getElementById(parentID);
  var child   = document.getElementById(taskID);

  parent.removeChild(child);
  
  for (i = 0; i < tasksInputs.length; i++) 
  {
  	if(tasksInputs[i].taskID === taskID)
    {
  		tasksInputs.splice(i, 1);
      break;
    }
  }	

	setInputPlaceholders();
  update();
}

function setInputPlaceholders()
{
  for (i = 0; i < tasksInputs.length; i++) 
  {
  	var x = document.getElementById(tasksInputs[i].taskInputID);
  	x.setAttribute("placeholder", "task #" +  (i + 1));
  }
}

function createNewInputElement(id, number)
{

    var newInputItem = document.createElement("INPUT");
    
    newInputItem.setAttribute("type", "text");
    newInputItem.setAttribute("id",  id);
    newInputItem.setAttribute("class",  "TaskItemInput");
    newInputItem.setAttribute("placeholder", "task #" + number);
    newInputItem.onkeyup = update;

    return newInputItem;
}

function createNewTimeElement(id)
{
  

    var newTimeItem = document.createElement("INPUT");
    
    newTimeItem.setAttribute("type", "number");
    newTimeItem.setAttribute("id", id);
    newTimeItem.setAttribute("class",  "TaskItemTime");
    newTimeItem.setAttribute("min", "1");
    newTimeItem.setAttribute("placeholder", "Time");

    newTimeItem.onclick = update;
    newTimeItem.onkeyup = update;

    return newTimeItem;
}

function createNewRemoveElement(id, taskID)
{
  
    var newRemoveItem = document.createElement("BUTTON");
    
    newRemoveItem.setAttribute("id", id);
    newRemoveItem.setAttribute("class",  "TaskRemoveItem");
    newRemoveItem.innerHTML = "Remove";

    newRemoveItem.onclick = function()
    {
      removeTask(taskID, EDITOR_PARENT_ID);
    }
    
    return newRemoveItem;

}


function createVerticalSpaceElement(vspace)
{

  var vSpace  = document.createElement("TR");
  var td      = document.createElement('TD');



  vSpace.setAttribute ("class",  TASK_ITEM_BREAK_CLASS);

  td.innerHTML = vspace;

  vSpace.appendChild(td);

  return vSpace;
}


function addTask()
{


  var newTask = new TaskItem("", "", "", "");

  newTask.taskID        = EDITOR_GROUP_PARENT_ID   + currentIter;
  newTask.taskInputID   = OUTPUT_NAME_BASE_ID  + currentIter;
  newTask.taskTimeID    = OUTPUT_TIME_BASE_ID   + currentIter;
  newTask.taskRemoveID  = OUTPUT_REMOVE_BASE_ID + currentIter;



  var newTaskItem = document.createElement("TBODY");
  var newTaskTR   = document.createElement("TR");

  newTaskItem.setAttribute  ("id",  newTask.taskID);
  newTaskTR.setAttribute    ("class",  EDITOR_GROUP);


  var inputItems = 
  [
    createNewInputElement (newTask.taskInputID, tasksInputs.length + 1), 
    createNewTimeElement  (newTask.taskTimeID), 
    createNewRemoveElement(newTask.taskRemoveID, newTask.taskID)
  ];




  document.getElementById(EDITOR_PARENT_ID).appendChild(newTaskItem);
  newTaskItem.appendChild(newTaskTR);


  for (var i = 0; i < inputItems.length; i++)
  {
    curTD = document.createElement('TD');

    curTD.setAttribute("class",  EDITOR_OUTPUT_ITEM);

    curTD.appendChild(inputItems[i]);

    newTaskTR.appendChild(curTD);
  }


  newTaskItem.appendChild(createVerticalSpaceElement(VERTICAL_SPACING));



  tasksInputs.push(newTask);

  currentIter++;

  update();
}
