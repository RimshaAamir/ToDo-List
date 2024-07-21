
var itemsData=[];
let idCount;
function newTask(txt, ischeck) {
    if (txt !== "") {
        const myNewTask= creatNewTask(txt, ischeck, ++idCount);
        document.getElementById('unchecked').appendChild(myNewTask);
        document.getElementById("taskInput").value = "";
        itemsData.push({
            txtP: txt,
            isC: ischeck,
            id: myNewTask.id
        });
        localStorage.setItem('myAllItemsData',JSON.stringify(itemsData));
    } else {
        alert("Please enter a task.");
    }
}

function creatNewTask(txt, ischeck, myId){
    let myNewTask = document.createElement("div");
    myNewTask.className = 'myNewTask';
    myNewTask.id = myId;
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = 'checkbox';
    checkBox.checked=ischeck;
    let newDescription = document.createElement("p");
    newDescription.textContent = txt;
    newDescription.className = "grow";
    checkBox.addEventListener("change", function () {
        toggleTaskContainer(checkBox, myNewTask, newDescription);
    });
    let editTask= document.createElement("button");
    editTask.setAttribute("onclick","edit(this)");
    editTask.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';//"✏️"
    editTask.classList.add("text-indigo-700", "mr-3", "text-sm");
    let deleteTask = document.createElement("button");
    deleteTask.type='button';
    deleteTask.innerHTML= '<i class="fa-solid fa-trash-can"></i>';
    deleteTask.classList.add("text-red-600", "mr-3", "text-sm");
    deleteTask.addEventListener("click", function () {
    for(let i=0;itemsData.length;i++)
    {
        if (myNewTask.id == itemsData[i].id)
        {
            itemsData.splice(i,1);
            break;
        }
    }
    localStorage.setItem('myAllItemsData',JSON.stringify(itemsData));
    myNewTask.remove();
    });
    

    myNewTask.appendChild(checkBox);
    myNewTask.appendChild(newDescription);
    myNewTask.appendChild(deleteTask);
    myNewTask.appendChild(editTask);
    return myNewTask;
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

    for(let i=0;itemsData.length;i++)
    {
        if (task.id == itemsData[i].id)
        {
            itemsData.isC=checkbox.checked;
        }
    }
    localStorage.setItem('myAllItemsData',JSON.stringify(itemsData));
    

}


function edit(myThis) {
    let myCurrentTask = myThis.parentNode;
    let paragraph = myCurrentTask.querySelector('p');
    let inputField = document.createElement('input');
    inputField.type = 'text'; 
    inputField.value = paragraph.textContent;
    myCurrentTask.replaceChild(inputField, paragraph);
    myThis.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    myThis.classList.remove("text-indigo-700");
    myThis.classList.add("text-green-500");
    myThis.onclick = function() {  
        ok(myThis);
    };
}

function ok(myThis) {  
    let myCurrentTask = myThis.parentNode;
    let inputField = myCurrentTask.querySelector('input[type="text"]');
    let paragraph = document.createElement('p');
    paragraph.className = "grow";
    paragraph.textContent = inputField.value;
    myCurrentTask.replaceChild(paragraph, inputField);
    myThis.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';
    myThis.classList.remove("text-green-500");
    myThis.classList.add("text-indigo-700");
    myThis.onclick = function() {
        edit(myThis);
    };
    for(let i=0; i<itemsData.length;i++)
    {
        if (myCurrentTask.id == itemsData[i].id)
        {
            itemsData[i].txtP = paragraph.textContent;
        }
    }
    localStorage.setItem('myAllItemsData',JSON.stringify(itemsData));
}


function loadData(){
    let mydata=JSON.parse(localStorage.getItem('myAllItemsData')) || [];
    for(i=0; i<mydata.length; i++){
        let item= creatNewTask(mydata[i].txtP, mydata[i].isC,i+1);
        itemsData.push({
            txtP: mydata[i].txtP,
            isC: mydata[i].isC,
            id: i+1
        });
        if(mydata[i].isC){
            document.getElementById('checked').appendChild(item);
            item.querySelector('p').style.textDecoration = "line-through";
        }
        else{
            document.getElementById('unchecked').appendChild(item);
        }
    }
    idCount=itemsData.length;
    localStorage.setItem('myAllItemsData',JSON.stringify(itemsData));

}

function myclear(){
    localStorage.clear();
}
window.onload=loadData;
