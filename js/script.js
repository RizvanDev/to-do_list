"use strict"

const timeNow = document.getElementById('time');
const addImg = document.getElementById('add-img');
const img = document.getElementById('avatar-out');
const addImgBtn = document.querySelector('.avatar__item');

const write = document.querySelector('.write');
const input = document.querySelector('.input');
const text = document.querySelector('.text');
const reset = document.querySelector('.reset');
const clearText = document.querySelector('.clearText');

const toDoList = document.querySelector('.todo');

const creatList = document.querySelector('.save');
const showTips = document.querySelector('.showReference');
const addNewList = document.querySelector('.plus__btn');

const reference = document.querySelector('.overlay');
const referenceClose = document.querySelector('.closeReference');


// date/time
setInterval(function () {
   timeNow.innerHTML = dateTime()
}, 100);

function dateTime() {

   let currentTime = new Date();
   let year = currentTime.getFullYear();

   let month = currentTime.getMonth();
   if (month <= 9) month = '0' + month;

   let day = currentTime.getDate();
   if (day <= 9) day = '0' + day;

   let hours = currentTime.getHours();
   if (hours <= 9) hours = '0' + hours;

   let minute = currentTime.getMinutes();
   if (minute <= 9) minute = '0' + minute;

   let seconds = currentTime.getSeconds();
   if (seconds <= 9) seconds = '0' + seconds;

   return year + '.' + month + '.' + day + '  ' + hours + '.' + minute + '.' + seconds;
}

// image in localstorage
addImg.addEventListener('change', () => {
   uploadFile(addImg.files[0]);
});

function uploadFile(file) {

   if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('select only the following formats:.jpg, .png');
      addImg.value = '';
      return;
   }


   let reader = new FileReader();
   reader.onload = function (e) {
      img.innerHTML = `<img src="${e.target.result}" alt="avatar">`;
   }
   reader.addEventListener('load', () => {
      localStorage.setItem('userImgData', reader.result);
   })

   addImgBtn.style.opacity = '0.4';

   reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', () => {
   let resentUserImg = localStorage.getItem('userImgData');
   if (resentUserImg) {
      img.innerHTML = `<img src="${resentUserImg}" alt="avatar">`;
      addImgBtn.style.opacity = '0.4';
   }
});

// add new list button
addNewList.addEventListener('click', () => {

   write.classList.toggle('open');
   creatList.classList.toggle('active');
   addNewList.classList.toggle('rotate');
   input.value = '';
   text.value = '';

});

// clear fields value
reset.addEventListener('click', () => {
   input.value = '';
});
clearText.addEventListener('click', () => {
   text.value = '';
});

// creat new task and save in localstorage
function Task(title, text, complete) {
   this.title = title;
   this.text = text;
   this.complete = false;
}

let cases;

if (localStorage.userData === undefined) {
   cases = [];
} else {
   cases = JSON.parse(localStorage.getItem('userData'));
}

function creatTemplate(cases, index) {
   return `
      <div class="list ${cases.complete == true ? 'checked' : ''} ">
         <span class="default-check"></span > 
         <label class="my-check list__title">${cases.title}</label>
         <textarea class="list__text" readonly>${cases.text}</textarea>
         <button  type="button" class="view__details">details</button>
         <span onclick="deleteTask(${index})" class="clear"></span>
       </div >
      `
}
function searchToDo() {
   toDoList.innerHTML = '';
   if (0 < cases.length) {
      sortedTasks();
      cases.forEach((item, index) => {
         toDoList.innerHTML += creatTemplate(item, index);
      })
   }
}
searchToDo();

creatList.addEventListener('click', () => {

   if (input.value == "") return false;

   cases.push(new Task(input.value, text.value));
   localStorage.setItem('userData', JSON.stringify(cases));

   searchToDo();
   followText();
   completeTask();
   dinamic();

   input.value = '';
   text.value = '';
});

// if there is no text in the details field, the details button is hidden
function followText() {
   const list = document.querySelectorAll('.list');
   const viewDetails = document.querySelectorAll('.view__details');
   const txt = document.querySelectorAll('.list__text');

   for (let i = 0; i < list.length; i++) {
      if (txt[i].value == '') {
         viewDetails[i].style.display = 'none';
      }
   }
}
followText();

// delete task and save in local storage
function deleteTask(index) {
   cases.splice(index, 1);
   localStorage.setItem('userData', JSON.stringify(cases));
   searchToDo();
   followText();
}

// complete task
function completeTask() {

   const checkbox = document.querySelectorAll('.default-check');
   const checkboxLabel = document.querySelectorAll('.list__title');
   const task = document.querySelectorAll('.list');

   for (let i = 0; i < checkboxLabel.length; i++) {

      checkboxLabel[i].addEventListener('click', () => {
         task[i].classList.toggle('checked');
         cases[i].complete = !cases[i].complete;
         localStorage.setItem('userData', JSON.stringify(cases));
      })
      checkbox[i].addEventListener('click', () => {
         task[i].classList.toggle('checked');
         cases[i].complete = !cases[i].complete;
         localStorage.setItem('userData', JSON.stringify(cases));
      })
   }
}
completeTask();

// filtered tasks
function sortedTasks() {

   const active = cases.filter(item => item.complete == false);
   const closed = cases.filter(item => item.complete == true);
   cases = [...active, ...closed];
}

// add classes for tasks buttons
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

// open and close help desk
showTips.addEventListener('click', () => {
   reference.style.visibility = 'visible';
   reference.style.opacity = '1';
   reference.style.transition = 'all 0.8s ease 0s';

   window.scrollTo({
      top: 10000,
      behavior: "smooth",
   });

});
referenceClose.addEventListener('click', () => {
   reference.style.visibility = 'hidden';
   reference.style.opacity = '0';
   reference.style.transition = 'all  0s ease 0s';
});
