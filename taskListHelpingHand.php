<?php


//Just a simple helping function that makes things look alot cleaner	
function echoWithParenthesis($val)
{

	echo('"' . $val . '"');

}

//Returns a string that contains the javascript (including <script tags>) that declares const global vars
//from the array given
function createJSConstGlobalVariablesFromArray($constGlobalArray)
{

	$outputJS = "";


	foreach ($constGlobalArray as $key => $value) 
	{
	  $outputJS .= 'const ' . $key . ' = "' . $value . '"; ' . "\n";
	}


	return '<script type="text/javascript">' . $outputJS . '</script>';

}


?>