// myscript for 03-AJAX-01-Canada using AJAX for individual pagevar countryName;
var pList = new Array();
var rowID;
var cList = new Array();
var countryName;

$(document).ready(function() {
	// get local storage values
	countryName = localStorage.getItem("countryName");
	rowID = localStorage.getItem("rowID");
	pList	= JSON.parse(localStorage.getItem("pList"));

	$("#country").html(countryName);
	$("#pname").html(pList[rowID].name);
	$("#capital").html(pList[rowID].capital);
	$("#flag").html(
		`<img src='../images/${pList[rowID].flag}' width='100'>`
	);

	$("#cities").html("Major cities: <br>");
	$("#cities").css("text-align", "left");

	console.log(pList[rowID].cities);

	// for (let x=0; x < pList[rowID].cities[0].length; x++) {
	// 	$("#cities").append(` - ${pList[rowID].cities[0][x]}<br>`);
	// }

	for (let city of pList[rowID].cities[0]) {
		$("#cities").append(`- ${city}<br>`)
	}

});

