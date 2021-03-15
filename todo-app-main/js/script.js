(function() {
    let tasks = {
        done: [{
            taskId: generateId(),
            taskContent: 'Complete online JavaScript course',
            taskState: 'done'
        }],
        current: [{
            taskId: generateId(),
            taskContent: 'Jog around the park 3x',
            taskState: 'current'
        }, {
            taskId: generateId(),
            taskContent: '10 minutes meditation',
            taskState: 'current'
        }, {
            taskId: generateId(),
            taskContent: 'Read for 1 hour',
            taskState: 'current'
        }, {
            taskId: generateId(),
            taskContent: 'Pick up groceries',
            taskState: 'current'
        }, {
            taskId: generateId(),
            taskContent: 'Complete Todo App on Frontend Mentor',
            taskState: 'current'
        }],
        get doneTasks() {
            return this.done.length;
        },
        get allTasks() {
            return this.current.length + this.done.length;
        },
        get leftTasks() {
            return this.current.length;
        } 
    },
    tasksList = document.getElementById("list"),
    allTasks = document.getElementById("js-all-tasks"),
    doneTasks = document.getElementById("js-done-tasks"),
    leftTasks = document.getElementById("js-left-tasks"),
    addNewTaskField = document.getElementById("task-new");
    


    function initialize() {
    for (const item of tasks.done) {
        createItem(item);
    }
    for (const item of tasks.current) {
        createItem(item);
    }
    leftTasks.innerHTML = tasks.leftTasks;
    doneTasks.innerHTML = tasks.doneTasks;
    allTasks.innerHTML = tasks.allTasks;
    }

    function createItem(element) {
    let item = document.createElement('li'),
        remove = document.createElement('div'),
        text = document.createElement('span');
        checkbox = document.createElement('input');
    
    item.setAttribute('data-state', element.taskState);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', function () {
        doneTask(this);
    });
    checkbox.classList.add('custom-checkbox');
    remove.classList.add('list-remove');
    remove.addEventListener('click', function () {
        removeTask(this.parentNode);
    });
    text.classList.add('list-text');

    switch (element.taskState) {
        case 'done':
            item.classList.add('list-item', 'list-item--done');
            checkbox.checked = true;
            break;
        default:
            item.classList.add('list-item');
    }
    item.id = element.taskId;
    text.innerHTML = element.taskContent;
    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(remove);
    tasksList.appendChild(item);
    }

    function doneTask(element) {
    let elem = element.parentNode,
        elemId = elem.id,
        elemState = elem.classList.contains('list-item--done');

    const state = elem.getAttribute('data-state');
    elem.setAttribute('data-state', state === 'done' ? 'current' : 'done');

    const [itemsRemove, itemsAdd] = elemState ? [tasks.done, tasks.current] : [tasks.current, tasks.done];
    elem.classList.toggle('list-item--done');
    for (const [index, item] of itemsRemove.entries()) {
        if (item.taskId !== elemId) continue;
        itemsAdd.push(item);
        itemsRemove.splice(index, 1);
    }
    leftTasks.innerHTML = tasks.leftTasks;
    doneTasks.innerHTML = tasks.doneTasks;
    }

    function removeTask(el) {
    let removeElement = el,
        removeElementId = removeElement.id,
        removeElementState = removeElement.classList.contains('list-item--done');

    removeElement.remove();
    const items = removeElementState ? tasks.done : tasks.current;
    for (const [index, item] of items.entries()) {
        if (item.taskId !== removeElementId) continue;
        items.splice(index, 1);
    }
    leftTasks.innerHTML = tasks.leftTasks;
    doneTasks.innerHTML = tasks.doneTasks;
    allTasks.innerHTML = tasks.allTasks;
    }

    function addTasks(string) {
    let element = {
        taskId: generateId(),
        taskContent: string,
        taskState: "current"
    };
    tasks.current.push(element);
    createItem(element);
    allTasks.innerHTML = tasks.allTasks;
    leftTasks.innerHTML = tasks.leftTasks;
    }

    function generateId() {
    return Math.random().toString(36).substr(2, 16);
    }

    initialize();

    addNewTaskField.addEventListener('keyup', function (event) {
        let someKey = event.key;
        if (someKey === 'Enter') {
            addTasks(this.value);
            this.value = '';
        }
    })

    function filter(types) {
        const elements = tasksList.childNodes;
        for (let i = 0; i < elements.length; i++) {
            const taskState = elements[i].getAttribute('data-state');

            if (types.includes(taskState)) {
                elements[i].classList.remove('disable');
            } else {
                elements[i].classList.add('disable');
            }
            
        }
    }

    function removeAllDone() {
        const elements = tasksList.childNodes;
        const elementsToRemove = [];
        for (let i = 0; i < elements.length; i++) {
            const taskState = elements[i].getAttribute('data-state');
            if (taskState === 'done') {
                elementsToRemove.push(elements[i])
            }         
        }
        elementsToRemove.forEach((el) => removeTask(el));
    } 

    document.getElementById('doneFilter').addEventListener('click', () => {
        filter(['done']);
    });
    document.getElementById('allFilter').addEventListener('click', () => {
        filter(['done', 'current']);
    });
    document.getElementById('currentFilter').addEventListener('click', () => {
        filter(['current']);
    });
    document.getElementById('clear-completed').addEventListener('click', removeAllDone);

})();

var button = document.getElementById("theme-btn");
var link = document.getElementById("theme-link");

button.addEventListener('click', function() {changeTheme();});

function changeTheme() {
    let lightTheme = './style/light-theme.css';
    let darkTheme = './style/dark-theme.css';

    var currentTheme = link.getAttribute('href');
    var theme = '';

    if(currentTheme == lightTheme){
        currentTheme = darkTheme;
        theme = 'dark';
    } else {
        currentTheme = lightTheme;
        theme = 'light';
    }
    link.setAttribute('href', currentTheme);
}