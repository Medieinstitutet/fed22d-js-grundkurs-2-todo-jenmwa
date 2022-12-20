import './style/style.scss';
/************************************************************************************************************
 * -------------------------------------------  Variables  -------------------------------------------------
 ************************************************************************************************************/

let taskList = [];

const tasks = document.querySelector('.tasks'); // the tasks <ul> element

const newTaskInput = document.querySelector('#inputTaskField'); //task inputField
const deadlineInput = document.querySelector('#deadlineInput'); //deadline inputfield
const submitBtn = document.querySelector('#submit'); //submitBtn
const sortSection = document.querySelector('#sortSection'); //sortSection

const taskError = document.querySelector('#taskError');

// skriva ut dagens datum på listan enligt sv.datum
const todaysDate = new Date();
const dateField = document.querySelector('#todaysDate');
dateField.innerHTML = todaysDate.toLocaleDateString();

/************************************************************************************************************
 * -------------------------------------------  Functions  -------------------------------------------------
 ************************************************************************************************************/

getFromLocalStorage();

// funktion lägg till ny todo som objekt till array
function addNewTask() {  
  if (newTaskInput.value.length === 0 || deadlineInput.value === '') {
    taskError.innerHTML = 'Fyll i Todo & deadline!';
    return;
  }
  
  else if (newTaskInput.value.length >= 2 && deadlineInput != '') {
    console.log(taskList.indexOf);

    taskError.innerHTML = '';
    const selectedCategory = document.querySelector("input[name='category']:checked").value;

    let todoInput = {
      task: newTaskInput.value,
      deadline: deadlineInput.value,
      addedDate: todaysDate.toString(),
      category: selectedCategory,
      isComplete: false, // avbockade tasks ska längst ner i listan men fortfarande synas i listan
    };
    taskList.push(todoInput);
    addToLocalStorage(taskList);
    newTaskInput.value = '';
    deadlineInput.value = '';
  }
}

// funktion skriv ut vår lista med todo's
function printTaskList(taskList) {
  tasks.innerHTML = '';

  for (let i = 0; i < taskList.length; i++) {
    const checkBox = taskList[i].isComplete ? 'checked' : ''; //som en förenklad if-sats (if taskList[i].isComplete == true, lägger till checked, if else - '') 
    tasks.innerHTML += `
        <li data-id="${i}"> <div class="licontainer">
        <input type="checkbox" ${checkBox} name="checkbox" class="checkbox"data-id="${i}">
        <span class="text" id="texttodo">${taskList[i].task}</span><br>
        <span class="text"> ${taskList[i].deadline}</span></div><div class="rightsection">
        <span class="material-symbols-outlined category">${taskList[i].category}</span>
        <button class="material-symbols-outlined" data-id="${i}">close</button>
        </div>
        </li>`;
  }
  console.log(taskList)
  showsortSection();

  //klick-event för tabort-knappen som anropar funktion removeTask
  const taskItems = Array.from(document.querySelectorAll('.tasks button'));
  taskItems.forEach(item => {
    item.addEventListener('click', removeTask);
  });

  //klick-event för checkbox-knappen som anropar funktion checkedBox
  const checkBtn = Array.from(document.querySelectorAll('.tasks input'));
  checkBtn.forEach(check => {
    check.addEventListener('change', todoChecked);
  });
}
 // NEDAN - work In progress!

/** TODO
 * FIXA checkbox checkad i LocalStorage
 * checkbox checkad längst NER i listan! (sortera true/false isComplete)
 * 
 * 
 * FIXA remove all knapp + funktion
 */
// //
 
//funktion när todo är checked, gråa ut text
function todoChecked(event) {
  if (event.target.checked) {
    console.log('The checkbox is checked');
    event.currentTarget.parentElement.classList.add('colorchange');
  } else {
    console.log('The checkbox is not checked');
    event.currentTarget.parentElement.classList.remove('colorchange');
  }
}

// funktion visa sorteringsalternativ OM det är 2 eller fler todo's på listan
function showsortSection() { 
  if (taskList.length <= 1) {
    sortSection.classList.remove('open');
  }
  if (taskList.length >= 2) {
    sortSection.classList.add('open');
  }
}

//funktion ta bort tasks per task, aktiveras av eventlyssnare på X-knapp i funktionen printTaskList
function removeTask(e) {
  const index = e.currentTarget.dataset.id;
  if (index > -1) {
    taskList.splice(index, 1);
    printTaskList(taskList);
  }
  addToLocalStorage(taskList);
}

/***** sorteraSektion OBS NÄR ALLT FÖR G ÄR KLART - REFAKTORERA KODEN! *****/
// se Aritmetik v3 14 modul

let isDateSort = true;
let isNameSort = true;
let isDeadlineSort = true;

const SortByDateBtn = document.querySelector('#sortByDateBtn');
const sortByNameBtn = document.querySelector('#sortByNameBtn');
const sortByDeadlineBtn = document.querySelector('#sortByDeadlineBtn');

function sortByDate(eve) {
  console.log('clicketi');
  console.log(taskList);
  eve.preventDefault();
  if (isDateSort) {
    taskList.sort((a, b) => a.addedDate.localeCompare(b.addedDate));
    isDateSort = false;
  } else if (isDateSort === false) {
    taskList.sort((a, b) => b.addedDate.localeCompare(a.addedDate));
    isDateSort = true;
  }
  printTaskList(taskList);
  addToLocalStorage(taskList);
}

// Sortera per namn
function sortByName(ev) {
  console.log(taskList);
  ev.preventDefault();
  if (isNameSort) {
    taskList.sort((a, b) => a.task.localeCompare(b.task));
    isNameSort = false;
  } else if (isNameSort === false) {
    taskList.sort((a, b) => b.task.localeCompare(a.task));
    isNameSort = true;
  }
  printTaskList(taskList);
  addToLocalStorage(taskList);
  console.log('klick'); //GLÖM EJ add to Local Storage!
}

// Sortera per inlagt datum
function sortByDeadline(event) {
  console.log('clicketiclick');
  console.log(taskList);
  event.preventDefault();
  if (isDeadlineSort) {
    taskList.sort((a, b) => b.deadline.localeCompare(a.deadline));
    isDeadlineSort = false;
  } else if (isDeadlineSort === false) {
    taskList.sort((a, b) => a.deadline.localeCompare(b.deadline));
    isDeadlineSort = true;
  }
  printTaskList(taskList);
  addToLocalStorage(taskList);

}

// Sortera per inlagt datum
function sortByComplete() {
  console.log('clickt');
  console.log(taskList);
}

SortByDateBtn.addEventListener('click', sortByDate);
sortByNameBtn.addEventListener('click', sortByName);
sortByDeadlineBtn.addEventListener('click', sortByDeadline);


/***** LOCALSTORAGE FUNKTIONER - SET & GET *****/
// Funktion lägg till vår lista m objekt i localStorage som string
function addToLocalStorage(taskList) {
  localStorage.setItem('taskList', JSON.stringify(taskList));
  printTaskList(taskList);
}

// Funktion hämta det vi lagt till i localStorage,  konverterar tillbaka till lista & läggs i vår taskList -lista
function getFromLocalStorage() {
  const getStoredArray = localStorage.getItem('taskList');
  if (getStoredArray) {
    taskList = JSON.parse(getStoredArray);
    printTaskList(taskList);
  }
}


//localStorage.clear(); rensa localstorage.

/************************************************************************************************************
 * ----------------------------------------  Eventlisteners -------------------------------------------------
 ************************************************************************************************************/

// eventlyssnare klick på submit aktivera funktion addNewTask
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  addNewTask();
});