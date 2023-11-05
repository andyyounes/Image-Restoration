// JavaScript to toggle the menu
/*
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});
// JavaScript to toggle the menu
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.menu-icon');
    menu.classList.toggle('open'); // Toggle the animation class
    menuIcon.classList.toggle('open');
}
*/
function toggleNav() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.getElementById("main");
    const openbtn = document.querySelector(".openbtn");
  
    if (sidebar.style.width === "250px") {
      closeNav();
    } else {
      openNav();
    }
}
  
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.querySelector(".openbtn").classList.add("change");
}
  
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.querySelector(".openbtn").classList.remove("change");
}