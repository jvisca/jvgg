window.onload = function(){
    showTrainers();
}

showTrainers = function(){
    fetch('http://localhost:3000/api/v1/trainers')
    .then(response => {
        return response.json();
    })
    .then(data  => {
        console.log(data);

        let table = document.getElementById('hbody');
        table.innerHTML='';
        data.forEach(trainer => {
        let tr = document.createElement('tr');
        let dni= document.createElement('td');
        dni.textContent = trainer.dni;
        let name =document.createElement('td');
        name.textContent = trainer.name;
        let activity= document.createElement('td');
        activity.textContent = trainer.activity;
        let timeSlot=document.createElement('td');
        timeSlot.textContent=trainer.timeSlot;
        let age =document.createElement('td');
        age.textContent = trainer.age;
        let gender =document.createElement('td');
        gender.textContent = trainer.gender;

        let borrar=document.createElement('td');
        let button=document.createElement('button');
        button.textContent='delete';
        button.className="button is-danger is-dark";
        button.onclick=function() { deleteTrainers(trainer.dni);};

        
        let actualizar = document.createElement('td');
        let updateButton = document.createElement('button');
        updateButton.textContent = 'Edit';
        updateButton.className = "button is-warning is-dark";
        updateButton.onclick = function () { 
            window.location.href = `put_trainers.html?dni=${trainer.dni}`; 
        };
        
        borrar.appendChild(button);
        actualizar.appendChild(updateButton);


        tr.appendChild(dni);
        tr.appendChild(name);
        tr.appendChild(activity);
        tr.appendChild(timeSlot);
        tr.appendChild(age);
        tr.appendChild(gender);
        tr.appendChild(borrar);
        tr.appendChild(actualizar);
        table.appendChild(tr);
        }); 
    }); 
}

deleteTrainers = function(dni){
    alert('trainer deleted'+dni);
    fetch(`http://localhost:3000/api/v1/trainer/${dni}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        showTrainers();
    })
    .catch(error => {
        console.error('Error deleting trainer:', error);
    });
}