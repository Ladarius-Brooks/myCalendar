
function fetchTasks() {
    // create an get ajax request to /api/tasks
    // console log the response from the server
    $.ajax({
        url:'/api/tasks',
        type:'GET',
        success: res => {   //the weird symbol means function
            console.log(res);
            for(let i=0; i< res.length; i++) {
                displayTasks(res[i]);
            }
        },
        error: function(details) {
            console.log("Error", details);
        }
    });
    
}

function displayTasks(task){
    var container = $("#tasks");

    var syntax = `
        <div class='task'>
            <i class="far fa-circle check"></i> 
            <div class='task-content'>
                <h5 class='task-title'>${task.title}</h5>
                <label class='task-notes'>${task.notes}</label>
            </div>
            <i class='fas fa-star important'></i>
        </div>
    `;



    container.append(syntax);
}
function register(){
// get values from the form
let title = $("#txtTitle").val();
let notes = $("#txtNotes").val();
let imp = $("#chkImportant").is(":checked");

//validation
if(title.length < 5){
    alert("Please verify the Title");
    return;
}

//create an object
let task = {
    title: title,
    notes: notes,
    important: imp
};
console.log(task);
//send the object to BE
$.ajax({
    type: 'POST',
    url: '/api/createTask',
    data: JSON.stringify(task),
    contentType: 'application/json',
    success: res => {
        console.log("Server says", res);
        displayTasks(res);

        // here
        // opt 1 = get all the task and render again
    },
    error: details => {
        console.log("Error", details);
    }
});
//clear form

}


function init() {
    console.log("My Cal");

    // setup events
    $("#btnSave").click(register);

    fetchTasks();
}

window.onload = init;