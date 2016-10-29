<?php

  include_once ('taskListHelpingHand.php');
  

  //Globals that will be turned into js const variables

  $constGlobalArray = array
  (
    "VERTICAL_SPACING"            => "<br>",
    "TASK_ITEM_CLASS"             => "TaskTR",
    "TASK_WRAPPER_CLASS"          => "TaskTD",
    "TASK_ITEM_BREAK_CLASS"       => "breakTD",

    "TASK_ENTER_NAME_ID"          => "personsName",
    "TASK_ADD_NEW_TASK_ID"        => "addNewTask",

    "TASK_ITEM_START_NAME"        => "myText",

    "TASK_INPUT_START_NAME"       => "Task",
    "TASK_INPUT_TIME_NAME"        => "TaskTime",
    "TASK_INPUT_REMOVE_NAME"      => "TaskRemove",

    "TASK_PARENT_ID"              => "List",
    "TASK_LIST_OUTPUT_PARENT_ID"  => "TextTaskList"
  );

?>

<html>

  <head>

    <meta http-equiv="content-type" content="text/html; charset=UTF-8">

    <link rel="stylesheet" type="text/css" href="taskListStyling.css">

    <?php 

      //Create the const variables in JS
      echo createJSConstGlobalVariablesFromArray($constGlobalArray); 

    ?>

    <script type="text/javascript" src="taskList.js"></script>

    
  </head>


  <body>


    <div style = "text-align: center; margin:50px;"> 
      <h1>Task List Creator</h1>
      <h3>By Richie Sikra</h3>
    </div>


    <hr>


    <div style = "margin: 0 auto; width: 75%; min-width: 800px;">

      <table id = "TaskEditorTable">

        <tbody id = <?php echoWithParenthesis($constGlobalArray["TASK_PARENT_ID"]); ?>>

          <div id = <?php echoWithParenthesis($constGlobalArray["TASK_ITEM_START_NAME"]); ?>>

            <tr  class = <?php echoWithParenthesis($constGlobalArray["TASK_ITEM_CLASS"]); ?>>

              <td class = <?php echoWithParenthesis($constGlobalArray["TASK_WRAPPER_CLASS"]); ?>>

                <input placeholder = "name" id= <?php echoWithParenthesis($constGlobalArray["TASK_ENTER_NAME_ID"]); ?> ></input>

                <button id = <?php echoWithParenthesis($constGlobalArray["TASK_ADD_NEW_TASK_ID"]); ?> >Add New Task</button>

              </td>
            </tr>

            <tr class = <?php echoWithParenthesis($constGlobalArray["TASK_ITEM_CLASS"]); ?>>
              <td class = <?php echoWithParenthesis($constGlobalArray["TASK_ITEM_BREAK_CLASS"]); ?>>
                <?php echo $constGlobalArray["VERTICAL_SPACING"]; ?>
              </td>
            </tr>

          </div>

        </tbody>

      </table>


      <table id =  <?php echoWithParenthesis($constGlobalArray["TASK_LIST_OUTPUT_PARENT_ID"]); ?> >

      </table>

    </div>

  </body>

</html>