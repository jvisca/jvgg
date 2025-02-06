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
            console.log(body);

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

function putUser(event){
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const dni = parseInt(urlParams.get('dni'));

    let name = document.getElementById('re_name').value;
    let email = document.getElementById('re_email').value;
    let age = document.getElementById('re_age').value;
    let cellphone = document.getElementById('re_cellphone').value;
    let gender = document.getElementById('re_gender').value;

    let body = {
        name: name,
        email: email,
        age: parseInt(age),
        cellphone: parseInt(cellphone),
        gender: gender
    };

    fetch(`http://localhost:3000/user/${dni}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 200) {
            alert('User updated successfully');
            clearFormPut();
            console.log(body);
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error updating the User');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating the User: ' + error.message);
    });
}

function clearFormPut(){
    document.getElementById('re_name').value = '';
    document.getElementById('re_email').value = '';
    document.getElementById('re_age').value = '';
    document.getElementById('re_cellphone').value = '';
    document.getElementById('re_gender').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dni = urlParams.get('dni');

    if (dni) {
        document.getElementById('user-dni').textContent = `USER DNI: ${dni}`;
    }
});