
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
                document.getElementById('taskContainer').appendChild(myNewTask);

                document.getElementById("taskInput").value = "";
            } else {
                alert("Please enter a task.");
            }
        }

        function toggleTaskContainer(checkbox, task, description) {
            let taskContainer = document.getElementById('taskContainer');
            let completedTasksContainer = document.getElementById('completedTasksContainer');

            if (checkbox.checked) {
                description.style.textDecoration = "line-through";
                // Create the completed tasks container if it doesn't exist
                if (!completedTasksContainer) {
                    completedTasksContainer = document.createElement('div');
                    completedTasksContainer.id = 'completedTasksContainer';
                    completedTasksContainer.className="bg-red-300";
                    let completedTasksHeader = document.createElement('h2');
                    //completedTasksHeader.textContent = 'Completed Tasks';
                    completedTasksContainer.appendChild(completedTasksHeader);
                    document.getElementById('taskContainer').appendChild(completedTasksContainer);
                }
                completedTasksContainer.insertBefore(task, completedTasksContainer.firstChild.nextSibling);
            } else {
                description.style.textDecoration = "none";
                taskContainer.appendChild(task);
            }
        }

