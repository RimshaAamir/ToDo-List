
        // document.getElementById("btn").addEventListener("click", newTask(document.getElementById("taskInput").value,false));

        function newTask(txt, ischeck) {
            // let taskInput = document.getElementById("taskInput").value;
            if (txt !== "") {
                const myNewTask= creatNewTask(txt, ischeck);
                // document.getElementById('taskContainer').appendChild(myNewTask);
                document.getElementById('unchecked').appendChild(myNewTask);

                document.getElementById("taskInput").value = "";
                saveData();
            } else {
                alert("Please enter a task.");
            }
        }
       
        function creatNewTask(txt, ischeck){
                let myNewTask = document.createElement("div");
                myNewTask.className = 'myNewTask';

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



                // let deleteTask = document.createElement("img");
                // deleteTask.src = 'images/delete-bucket.png';  // Update with your image path
                // deleteTask.alt = 'Delete';
                // deleteTask.className = 'delTask';
                let deleteTask = document.createElement("button");
                deleteTask.type='button';
                deleteTask.innerHTML= '<i class="fa-solid fa-trash-can"></i>';
                deleteTask.classList.add("text-red-600", "mr-3", "text-sm");
                
                deleteTask.addEventListener("click", function () {
                    myNewTask.remove();
                    saveData();
                });

                myNewTask.appendChild(checkBox);
                myNewTask.appendChild(newDescription);
                myNewTask.appendChild(deleteTask);
                myNewTask.appendChild(editTask);
                return myNewTask;
        }

        function toggleTaskContainer(checkbox, task, description) {
            // let taskContainer = document.getElementById('taskContainer');
            let checkedContainer = document.getElementById('checked');
        
            // let completedTasksContainer = document.getElementById('completedTasksContainer');

            if (checkbox.checked) {
                description.style.textDecoration = "line-through";
                // Create the completed tasks container if it doesn't exist
                // if (!completedTasksContainer) {
                //     completedTasksContainer = document.createElement('div');
                //     completedTasksContainer.id = 'completedTasksContainer';
                //     completedTasksContainer.className="bg-red-300";
                //     let completedTasksHeader = document.createElement('h2');
                //     //completedTasksHeader.textContent = 'Completed Tasks';
                //     completedTasksContainer.appendChild(completedTasksHeader);
                //     document.getElementById('taskContainer').appendChild(completedTasksContainer);
                // }
                // checkedContainer.insertBefore(task, completedTasksContainer.firstChild.nextSibling);
                checkedContainer.insertBefore(task,checkedContainer.firstChild)
            } else {
                description.style.textDecoration = "none";
                // taskContainer.appendChild(task);
                document.getElementById('unchecked').appendChild(task);
            }
            saveData();

        }

        // function edit(myThis) {
        //     // Get the parent div element
        //     let myCurrentTask = myThis.parentNode;
        
        //     // Find the <p> tag inside the div
        //     let paragraph = myCurrentTask.querySelector('p');
        
        //     // Create a new input element
        //     let inputField = document.createElement('input');
        //     inputField.type = 'text'; // Set input type to text
        //     inputField.value = paragraph.textContent; // Set initial input value to the text in <p>
        
        //     // Replace the <p> tag with the new input element
        //     myCurrentTask.replaceChild(inputField, paragraph);
        
        //     // Optionally, focus on the input field to immediately start editing
        //     inputField.focus();

        //     myThis.disabled = true;
        //     myThis.classList="invisible";
 
        //     // myThis.innerHTML ="ok";
        //     // editTask.removeAttribute("onclick","edit(this)");
        //     // editTask.setAttribute("onclick","ok(myThis)");
            
        // }
        // function ok(myThis2){
        //     console.log(myThis2);
        //     let myCurrentTaskAfterEdit = myThis2.parentNode;
        //     let input = myCurrentTask.querySelector('input');
        //     let para = document.createElement('p');
        //     para.textContent = input.value;
        //     myCurrentTaskAfterEdit.replaceChild(para,input );
        //     myThis2.innerHTML ="edit";
        //     editTask.removeAttribute("onclick","ok(myThis)");
        //     // this = myThis2;
        //     editTask.setAttribute("onclick","edit(myThis2)");

        // }
        

        function edit(myThis) {
            // Get the parent div element
            let myCurrentTask = myThis.parentNode;
        
            // Find the <p> tag inside the div
            let paragraph = myCurrentTask.querySelector('p');
        
            // Create a new input element
            let inputField = document.createElement('input');
            inputField.type = 'text'; // Set input type to text
            inputField.value = paragraph.textContent; // Set initial input value to the text in <p>
        
            // Replace the <p> tag with the new input element
            myCurrentTask.replaceChild(inputField, paragraph);
        
            // Change the button text to "Ok" and update the onclick event
            myThis.innerHTML='<i class="fa-solid fa-circle-check"></i>';//"✔";
            myThis.classList.remove("text-indigo-700");
            myThis.classList.add("text-green-500");

            // myThis.setAttribute("onclick", "ok(myThis)");
            myThis.onclick = function() {
                ok(myThis);
            };
        }
        
        function ok(myThis) {  //myThis has ref of edit btn
            // Get the parent div element
            console.log(myThis);

            let myCurrentTask = myThis.parentNode;
        
            // Find the input element inside the div
            let inputField = myCurrentTask.querySelector('input[type="text"]');
        
            // Create a new <p> element
            let paragraph = document.createElement('p');
            paragraph.className = "grow";
            paragraph.textContent = inputField.value; // Set the text of <p> to the input value
        
            // Replace the input element with the new <p> element
            myCurrentTask.replaceChild(paragraph, inputField);
        
            // Change the button text back to "Edit" and update the onclick event
            myThis.innerHTML='<i class="fa-solid fa-pen-to-square"></i>';//"✏️"
            myThis.classList.remove("text-green-500");
            myThis.classList.add("text-indigo-700");
            // myThis.setAttribute("onclick", "edit(myThis)");
            myThis.onclick = function() {
                edit(myThis);
            };
            saveData();
        }
        

        // function saveData(){
        //     let myAllItems=document.querySelectorAll(".myNewTask");
        //     for(let i=0; i<myAllItems.length; i++){
        //         arrp[i]=myAllItems[i].querySelector('p').innerText;
        //         arrc[i]=myAllItems[i].querySelector('input[type="checkbox"]').checked;
        //     }
        //     let arrp[];
        //     let arrc[];
        //     localStorage.setItem('myAllIeamsData',{arrc,arrp});
        // }
        function saveData(){
            let itemsData=[];
            let myGotItems=document.querySelectorAll(".myNewTask");
            for(let i=0; i<myGotItems.length; i++){
                let curP=myGotItems[i].querySelector('p').innerText;
                let curC=myGotItems[i].querySelector('input[type="checkbox"]').checked;
                itemsData.push({txtP: curP,isC: curC});
            }
            localStorage.setItem('myAllItemsData',JSON.stringify(itemsData));
        }

        // function loadData(){
        //     let mydata=localStorage.getItem('myAllIeamsData');
        //     for(i=0; i<arrp.size; i++){
        //         let item= creatNewTask(arrp[i],arrc[i]);
        //         if(arrc[i]){
        //          document.getElementById('checked').appendChild(item);

        //         }
        //         else{
        //          document.getElementById('unchecked').appendChild(item);

        //         }
        //     }
        // }
        function loadData(){
            let mydata=JSON.parse(localStorage.getItem('myAllItemsData'));
            for(i=0; i<mydata.length; i++){
                let item= creatNewTask(mydata[i].txtP, mydata[i].isC);
                if(mydata[i].isC){
                 document.getElementById('checked').appendChild(item);
                 item.querySelector('p').style.textDecoration = "line-through";
                }
                else{
                 document.getElementById('unchecked').appendChild(item);
                }
            }
        }


window.onload=loadData;