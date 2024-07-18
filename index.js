
document.getElementById("btn").addEventListener("click", newTask);

function newTask() {
    let taskInput = document.getElementById("taskInput").value;
    if (taskInput !== "") {
        let myNewTask = document.createElement("div");
        myNewTask.className = 'myNewTask';

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = 'checkbox';

        let newDescription = document.createElement("p");
        newDescription.textContent = taskInput;
        newDescription.className = "grow";

        checkBox.addEventListener("change", function () {
            toggleTaskContainer(checkBox, myNewTask, newDescription);
        });

        let editTask= document.createElement("button");
        editTask.setAttribute("onclick","edit(this)");
        editTask.textContent="edit";

        let deleteTask = document.createElement("img");
        deleteTask.src = 'images/delete-bucket.png';  // Update with your image path
        deleteTask.alt = 'Delete';
        deleteTask.className = 'delTask';

        deleteTask.addEventListener("click", function () {
            myNewTask.remove();
        });

        myNewTask.appendChild(checkBox);
        myNewTask.appendChild(newDescription);
        myNewTask.appendChild(deleteTask);
        myNewTask.appendChild(editTask);
        document.getElementById('unchecked').appendChild(myNewTask);
        document.getElementById("taskInput").value = "";
    } else {
        alert("Please enter a task.");
    }
}

function toggleTaskContainer(checkbox, task, description) {
    let checkedContainer = document.getElementById('checked');
    if (checkbox.checked) {
        description.style.textDecoration = "line-through";
        checkedContainer.insertBefore(task,checkedContainer.firstChild)
    } else {
        description.style.textDecoration = "none";
        document.getElementById('unchecked').appendChild(task);
    }
}


function edit(myThis) {
    let myCurrentTask = myThis.parentNode;
    let paragraph = myCurrentTask.querySelector('p');
    let inputField = document.createElement('input');
    inputField.type = 'text'; 
    inputField.value = paragraph.textContent; 
    myCurrentTask.replaceChild(inputField, paragraph);
    myThis.textContent = "Ok";
    myThis.onclick = function() {
        ok(myThis);
    };
}

function ok(myThis) {  
    console.log(myThis);
    let myCurrentTask = myThis.parentNode;
    let inputField = myCurrentTask.querySelector('input[type="text"]');
    let paragraph = document.createElement('p');
    paragraph.className = "grow";
    paragraph.textContent = inputField.value;
    myCurrentTask.replaceChild(paragraph, inputField);
    myThis.textContent = "Edit";
    myThis.onclick = function() {
        edit(myThis);
    };

}
