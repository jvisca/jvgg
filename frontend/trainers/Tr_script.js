fetch('http://localhost:3000/api/v1/trainers')
.then(response => {
    return response.json();
})
.then(data  => {
    console.log(data);
});

function submitForm(event){
    event.preventDefault();

    let dni = document.getElementById('tr_dni').value;
    let name = document.getElementById('tr_name').value;
    let activity = document.getElementById('tr_activity').value;
    let slot = document.getElementById('tr_slot').value;
    let age = document.getElementById('tr_age').value;
    let gender = document.getElementById('tr_gender').value;

    let body = {
        dni: parseInt(dni),
        name: name,
        activity: activity,
        timeSlot: slot,
        age: parseInt(age),
        gender: gender 
    }
    
    fetch('http://localhost:3000/api/v1/trainer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 201) {
            alert('Trainer created successfully');
            clearForm();
            console.log(body);
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error creating the trainer');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating the trainer: ' + error.message);
    });
}

function clearForm(){
    document.getElementById('tr_dni').value = '';
    document.getElementById('tr_name').value = '';
    document.getElementById('tr_activity').value = '';
    document.getElementById('tr_slot').value = '';
    document.getElementById('tr_age').value = '';
    document.getElementById('tr_gender').value = '';
}

function putTrainer(event){
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const dni = parseInt(urlParams.get('dni'));

    let name = document.getElementById('tr_name').value;
    let activity = document.getElementById('tr_activity').value;
    let slot = document.getElementById('tr_slot').value;
    let age = document.getElementById('tr_age').value;
    let gender = document.getElementById('tr_gender').value;

    let body = {
        name: name,
        activity: activity,
        timeSlot: slot,
        age: parseInt(age),
        gender: gender
    };

    fetch(`http://localhost:3000/api/v1/trainer/${dni}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200) {
            alert('Trainer updated successfully');
            clearFormPut();
            console.log(body);
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error updating the trainer');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating the trainer: ' + error.message);
    });
}

function clearFormPut(){
    document.getElementById('tr_name').value = '';
    document.getElementById('tr_activity').value = '';
    document.getElementById('tr_slot').value = '';
    document.getElementById('tr_age').value = '';
    document.getElementById('tr_gender').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dni = urlParams.get('dni');

    if (dni) {
        document.getElementById('trainer-dni').textContent = `DNI: ${dni}`;
    }
});
