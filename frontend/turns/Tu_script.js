fetch('http://localhost:3000/turns')
.then(response => {
    return response.json();
})
.then(data  => {
    console.log(data);
});

function submitForm(event) {
    event.preventDefault();

    let userDni = document.getElementById('tu_dni').value;
    let activity = document.getElementById('tu_activity').value;
    let trainerDni = document.getElementById('tu_trainer').value;
    let timeSlot = document.getElementById('tu_slot').value;
    let timesPerWeek = document.getElementById('tu_times').value;

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
        } else {
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

    let userDni = document.getElementById('tu_dni').value;
    let activity = document.getElementById('tu_activity').value;
    let trainerDni = document.getElementById('tu_trainer').value;
    let timeSlot = document.getElementById('tu_slot').value;
    let timesPerWeek = document.getElementById('tu_times').value;

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
            console.log(body); // Depuración

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
    let trainerInput = document.getElementById('tu_trainer');  // Input donde autocompletamos el entrenador
    // Asegurarse de que ambos campos estén seleccionados antes de proceder
    if (activity && timeSlot) {
        fetch('http://localhost:3000/api/v1/trainers')  // Suponiendo que esta ruta devuelve todos los entrenadores
            .then(response => response.json())
            .then(data => {
                // Filtramos los entrenadores por actividad y franja horaria
                let matchedTrainer = data.find(trainer => trainer.activity === activity && trainer.timeSlot === timeSlot);
                if (matchedTrainer) {
                    trainerInput.value = matchedTrainer.dni || 'No disponible';  // Auto-completar el campo "trainer"
                } else {
                    trainerInput.value = 'No hay entrenadores disponible';  // Si no hay coincidencias
                }
            })
            .catch(error => {
                console.error('Error al obtener los entrenadores:', error);
                trainerInput.value = 'Error';
            });
    } else {
        trainerInput.value = '';  // Si no se ha seleccionado la actividad y la franja horaria
    }
}
