// ${name}'s activities
var activities = [ "code", "read", "play", "introvert", "otaku", "google things", "drink coffee", "nap" ];
var counter = 0;
var elem = document.getElementById("activities");
var inst = setInterval(change, 2000);

function change() {
  elem.innerHTML = activities[counter];
  elem.style.backgroundColor = "#D3D3D3";
  counter++;
  if (counter >= activities.length) {
    counter = 0;
    // clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
  }
}