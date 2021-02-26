async function getData() {
    try {
        const response = await fetch("http://localhost:8000/getdocs");
        const data = await response.json();
        displayData(data);
    } catch(err) {
        console.log(err);
    }
};

function displayData(arr) {
    document.getElementById("records").innerHTML = arr.map(mapOutput).join("");
}

function mapOutput(emp) {
    outHTML = emp.empName + " weighed " + emp.empWeight + "<br />";
    return outHTML;
}

function validateForm(){
    document.getElementById("nameMessage").innerHTML="";
    document.getElementById("weightMessage").innerHTML="";
    let empName = document.forms["frmCollectWeights"]["empName"];
    let empWeight = document.forms["frmCollectWeights"]["empWeight"];
    let alphaOnly = /^[A-Za-z]+$/;

    if (!empName.value.match(alphaOnly)) {
        document.getElementById("nameMessage").innerHTML="Name cannot contain numbers!";
        empName.focus();
        return false;
    }
    if (isNaN(empWeight.value)) {
        document.getElementById("weightMessage").innerHTML="Weight must be a number";
        empWeight.focus();
        return false;
    }
    if (empName.value == "") {
        document.getElementById("nameMessage").innerHTML="Name cannot be empty!";
        empName.focus();
        return false;
    }
    if (empWeight.value == "") {
        document.getElementById("weightMessage").innerHTML="Weight cannot be empty!";
        return false;
    }
    return true;
}