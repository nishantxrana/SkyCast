//change color theme
//get the theme from local storage
getTheme();

//color palette
const colors = [
  "hsl(345, 80%, 50%)",
  "#0D9276",
  "hsla(18, 18%, 55%, 1)",
  "hsl(227, 66%, 55%)",
  "hsl(26, 62%, 50%)",
  "hsl(44, 62%, 51%)",
  "hsl(280, 62%, 65%)",
  "hsl(200, 62%, 50%)",
  "hsl(180, 62%, 25%)",
];

const colorBtns = document.querySelectorAll(".theme-color");
const darkModeBtn = document.querySelector(".dark-mode-btn");

//change theme to dark
var isDark = false;
darkModeBtn.addEventListener("click", () => {
  if(!isDark) {
    changeTheme("#000");
    isDark = true;
  }else{
    changeTheme(colors[3]);
    isDark = false;
  }
});

//loop through colors array and set each color to a button
for (let i = 0; i < colorBtns.length; i++) {
  colorBtns[i].style.backgroundColor = colors[i];
}

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    changeTheme(btn.style.backgroundColor);
  });
});

function changeTheme(color) {
  document.documentElement.style.setProperty("--primary-color", color);
  saveTheme(color);
}

//get the theme from local storage
function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    changeTheme(theme);
  }
}

//save the theme to local storage
// after reloading theme remain same
function saveTheme(color) {
  localStorage.setItem("theme", color);
}

window.onload = function() {
  updateTime();
};




var cityName = "ropar";

var time = document.querySelector(".time");

function updateTime() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // Convert 0 to 12
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  time.innerHTML = h + " : " + m + " " + ampm;
  setTimeout(updateTime, 1000);
}