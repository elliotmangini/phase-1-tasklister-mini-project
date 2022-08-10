document.addEventListener("DOMContentLoaded", () => {

  document.querySelector('#create-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    buildToDo(e.target['new-task-description'].value, document.querySelector('#emoji').value);
  });

  document.querySelector('#darkModeButton').addEventListener('click', (e) => {
    console.log('dark mode clicked');
    document.querySelector('body').style.background = 'linear-gradient(black, purple)';
  }); 
});

function buildToDo(toDoItem, emoji) {

  // Makes and sets text w/ appropriate color + attaches edit listener.
  if (toDoItem) {
    let p = document.createElement('p');
    p.textContent = `${toDoItem} `;
    if (document.querySelector('select').value === 'high') {
      p.style.color = 'red';
      p.className = 'high';
    } else {
      p.style.color = 'black';
      p.className = 'low';
    }
    p.addEventListener('click', editTask);


    // makes and sets 'x' button, attaches delete listener, replaces x if an emoji was entered.
    let btn = document.createElement('button');

    btn.textContent = 'x';
    if (/\p{Emoji}/u.test(document.querySelector('#emoji').value)) {
      btn.textContent = `${emoji}`;
    }

    btn.addEventListener('click', deleteItem);

    // appends button to task <p>
    p.appendChild(btn);

    // checks border between high and low priority items
    let redList = document.querySelectorAll('.high');
    let lastRedItem = redList[redList.length - 1];


    // handles placing item in the correct spot.
    if (redList.length === 0 || p.style.color === 'black') {
      document.querySelector('#tasks').appendChild(p);
    } else {
    lastRedItem.append(p);
    }

    // resets the form
    document.querySelector('form').reset();
  }

}

// deletes <p> if btn is clicked, doesn't propogate to p event.
function deleteItem(e) {
  e.stopPropagation();
  e.target.parentNode.remove();
}

// stores the editing state.
let editingState = false;

// handles the editing of items.
function editTask (e) {
  e.stopPropagation();

  if (editingState === true) {
    return;
  }

  editingState = true;

  console.log('edit start clicked');
  let editBox = document.createElement('form');
  let newInput = document.createElement('input');
  newInput.type = 'text'
  newInput.id = 'edit-task-description'
  newInput.name = 'new-task-description'
  // sets the placeholder of the edit box to the text WITHOUT the button text.
  newInput.placeholder = e.target.textContent.slice(0, e.target.textContent.length - e.target.childNodes[1].textContent.length);

  editBox.addEventListener ('submit', (f) => {
    f.preventDefault();
    f.stopPropagation();
    // console.log('edit form submitted');
    // console.log('the task reads ' + e.target.childNodes[0].textContent + ' before submission.');
    e.target.childNodes[0].textContent = (f.target[0].value + ' ');
    // console.log('im targeting the following...');
    // console.log(f.target[0]);
    // console.log('the value of it is ' + f.target.value);
    // console.log('the task reads ' + e.target.childNodes[0].textContent + ' after submission.');
    editingState = false;


    // gets rid of the editing field.
    editBox.remove();

  });


  // adds the input element to the form element, then appends those after the current item.
  editBox.appendChild(newInput);
  e.target.append(editBox);
}