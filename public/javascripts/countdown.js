const countdownElements = [
    { container: document.querySelector('#days-container'), screen: null },
    { container: document.querySelector('#hours-container'), screen: null },
    { container: document.querySelector('#minutes-container'), screen: null },
    { container: document.querySelector('#seconds-container'), screen: null }
];

countdownElements.forEach(element => {
    element.screen = element.container.querySelector('.data');
});

const marriage = new Date(2024, 7, 10, 18, 0, 0);

function updateCountdown() {
    const now = new Date().getTime();
    const difference = marriage - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElements[0].screen.innerText = days;
    countdownElements[1].screen.innerText = hours;
    countdownElements[2].screen.innerText = minutes;
    countdownElements[3].screen.innerText = seconds;
}

window.addEventListener('load', () => {
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
});