"use strict"

const input = document.querySelector('.input');
const text = document.querySelector('.text');
const toDoList = document.querySelector('.todo');
const reset = document.querySelector('.reset');
const clearText = document.querySelector('.clearText');
const creatList = document.querySelector('.save');
const showTips = document.querySelector('.showReference');
const reference = document.querySelector('.overlay');
const referenceClose = document.querySelector('.closeReference');
const addNewList = document.querySelector('.title__btn');
const write = document.querySelector('.write');

addNewList.addEventListener('click', openToDo);

function openToDo() {
   write.classList.toggle('open');
   addNewList.classList.toggle('rotate');
   creatList.classList.toggle('opacity');
};

reset.addEventListener('click', clearInput);
clearText.addEventListener('click', clearTxt);

function clearInput() {
   input.value = '';
};
function clearTxt() {
   text.value = '';
};

creatList.addEventListener('click', creatNewList);

function creatNewList() {

   if (input.value === '') return false;

   const newList = document.createElement('li');
   const newListTitle = document.createElement('span');
   const newListText = document.createElement('p');
   const newListDetails = document.createElement('button');
   const clear = document.createElement('span');

   newList.classList.add('list');
   newListTitle.classList.add('list-title');
   newListText.classList.add('list-text');
   newListDetails.classList.add('view-details');
   clear.classList.add('clear');

   newListTitle.innerHTML = input.value;
   newListText.innerHTML = text.value;
   newListDetails.innerHTML = 'details';

   newList.append(newListTitle);
   newList.append(newListText);
   newList.append(newListDetails);
   newList.append(clear);

   toDoList.append(newList);

   input.value = '';
   text.value = '';


   newListDetails.addEventListener('click', () => {
      newListDetails.classList.toggle('view');
      newListText.classList.toggle('view');
   });

   clear.addEventListener('click', () => {
      clear.parentElement.remove();
   });

}


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

const windowScrollTop = window.pageYOffset;

console.log(windowScrollTop);