fetch('http://localhost:3000/users')
.then(response => {
    return response.json();
})
.then(data  => {
    console.log(data);
});

function submitForm(event){
    event.preventDefault();

    let dni = document.getElementById('re_dni').value.trim();
    let name = document.getElementById('re_name').value.trim();
    let email = document.getElementById('re_email').value.trim();
    let age = document.getElementById('re_age').value.trim();
    let cellphone = document.getElementById('re_cellphone').value.trim();
    let gender = document.getElementById('re_gender').value.trim();

    if (!dni || !name || !email || !age || !cellphone || !gender) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (isNaN(dni) || isNaN(age) || isNaN(cellphone)){
        alert('El DNI, la edad y el numero de celular deben ser números.');
        return;
    }

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

        } 
        else if (response.status === 400) {
            return response.json().then(data => {
                throw new Error(data.error || 'Datos inválidos.');
            });
        } 
        else if (response.status === 409) {
            throw new Error('Ya existe un user con este DNI.');
        } 
        else if (response.status === 500) {
            throw new Error('Error del servidor, intenta más tarde.');
        }
        else {
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

    let name = document.getElementById('re_name').value.trim();
    let email = document.getElementById('re_email').value.trim();
    let age = document.getElementById('re_age').value.trim();
    let cellphone = document.getElementById('re_cellphone').value.trim();
    let gender = document.getElementById('re_gender').value.trim();

    if (!name || !email || !age || !cellphone || !gender) {
        alert('Todos los campos son obligatorios.');
        return;
    }

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
        } 
        else if (response.status === 400) {
            return response.json().then(data => {
                throw new Error(data.error || 'Datos inválidos.');
            });
        } 
        else if (response.status === 500) {
            throw new Error('Error del servidor, intenta más tarde.');
        }
        else {
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