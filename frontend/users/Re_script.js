fetch('http://localhost:3000/users')
.then(response => {
    return response.json();
})
.then(data  => {
    console.log(data);
});

function submitForm(event){
    event.preventDefault();

    let dni = document.getElementById('re_dni').value;
    let name = document.getElementById('re_name').value;
    let email = document.getElementById('re_email').value;
    let age = document.getElementById('re_age').value;
    let cellphone = document.getElementById('re_cellphone').value;
    let gender = document.getElementById('re_gender').value;

    let body = {
        dni: parseInt(dni),
        name: name,
        email: email,
        age: parseInt(age),
        cellphone: parseInt(cellphone),
        gender: gender
    };
    
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 201) {
            alert('User created successfully');
            clearForm();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error creating the user');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating the user: ' + error.message);
    });
}

function clearForm(){
    document.getElementById('re_dni').value = '';
    document.getElementById('re_name').value = '';
    document.getElementById('re_email').value = '';
    document.getElementById('re_age').value = '';
    document.getElementById('re_cellphone').value = '';
    document.getElementById('re_gender').value = '';
}

function putTurn(event){
    event.preventDefault();

    let id = document.getElementById('tu_id').value;
    let userDni = document.getElementById('tu_dni').value;
    let activity = document.getElementById('tu_activity').value;
    let trainerDni = document.getElementById('tu_trainer').value;
    let timeSlot = document.getElementById('tu_slot').value;
    let timesPerWeek = document.getElementById('tu_times').value;

    let body = {
        id: parseInt(id),
        userDni: parseInt(userDni),
        activity: activity,
        trainerDni: parseInt(trainerDni),
        timeSlot: timeSlot,
        timesPerWeek: parseInt(timesPerWeek)
    };

    fetch(`http://localhost:3000/api/v1/turn/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200) {
            alert('Turn updated successfully');
            clearForm();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error updating the turn');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating the turn: ' + error.message);
    });
}

function putUser(event){
    event.preventDefault();

    let dni = document.getElementById('re_dni').value;
    let name = document.getElementById('re_name').value;
    let email = document.getElementById('re_email').value;
    let age = document.getElementById('re_age').value;
    let cellphone = document.getElementById('re_cellphone').value;
    let gender = document.getElementById('re_gender').value;

    let body = {
        dni: parseInt(dni),
        name: name,
        email: email,
        age: parseInt(age),
        cellphone: parseInt(cellphone),
        gender: gender
    };

    fetch(`http://localhost:3000/api/v1/user/${dni}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200) {
            alert('User updated successfully');
            clearForm();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error updating the user');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating the user: ' + error.message);
    });
}