window.onload = function(){
    showusers();
}



showusers = function(){
    fetch('http://localhost:3000/users')
    .then(response => {
        return response.json();
    })
    .then(data  => {
        console.log(data);

        let table = document.getElementById('tbody');
        table.innerHTML='';
        data.forEach(user => {
        let tr = document.createElement('tr');
        let dni= document.createElement('td');
        dni.textContent = user.dni;
        let name =document.createElement('td');
        name.textContent = user.name;
        let email= document.createElement('td');
        email.textContent = user.email;
        let gender=document.createElement('td');
        gender.textContent=user.gender;
        let age =document.createElement('td');
        age.textContent = user.age;
        let cellphone =document.createElement('td');
        cellphone.textContent = user.cellphone;

        let borrar=document.createElement('td');
        let button=document.createElement('button');
        button.textContent='delete';
        button.className="button is-danger is-dark";
        button.onclick=function() { deleteUser(user.dni);};

        //boton de actualizar xd
        let actualizar = document.createElement('td');
        let updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.className = "button is-warning is-dark";
        updateButton.onclick = function() { 
            window.location.href = `actualizar.html?id=${turn.id}`; 
        };
        //
        borrar.appendChild(button);

        tr.appendChild(dni);
        tr.appendChild(name);
        tr.appendChild(email);
        tr.appendChild(gender);
        tr.appendChild(age);
        tr.appendChild(cellphone);
        tr.appendChild(borrar);
        tr.appendChild(actualizar);
        table.appendChild(tr);
        actualizar.appendChild(updateButton);
        }); 
    }); 
}

deleteUser = function(dni){
    alert('user deleted'+dni);
    fetch(`http://localhost:3000/user/${dni}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        showusers();
    })
}