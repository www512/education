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
let mainTask05 = document.querySelector('.main__task05');
let form = document.forms.form;
let stack = [];

let logger = console.log;
console.log = function (text) {
  let date = new Date().toLocaleString();
  logger.call(console, date + ' ' + text);
}

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
  console.log('Last user deleted successfully');
  stack.pop();
});
viewStack.addEventListener('click', function() {
  mainForm.classList.add('off');
  mainBlockDeleted.classList.add('off');
  mainBlockClearStack.classList.add('off');

  if (stack.length) {
    mainBlockStack.classList.remove('off');
    clearList();
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
    console.log('Stack cleared successfully');
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

function User(form) {
  this.name = upName(form.name.value);
  this.surname = upSurname(form.surname.value);
  this.age = +form.age.value;
  Object.defineProperty(this, 'user',{
    get() {
      return `${this.name} ${this.surname} with the age of ${this.age}`
    }
  })
  console.log(this.user);
}

add.addEventListener('click', function() {
  if (form.name.value && form.surname.value && +form.age.value) {
    let user = new User(form);
    form.reset();
    stack.push(user);
  }
});

function clearList() {
  liArray = list.querySelectorAll('li');
  for (let li of liArray) {
    li.remove();
  }
}
let count = 0;
function curry(f) {
  return function (parent) {
    return function (name) {
      count++;
      console.log(count);
      if (count > 5) {
        return alert('Exceeding the nesting limit');
      }
      return function (num) {
        return f(parent, name, num)
      }
    }
  }
}

function makeElement(parent, name, num) {
  let parentWidth = mainTask05.offsetWidth;
  num = (num > 5) ? num = 5 : num;
  if (parent == 'body') {
    for (let i = 0; i < num; i++) {
      let block = document.createElement(name);
      block.className = 'task05';
      let blockWidth = (parentWidth / num) - (parentWidth * 0.02);
      block.style.width = `${blockWidth}px`;
      block.style.minHeight = `${blockWidth * 0.5}px`;
      mainTask05.append(block);
    }
  } else {
    let parentName = mainTask05.querySelectorAll(parent);
    if (parentName.length == 0) { alert('Parent is missing') };
    parentWidth = parentName[0].offsetWidth;
    for (let item of parentName) {
      for (let i = 0; i < num; i++) {
        let block = document.createElement(name);
        block.className = 'task05';
        let blockWidth = ((parentWidth / num) - (parentWidth * 0.02)) - 2;
        block.style.width = `${blockWidth}px`;
        block.style.minHeight = `${blockWidth * 0.5}px`;
        item.append(block);
      }
    }
  }
}

let makeBlock = curry(makeElement);