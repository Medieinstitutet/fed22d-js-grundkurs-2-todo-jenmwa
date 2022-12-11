import './style/style.scss';

let taskList = [];
// taskList.push(input);

const tasks = document.querySelector('.tasks'); // the <ul> element
const newTaskInput = document.querySelector('#inputTaskField'); //task inputField
const deadlineInput = document.querySelector('#deadlineInput'); //deadline inputfield
const submitBtn = document.querySelector('#submit'); //submitBtn

//printTaskList()

// skriva ut dagens datum på listan enligt sv.tid
const todaysDate = new Date();
const dateField = document.querySelector('#todaysDate');
dateField.innerHTML = todaysDate.toLocaleDateString();

// kategoridelen
let category = document.querySelectorAll('.categories span');

category.forEach( (cat) => { 
       cat.addEventListener('click', () => { 
             console.log(cat.textContent)
         })
});

// funktion lägg till ny todo som objekt till array
function addNewTask() {
    if (newTaskInput.value.length === 0) {
        return;
    }
    if (taskList.indexOf(newTaskInput.value) === -1) { // GÖR OM, nu kan du lägga till samma sak flera
        const input = {
            task: newTaskInput.value,
            deadline: deadlineInput.value,
            addedDate: todaysDate,
            category: '', //hur får jag in vald knapps id till
            isComplete: false, // avbockade tasks ska längst ner i listan men fortfarande synas i listan
          };
        taskList.push(input);
        addToLocalStorage(taskList);
        newTaskInput.value = '';
        deadlineInput.value = '';
  }
}
console.log(taskList);

// funktion skriv ut vår lista med todo's
function printTaskList(taskList) {
    tasks.innerHTML='';
    
    for (let i = 0; i < taskList.length; i++) {
        tasks.innerHTML += `
        <li>
        <input type="checkbox" class="checkbox">
        ${taskList[i].task}<br>
        ${taskList[i].deadline}
        <span class="material-symbols-outlined" id="favorite">${taskList[i].category}</span>
        <button class="material-symbols-outlined" data-id="${i}">close</button>
        </li>`;
    }

    const taskItems = Array.from(document.querySelectorAll('.tasks button'));
    taskItems.forEach((item) => {
        item.addEventListener('click', removeTask)
    });
}

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

getFromLocalStorage();

//funktion ta bort tasks per task, aktiveras av eventlyssnare på X-knapp i funktionen printTaskList
function removeTask(e) {
    const index = e.currentTarget.dataset.id; 
    if (index > -1) {
        taskList.splice(index, 1);
        printTaskList(taskList);
    }
 }

 /**
  * EVENTLISTENERS
  */

// eventlyssnare klick på submit aktivera funktion addNewTask
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addNewTask();
    });

// const userTask = {
//     task: 'input value',
//     date: 'dagens datum',
//     deadline: 'deadline',
//     category: 'kategori',
//   };

//   const pizzas = ['Margarita', 'four Cheese', 'hawaii'];
//   localStorage.setItem('pizzas', pizzas);

//   localStorage.setItem('userTask', JSON.stringify(userTask));

//   console.log(JSON.parse(localStorage.getItem('userTask')).task);
//   console.log(localStorage.getItem('pizzas').split(','));

  //localStorage.clear(); rensa localstorage.