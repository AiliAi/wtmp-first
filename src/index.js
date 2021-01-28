//1. Create a "game cheat code" like secret code feature,
//activated by typing secret password (record letter key presses in certain sequence).
//When a user types e.g. "hello", launch a response alert or something like that.
//(TIP: think about queue data structure)
const createCheatCode = (secretWord) => {
  const keyPresses = new Array(secretWord.length);
  document.addEventListener('keypress', event => {
    keyPresses.shift();
    keyPresses.push(event.key);
    console.log(keyPresses.join(''));
    if (keyPresses.join('').toLowerCase() === secretWord.toLowerCase()) {
      console.log('correct word', secretWord);
      alert('correct word - ' + secretWord);
    }
  });
};

createCheatCode('hello');
createCheatCode('moi');

//2.Create a function that shows the x and y coordinates of mouse double-clicks on the page
const displayMouseDoubleClickCoordinates = () => {
  const output = document.querySelector('.output');
  document.addEventListener('dblclick', event => {
    output.textContent = `Double clicked at x: ${event.clientX}, y: ${event.clientY}`;
    console.log('dbl click coords: ', event.clientX, event.clientY);
  });
};

displayMouseDoubleClickCoordinates();

//3.Create an element that reacts (e.g. console.log something) to touches but not clicks
const testReactToTouch = () => {
  const target = document.querySelector('.touch');
  const output = document.querySelector('.output');
  target.addEventListener('touchstart', event => {
    console.log('target touched', event);
    output.textContent = `Double clicked at x: ${event.targetTouches[0].clientX}, y: ${event.targetTouches[0].clientY}`;
  });
};

testReactToTouch();

//4.Create a timer that tells user to "hurry up" after 15 secs of browsing
//the notification should appear on the web page
const createTimer = (timeInSeconds) => {
  const output = document.querySelector('.output');
  setTimeout(() => {
    console.log('do something!');
    output.textContent = 'do something!';
  }, timeInSeconds * 1000);
};

//createTimer(5);

//5.Create a timer that tells user to "hurry up" after 15 secs of idling
//(= not doing anything: mouse hasn't been moving, keyboard keys haven't been pressed...)
//the notification should appear on the web page
const createInactivityTimer = (duration) => {
  const output = document.querySelector('.output');
  let timer;

  const resetTimer = event => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      output.textContent = 'do do something!';
      console.log('DO DO something!');
    }, duration * 1000);
  };
  resetTimer();
  document.addEventListener('mousemove', resetTimer);
  document.addEventListener('touchstart', resetTimer);
  document.addEventListener('keypress', resetTimer);
};

createInactivityTimer(5);



