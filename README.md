# TaskListCreator
## Just a simple 2 day project built with Vanilla Javascript and PHP.

The code for this project is fairly decent, I cannot say it's the best quality, but I do plan to refactor some of it.
 
### The most complicated part of this project was to make it copy and pastable without losing horizontal or vertical alignment. 

So if you create a new task list and then copy and paste it into a txt editor the proportions should look very similar, if not the same.

I used a simple formula to keep the horizontal spacing accurate.


First, I take the length of the largest string in the task list and count how many characters are in it (lets call this variable X).

Second, for every task in the list I subtract the amount of characters the task has from the amount of characters in the largest string.

Finaly, the end result is the amount of horizontal spaces that need to be added to the current task string to keep horizontal alignment on copy and paste.



### Here is some mockup code that describes the solution I used for making the task list copy and pastable without losing horizontal alignment.


    const H_SPACE = "&nbsp";

    var longestStr = findLongestStrInTaskList();

    replaceEachCharInString(longestStr, H_SPACE);

    foreach task in list
    {
        //Since H_SPACE may be more than one char (which it is) we need to divide length by the size of it.
        var result = (longestStr.length / H_SPACE.length) - task.string.length;
  
        //Append the Horizontal spaces
        task.string += longestStr.substring(0, result);
    }
