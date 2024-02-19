// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [98765432, "Anderson", 2232, "anderson@gmail.com", "Administration"],
    [92233451, "Sachin", 8374, "sachin@gmail.com", "Engineering"],
    [64765344, "Sam", 2773, "sam@gmail.com", "Engineering"],
    [93847671, "Smith", 6655, "smith@gmail.com", "Marketing "],
    [77774773, "Chris", 8970, "chris@gmail.com", "Executive"]
];

var $ = function(e){
    "use strict";
    return window.document.getElementById(e);
}

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem('employees') !== null) {
    employees = JSON.parse(localStorage.getItem('employees'));
}

// GET DOM ELEMENTS
let form = $('addForm');
let empTable = $('empTable');
let empCount = $('empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    var id = $("id").value;
    var name = $("name").value;
    var extension = $("extension").value;
    var email = $("email").value;
    var department = $("department").value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = [id, name, extension, email, department];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    form.id.focus();

});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if (confirm('Are you sure you want to delete this employee details?')) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let rowIndex = e.target.parentElement.parentElement.rowIndex;
        console.log(rowIndex, "rowIndex");

        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(rowIndex - 1, 1);

        // BUILD THE GRID
        buildGrid();
    }

});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove();

    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody');

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of employees) {
        tbody.innerHTML += 
        `<tr>
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>`;
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);

    // UPDATE EMPLOYEE COUNT
    empCount.value = `(#${employees.length})`;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees));

};