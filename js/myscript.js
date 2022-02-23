// myscript for 03-AJAX01-Canada using AJAX
var countryName;
var background;
var pList = new Array();
var rowID;

class Prov {
	constructor (name, type, capital, flag, ...cities) {
		this.name = name; this.type = type;
		this.capital = capital; this.flag = flag;
		this.cities = cities;
	}
}

// document.ready statement
$(document).ready(function() {
	console.log("in doc ready");

	$.ajax({
		type: "GET", 
		url: "dataFiles/canada.json",
		dataType: "json",
		success: loadJSON,
		error: function (e) {alert(`${e.status} - ${e.statusText}`);}
	});//end of ajax call
	//http://username.dev.fast.sheridanc.on.ca/DataFiles/canada.json

	//when clicked backgroung area will be open and closed
  	$("#backHead").click(function() {
		$("#background").toggle();
	});

});//end of doc ready



// loadJSON function
function loadJSON(data) {
	console.log(data);
	countryName = data.country.name;
  background = data.country.background;


	//create province list
	for (let prov of data.country.division) {
		if (prov.type === 'province') {
			//console.log(prov.name);
			//create an array to keep the cities
			var cities = new Array();
			for (let city of prov.city) {
				cities.push(city);
			}//end of cities loop
			console.log(cities);

			pList.push(new Prov(prov.name, prov.type, prov.capital, prov.pic, cities));

		}//end of if
	}//end of for loop

	console.log(pList);
	//call the function sending json file
	mainScreen(data);

}
// mainScreen function
function mainScreen(data) {
	//display data on screen
	$("#country").html(`${countryName} / Provinces`);
	$("#background").html(background);
	$("#background").hide();

	//displaye the prov list
	$("provList").html("");
	for(let x=0; x < pList.length; x++) {
		$("#provList").append(
			`
				<li id='${x}'>
					<a href='otherPages/provPage.html'>
						${pList[x].name};
					</a>
				</li>
			`
		);
	}

}


// Save data to local storage
$(document).on("click", "#provList >li", function() {
	localStorage.setItem(
		"rowID",
		$(this).closest("li").attr("id")
	);
	localStorage.setItem("countryName", countryName);
	localStorage.setItem("pList", JSON.stringify(pList));	
});

