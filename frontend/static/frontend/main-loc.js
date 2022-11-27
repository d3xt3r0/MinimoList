window.addEventListener('load', () => {

    const form = document.querySelector('#form1');
    const input = document.querySelector('#input1');
    const list_el = document.querySelector("#tasks-ul");

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("please fill out idiot");
            return;
        }

        // create one list item

        const tasks_el = document.createElement("li");
        tasks_el.classList.add('list-group-item', 'd-flex', 'align-items-center', 'border-0', 'mb-2', 'rounded','tasks-item');
    

        // the check box 

        const tasks_content_el = document.createElement("input");
        tasks_content_el.type = "checkbox";
        tasks_content_el.classList.add("form-check-input", "me-2");

        // create the del button

        const del_btn = document.createElement("button");
        del_btn.type = "button";
        del_btn.title = "Delete";
        del_btn.setAttribute("data-mdb-toggle", "tooltip");
        del_btn.classList.add('btn', 'btn-danger', 'btn-floating', 'btn-sm', 'rounded-0', 'del-btn');


        // create the del icon

        const del_icon = document.createElement("i");
        del_icon.classList.add("far", "fa-trash-alt");

        // add del icon to button

        del_btn.appendChild(del_icon);

        // add checkbox , text node , del button to list item

        tasks_el.appendChild(tasks_content_el);

        const task_text = document.createElement('span');
        task_text.classList.add('align-items-center');
        task_text.appendChild(document.createTextNode(task));

        tasks_el.appendChild(task_text);
        tasks_el.appendChild(del_btn);

        // add this list item to the actual list

        list_el.appendChild(tasks_el);

        input.value = "";

        // delete the items

        del_btn.addEventListener('click', (e) => {

            list_el.removeChild(tasks_el);

        });

        // listenener for checking the checkbox

        tasks_content_el.addEventListener('click', (e) => {

            if (tasks_content_el.checked){
                task_text.classList.add('done-task', 'text-muted');
                tasks_el.classList.add('tasks-item-done');
            }else{
                task_text.classList.remove('done-task', 'text-muted');
                tasks_el.classList.remove('tasks-item-done');
            }

        });



    })

})