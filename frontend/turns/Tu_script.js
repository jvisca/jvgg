fetch('http://localhost:3000/turns')
.then(response => {
    return response.json();
})
.then(data  => {
    console.log(data);
});

function submitForm(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

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