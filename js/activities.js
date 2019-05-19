// ${name}'s activities
var activities = [ "code", "read", "play", "introvert", "otaku" ];
var counter = 0;
var elem = document.getElementById("activities");
var inst = setInterval(change, 1000);

function change() {
  elem.innerHTML = text[counter];
  counter++;
  if (counter >= text.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}