let addUser = document.getElementById('add-user');
let deleteUser = document.getElementById('delete-user');
let viewStack = document.getElementById('view-stack');
let clearStack = document.getElementById('clear-stack');
let age = document.getElementById('age');
let add = document.getElementById('add');
let list = document.getElementById('list');
let mainForm = document.querySelector('.main__form');
let mainBlockDeleted = document.querySelector('.main__block-deleted');
let mainBlockStack = document.querySelector('.main__block-stack');
let mainBlockStackEmpty = document.querySelector('.main__block-stack-empty');
let mainBlockClearStack = document.querySelector('.main__block-clear-stack');
let form = document.forms.form;
let stack = [];
let date = new Date().toLocaleString();

addUser.addEventListener('click', function() {
  mainForm.classList.remove('off');
  mainBlockDeleted.classList.add('off');
  mainBlockStack.classList.add('off');
  mainBlockStackEmpty.classList.add('off');
  mainBlockClearStack.classList.add('off');
});
deleteUser.addEventListener('click', function() {
  if (stack.length) {
    mainBlockDeleted.classList.remove('off');
    mainBlockStackEmpty.classList.add('off');
  } else {
    mainBlockStackEmpty.classList.remove('off');
    mainBlockDeleted.classList.add('off');
  }
  mainBlockStack.classList.add('off');
  mainForm.classList.add('off');
  mainBlockClearStack.classList.add('off');
  stack.pop();
});
viewStack.addEventListener('click', function() {
  mainForm.classList.add('off');
  mainBlockDeleted.classList.add('off');
  mainBlockClearStack.classList.add('off');

  if (stack.length) {
    mainBlockStack.classList.remove('off');
      stack.forEach((item) => {
        let li = document.createElement('li');
        li.className = 'main__block-stack__item';
        li.innerHTML = item.user;
        list.append(li);
      });
  } else {
    mainBlockStackEmpty.classList.remove('off');
  }
});

clearStack.addEventListener('click', function() {
  mainBlockStack.classList.add('off');
  mainForm.classList.add('off');
  mainBlockDeleted.classList.add('off');
  try {
    if (!stack.length) {
      throw new SyntaxError('Error: Stack empty');
    }
    stack = [];
    mainBlockClearStack.classList.remove('off');
    mainBlockStackEmpty.classList.add('off');
  } catch (error) {
    console.log(error.message);
    mainBlockStackEmpty.classList.remove('off');
    mainBlockClearStack.classList.add('off');
  }
});

function upName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function upSurname(surname) {
  return surname.charAt(0).toUpperCase() + surname.slice(1);
}

function logger() {
  console.log(date + ' add user ' + this.user);
}

function User(form) {
  this.name = upName(form.name.value);
  this.surname = upSurname(form.surname.value);
  this.age = +form.age.value;
  Object.defineProperty(this, 'user',{
    get() {
      return `${this.name} ${this.surname} with the age of ${this.age}`
    }
  })
  logger.call(this);
}

add.addEventListener('click', function() {
  if (form.name.value && form.surname.value && +form.age.value) {
    let user = new User(form);
    form.reset();
    stack.push(user);
  }
});