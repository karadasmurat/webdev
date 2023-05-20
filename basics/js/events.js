/*
Events are fired to notify code of "interesting changes" that may affect code execution.
These can arise from user interactions such as using a mouse or resizing a window, 
changes in the state of the underlying environment (e.g.low battery or media events from the operating system), 
and other causes.

 -The keydown/keyup event is fired when a key is pressed/released.
 -The drag event is fired every few hundred milliseconds as an element or text selection is being dragged by the user.
 -An element receives a click event when a pointing device button(such as a mouse 's primary mouse button) is both pressed and released while the pointer is located inside the element.
 -The focus event fires when an element has received focus.
 -The change event is fired for < input > , < select > , and < textarea > elements when the user modifies the element 's value. 
  Note that Unlike the input event, the change event is not necessarily fired for each alteration to an element 's value (i.e. not fired in realtime keyups, but after click outside the input:text)
 -The input event fires when the value of an < input > , < select > , or < textarea > element has been changed.

 // Both the input and keyup events can be used to handle changes to an input text field. 
 // However, there are some differences between them that may affect your choice. 
 // The input event fires whenever the value of an input element changes, regardless of how that change occurred(typing, copy - pasting, etc.).
 // This event is more appropriate if you want to detect any change to the input field, including changes made by the user with the mouse or keyboard.

The addEventListener() method is the recommended way to register an event listener.
The method addEventListener() works by adding a function, or an object that implements EventListener, 
to the list of event listeners for the specified event type on the EventTarget on which it 's called. 

The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.
Common targets are Element, or its children, Document, and Window, but the target may be any object that supports events(such as XMLHttpRequest).

    addEventListener(type, listener)
        type: A case-sensitive string representing the "event type" to listen for.

*/

function btnclick(event) {
    alert(event.pointerType);
}

const btn2 = document.querySelector("#btn2");
// const btn2 = document.getElementById("btn2");
btn2.onclick = btnclick;

const btn3 = document.querySelector("#btn3");
btn3.addEventListener('click', btnclick);


const loginput = document.getElementById("loginput");
const log = document.getElementById("values");

loginput.addEventListener("input", updateValue);

function updateValue(e) {
    log.textContent = e.target.value;
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


const btnBgcolor = document.getElementById("btnBgcolor");
//random background color
btnBgcolor.addEventListener('click', (event) => {
    const _color = getRandomColor();
    document.body.style.backgroundColor = _color;
    document.getElementById("colorcode").innerText = _color;
});


const btnGreen = document.getElementById("btnGreen");

//change green shade on each click
btnGreen.addEventListener('click', (event) => {
    let currentGreen = parseInt(document.getElementById("currentGreenVal").innerText);
    let newGreen = isNaN(currentGreen) ? 0 : 10 + currentGreen;
    newGreen = (newGreen > 255) ? 0 : newGreen;
    document.getElementById("currentGreenVal").innerText = newGreen
    btnGreen.style.backgroundColor = `rgb(0, ${newGreen}, 0)`;
});

// Both the input and keyup events can be used to handle changes to an input text field. 
// However, there are some differences between them that may affect your choice. 
// The input event fires whenever the value of an input element changes, regardless of how that change occurred(typing, copy - pasting, etc.).
// This event is more appropriate if you want to detect any change to the input field, including changes made by the user with the mouse or keyboard.
const keyInputLogSpan = document.getElementById("keyInputLog");
document.getElementById("keyInput").addEventListener('input', function (event) {
    const value = event.target.value;
    // keyInputLogSpan.appendChild(document.createTextNode(value + "<br>"));
    keyInputLogSpan.innerHTML += value + "<br>";
});

// Example
// Whenever an input event is fired on the <input> element, update the <h1> so that it displays "Welcome, " plus the current value from the text input.
// If the < input > goes back to being empty, update the < h1 > so that it once again says "Enter Your Username"

const usernameH1 = document.getElementById("usernameH1");
const usernameInput = document.getElementById("username");

usernameInput.addEventListener('input', (event) => {
    let username = event.target.value;

    // note that empty string is falsy
    usernameH1.innerText = username ? "Welcome, " + username : "Enter Your Username";
});


const form = document.querySelector('form');
const product = document.getElementById('product');
const qty = document.getElementById('qty');
const groceriesList = document.getElementById('list');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("default prevented!");
    const li = document.createElement('li');
    li.innerText = qty.value + " " + product.value;
    groceriesList.appendChild(li);

    //reset inputs
    qty.value = "";
    product.value = "";
});