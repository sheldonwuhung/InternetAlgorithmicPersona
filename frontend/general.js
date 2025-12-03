// const nav = document.getElementById("nav");
// const navHeight = nav.getBoundingClientRect().height;

const getStartedButton = document.getElementById("get-started-button");
const header2 = document.getElementById("first-scroll");

const navButtons = [getStartedButton];
const windowLocations = [header2];

function ChangeWindowLocation (index) {
    const location = windowLocations[index].getBoundingClientRect();
    let y = location.top + window.scrollY /*- navHeight*2*/;

    // if (index == 0) {y = 0};
    
    window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
};

navButtons.forEach((button, index) => {
    if (!button) return;
    button.addEventListener('click', () => ChangeWindowLocation(index));
});

