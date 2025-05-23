fetch('http://localhost:3000/turns')
.then(response => {
    return response.json();
})
.then(data  => {
    console.log(data);
});

function submitForm(event) {
    event.preventDefault();

    let userDni = document.getElementById('tu_dni').value.trim();
    let activity = document.getElementById('tu_activity').value.trim();
    let trainerDni = document.getElementById('tu_trainer').value.trim();
    let timeSlot = document.getElementById('tu_slot').value.trim();
    let timesPerWeek = document.getElementById('tu_times').value.trim();

    if (!userDni || !activity || !trainerDni || !timeSlot || !timesPerWeek) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (isNaN(userDni) || isNaN(trainerDni)){
        alert('El DNI del usuario y el DNI del entrenador deben ser números.');
        return;
    }

    let body = {
        userDni: parseInt(userDni),
        activity: activity,
        trainerDni: parseInt(trainerDni),
        timeSlot: timeSlot,
        timesPerWeek: parseInt(timesPerWeek)
    };
    
    fetch('http://localhost:3000/api/v1/turn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.status === 201) {
            alert('Turn created successfully');
            clearForm();
            console.log(body);
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                throw new Error(data.error || 'Datos inválidos.');
            });
        } 
        else if (response.status === 409) {
            throw new Error('Ya existe un DNI asociado a este turno.');
        } 
        else if (response.status === 500) {
            throw new Error('Error del servidor, intenta más tarde.');
        }
        else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error creating the turn');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error creating the turn: ' + error.message);
    });
}

function clearForm() {
    document.getElementById('tu_dni').value = '';
    document.getElementById('tu_activity').value = '';
    document.getElementById('tu_trainer').value = '';
    document.getElementById('tu_slot').value = '';
    document.getElementById('tu_times').value = '';
}

function putTurn(event){
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    let userDni = document.getElementById('tu_dni').value.trim();
    let activity = document.getElementById('tu_activity').value.trim();
    let trainerDni = document.getElementById('tu_trainer').value.trim();
    let timeSlot = document.getElementById('tu_slot').value.trim();
    let timesPerWeek = document.getElementById('tu_times').value.trim();

    if (!userDni || !activity || !trainerDni || !timeSlot || !timesPerWeek) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (isNaN(userDni) || isNaN(trainerDni)) {
        alert('El DNI del usuario y el DNI del entrenador deben ser números.');
        return;
    }

    let body = {
        userDni: parseInt(userDni),
        activity: activity,
        trainerDni: parseInt(trainerDni),
        timeSlot: timeSlot,
        timesPerWeek: parseInt(timesPerWeek)
    };

    fetch(`http://localhost:3000/api/v1/turns/${id}`, {
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
                throw new Error(data.error || 'Error updating the turn');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error updating the turn: ' + error.message);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        document.getElementById('turn-id').textContent = `TURN ID: ${id}`;
    }
});

document.getElementById('tu_activity').addEventListener('change', updateTrainer);
document.getElementById('tu_slot').addEventListener('change', updateTrainer);

function updateTrainer() {
    let activity = document.getElementById('tu_activity').value;
    let timeSlot = document.getElementById('tu_slot').value;
    let trainerInput = document.getElementById('tu_trainer');
    if (activity && timeSlot) {
        fetch('http://localhost:3000/api/v1/trainers')
            .then(response => response.json())
            .then(data => {
                let matchedTrainer = data.find(trainer => trainer.activity === activity && trainer.timeSlot === timeSlot);
                if (matchedTrainer) {
                    trainerInput.value = matchedTrainer.dni || 'No disponible';
                } else {
                    trainerInput.value = 'No hay entrenadores disponible';
                }
            })
            .catch(error => {
                console.error('Error al obtener los entrenadores:', error);
                trainerInput.value = 'Error';
            });
    } else {
        trainerInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
            });
        });
    }
});