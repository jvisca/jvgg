window.onload = function(){
    showTurns();
}

showTurns = function(){
    fetch('http://localhost:3000/turns')
    .then(response => response.json())
    .then(data  => {
        console.log(data);

        let table = document.getElementById('sbody');
        table.innerHTML = '';

        data.forEach(turn => {
            let tr = document.createElement('tr');

            let ID = document.createElement('td');
            ID.textContent = turn.id;

            let DNI = document.createElement('td');
            DNI.textContent = turn.userDni;

            let activity = document.createElement('td');
            activity.textContent = turn.activity;

            let trainerDNI = document.createElement('td');
            trainerDNI.textContent = turn.trainerDni;

            let timeslot = document.createElement('td');
            timeslot.textContent = turn.timeSlot;

            let timesperweek = document.createElement('td');
            timesperweek.textContent = turn.timesPerWeek;

            let borrar = document.createElement('td');
            let button = document.createElement('button');
            button.textContent = 'delete';
            button.className = "button is-danger is-dark";
            button.onclick = function() { deleteTurn(turn.id); };

            let actualizar = document.createElement('td');
            let updateButton = document.createElement('button');
            updateButton.textContent = 'Edit';
            updateButton.className = "button is-warning is-dark";
            updateButton.onclick = function () { 
            window.location.href = `put_turn.html?id=${turn.id}`; 
            };

            borrar.appendChild(button);
            actualizar.appendChild(updateButton);

            tr.appendChild(ID);
            tr.appendChild(DNI);
            tr.appendChild(activity);
            tr.appendChild(trainerDNI);
            tr.appendChild(timeslot);
            tr.appendChild(timesperweek);
            tr.appendChild(borrar);
            tr.appendChild(actualizar);
            table.appendChild(tr);
        }); 
    }); 
}

deleteTurn = function(id){

    if (!confirm(`Are you sure you want to delete the turn with ID: ${id}?`)) {
        return;
    }

    alert('Turn deleted: ' + id);

    fetch(`http://localhost:3000/turns/` + id, { method: 'DELETE' })
    .then(response => {
        if (response.status === 200 || response.status === 204) {
            alert(`Turn with ID: ${id} deleted successfully.`);
            console.log(response);
            showTrainers();
        } else if (response.status === 404) {
            alert(`Turn with ID: ${id} not found.`);
        } else if (response.status === 500) {
            alert('There was an error on the server. Please try again later.');
        } else {
            alert('An unexpected error occurred.');
        }
    })
    .catch(error => {
        console.error('Error deleting turn:', error);
        alert('Error deleting the turn: ' + error.message);
    });
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