const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function init() {
    
    


    fetch('http://192.168.1.23:8000/admin/currentUser',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('currentUser').innerHTML = `Username ${data.username}`;

            
        });

    fetch('http://192.168.1.23:8000/admin/games',{
        headers: {
        'Authorization': `Bearer ${token}`
    }})
        .then( res => res.json() )
        .then( data => {
            const table = document.getElementById('gameTable');

            data.forEach( el => {
                table.innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.name}</div></td><td><div contenteditable>${el.userId}</div><td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
            });
        });

    document.getElementById('gameBtn').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('nameG').value,
            userId: document.getElementById('userIdG').value
        };
        if(validateForm(data)){

        document.getElementById('nameG').value = '';
        document.getElementById('userIdG').value = '';

        fetch('http://192.168.1.23:8000/admin/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('gameTable').innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.name}</div></td><td><div contenteditable>${el.userId}</div><td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
            });}
    });


    document.getElementById('userBtn').addEventListener('click', e => {
        e.preventDefault();

        window.location.href = 'user.html';
    });

   

    document.getElementById('achievementBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'achievement.html';
    });

    document.getElementById('commentBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'comment.html';

    });
    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}

function deleteRow(element){


    var id = element.closest('tr').cells[0].innerText;
    console.log(element.closest('tr'))
    element.closest('tr').remove();

    fetch('http://192.168.1.23:8000/admin/game/' + id,{
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE',
    })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
        });
        
        
    
}

function editRow(element){
    
    var id = element.closest('tr').cells[0].innerText;
    const data = {
        userId: element.closest('tr').cells[1].innerText,
        name: element.closest('tr').cells[2].innerText,
        
    };

    if(validateForm(data)){
    fetch('http://192.168.1.23:8000/admin/game/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
    })
        .then( res => res.json() )
        .then( el => {
            console.log(el)
        });}
    
}

function validateForm(data) {
    
    if (data.userId.trim() == "") {
        alert("UserId must be filled out");
        return false;
    }else if(data.name.trim() == ""){
        alert("Name must be filled out");
        return false;
    }
    return true
  } 