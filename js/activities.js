// ${name}'s activities
var activities = [ "code", "read", "play", "introvert", "otaku" ];

// get <h2 id="activities"> element
var textElement = document.getElementById('activities');

// get <h2 id="activities"> element inner content
var innerText = textElement.innerHTML;

// set <h2 id="activities"> element inner content
while (true){
	for(var i = 0;i<activities.length;i++){
		textElement.innerHTML = "and I like to "+activities[i];
	}
}