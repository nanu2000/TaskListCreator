<html>

  <head>

    <meta http-equiv="content-type" content="text/html; charset=UTF-8">

    <link rel="stylesheet" type="text/css" href="taskListStyling.css">

    <script type="text/javascript" src="taskList.js"></script>

    
  </head>


  <body>


    <div style = "text-align: center; margin:50px;"> 
      <h1>Task List Creator</h1>
      <h3>By Richie Sikra</h3>

      <a href = "https://github.com/nanu2000/TaskListCreator">Click here to view the source code on Github</a>
    </div>


    <hr>


    <div style = "margin: 0 auto; width: 75%; min-width: 800px;">

      <table id = "task-editor-table">

          <tbody id = "task-editor-group-parent" >

            <tr  class = "task-editor-group">

              <td class = "task-editor-item">

                <input placeholder = "name" id= "operators-name" ></input>

              </td>

              <td class = "task-editor-item">

                <button id = "create-new-task" >Add New Task</button>

              </td>

            </tr>

          </tbody>

      </table>

      <table id = "output-parent">

      </table>

    </div>

  </body>

</html>