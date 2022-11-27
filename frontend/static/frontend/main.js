window.addEventListener('load', () => {

    const form = document.querySelector('#form1');
    const input = document.querySelector('#input1');
    const list_el = document.querySelector("#tasks-ul");


    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');


    buildList()

    function buildList(){

        list_el.innerHTML = '';


        var url = 'http://127.0.0.1:8000/api/task-list/'

        fetch(url)
        .then((resp) => resp.json())
        .then(function(data){

            console.log('Data:',data);
            var list = data;

            


            for (var i in list){

                var title = `<input type="checkbox" class="form-check-input me-2 done-btn-l">
                            <span class="align-items-center">${list[i].title}</span>`

                if ( list[i].completed){

                    var item = `<li class="list-group-item d-flex align-items-center border-0 mb-2 rounded tasks-item tasks-item-done">
                                <input type="checkbox" class="form-check-input me-2 done-btn-l" checked>
                                <span class="done-task text-muted align-items-center">${list[i].title}</span>
                                <button type="button" title="Delete" data-mdb-toggle="tooltip" class="btn btn-danger btn-floating btn-sm rounded-0 del-btn">
                                <i class="far fa-trash-alt"></i></button>
                                </li>`;
                }else{

                    var item = `<li class="list-group-item d-flex align-items-center border-0 mb-2 rounded tasks-item">
                                <input type="checkbox" class="form-check-input me-2 done-btn-l">
                                <span class="align-items-center">${list[i].title}</span>
                                <button type="button" title="Delete" data-mdb-toggle="tooltip" class="btn btn-danger btn-floating btn-sm rounded-0 del-btn">
                                <i class="far fa-trash-alt"></i></button>
                            </li>`;
                }

                

                list_el.innerHTML += item;

            }


            for (var i in list){
                var deleteBtn = document.getElementsByClassName('del-btn')[i]
                var doneBtn = document.getElementsByClassName('done-btn-l')[i]


                deleteBtn.addEventListener('click', (function(item){

                    return function(){

                        deleteItem(item)
                    }

                })(list[i]))

                doneBtn.addEventListener('click', (function(item){

                    return function(){

                        doneItem(item)
                    }

                })(list[i]))


            } //endloop


        })
    }

    function doneItem(item){
        var url = `http://127.0.0.1:8000/api/task-update/${item.id}/`;
        item.completed = !item.completed
        fetch(url, {
            method:'POST',
            headers:{
                'Content-type' : 'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'title': item.title, 'completed': item.completed})
        }).then(function(resp){
            buildList()
        })
    }


    function deleteItem(item){
        console.log('item',item.id)

            var url = `http://127.0.0.1:8000/api/task-delete/${item.id}/`;
            fetch(url, {
                method:'DELETE', 
                headers:{
                    'Content-type':'application/json',
                    'X-CSRFToken':csrftoken,
                }
            })
            .then((resp) => {
                buildList()
            })

    }


    

    form.addEventListener('submit', (e) => {

        e.preventDefault();


        const task = input.value;

        if (!task) {
            alert("please fill out idiot");
            return;
        }

        var url = 'http://127.0.0.1:8000/api/task-create/'
        fetch(url, {
            method:'POST',
            headers:{
                'Content-type' : 'application/json',
                'X-CSRFToken':csrftoken,
            },
            body:JSON.stringify({'title': task})
        }).then(function(resp){
            buildList()
            input.value = ''
        })
        

    })

})