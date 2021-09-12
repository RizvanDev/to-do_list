"use strict"

const addNewList = document.querySelector('.title__btn');

const write = document.querySelector('.write');
const input = document.querySelector('.input');
const text = document.querySelector('.text');
const reset = document.querySelector('.reset');
const clearText = document.querySelector('.clearText');

const toDoList = document.querySelector('.todo');

const creatList = document.querySelector('.save');
const showTips = document.querySelector('.showReference');

const reference = document.querySelector('.overlay');
const referenceClose = document.querySelector('.closeReference');


addNewList.addEventListener('click', openToDo);

function openToDo() {
   write.classList.toggle('open');
   addNewList.classList.toggle('rotate');
   creatList.classList.toggle('opacity');
   input.value = '';
   text.value = '';
};

reset.addEventListener('click', clearInput);
clearText.addEventListener('click', clearTxt);

function clearInput() {
   input.value = '';
};
function clearTxt() {
   text.value = '';
};

function Task(title, text) {
   this.title = title;
   this.text = text;
}

let cases;

if (localStorage.userData === undefined) {
   cases = [];
} else {
   cases = JSON.parse(localStorage.getItem('userData'));
}

function creatTemplate(cases) {
   return `
      <div class="list">
         <span class="list__title">${cases.title}</span>
         <p class="list__text">${cases.text}</p>
         <button type="button" class="view__details">details</button>
         <span class="clear"></span>
       </div>
   `
}
function searchToDo() {
   toDoList.innerHTML = '';
   if (0 < cases.length) {
      cases.forEach((item) => {
         toDoList.innerHTML += creatTemplate(item);
      })
   }
}
searchToDo();

creatList.addEventListener('click', () => {

   if (input.value === "") return false;

   cases.push(new Task(input.value, text.value));
   localStorage.setItem('userData', JSON.stringify(cases));

   toDoList.innerHTML = `
     <div class="list">
        <span class="list__title"></span>
        <p class="list__text"></p>
        <button type="button" class="view__details">details</button>
        <span class="clear"></span>
     </div>
   `

   searchToDo();
   dinamic();
   deleteToDo();

   input.value = '';
   text.value = '';
});

function dinamic() {
   const detailView = document.querySelectorAll('.view__details');
   const listText = document.querySelectorAll('.list__text');

   for (let i = 0; i < detailView.length; i++) {
      detailView[i].addEventListener('click', () => {
         detailView[i].classList.toggle('view');
         listText[i].classList.toggle('view');
      });
   }
}
dinamic();

function deleteToDo() {
   const deleteBtn = document.querySelectorAll('.clear');

   for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener('click', () => {
         deleteBtn[i].parentElement.remove();
         cases.splice(i, 1);
         localStorage.setItem('userData', JSON.stringify(cases));
      })
   }
}
deleteToDo();

showTips.addEventListener('click', openTips);
referenceClose.addEventListener('click', closeTips);

function openTips() {

   reference.style.visibility = 'visible';
   reference.style.opacity = '1';
   reference.style.transition = 'all 0.8s ease 0s';
   showTips.style.opacity = '1';

   window.scrollTo({
      top: 10000,
      behavior: "smooth",
   });

};

function closeTips() {

   reference.style.visibility = 'hidden';
   reference.style.opacity = '0';
   reference.style.transition = 'all  0s ease 0s';
   showTips.style.opacity = '0.7';

};


