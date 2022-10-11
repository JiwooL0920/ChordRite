// Chris Coyier (Oct 14, 2019)
// https://css-tricks.com/stop-animations-during-window-resizing/
// [ Stop animation while resizing window ]
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});


// Dev Ed (2018)
// https://www.youtube.com/watch?v=gXkqy0b4M5g&ab_channel=DevEd
// [ Change navigation bar to an icon when window size is less than certain width]
const navSlide = () => {
    const navIcon = document.querySelector('.nav-icon');
    const nav = document.querySelector('.nav-links');

    navIcon.addEventListener('click', ()=> {
        // toggle navigation 
        nav.classList.toggle('nav-active');
        // nav icon animation 
        navIcon.classList.toggle('toggle');
    });
}

navSlide();
