
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

    fetch('http://192.168.1.23:8000/admin/users',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const table = document.getElementById('userTable');

            data.forEach( el => {
                table.innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.username}</div></td><td><div contenteditable>${el.email}</div></td><td><div contenteditable>${el.permission}</div></td>
                <td>${el.password}</td><td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
            });
        });


    
    document.getElementById('userBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('usernameU').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            permission:document.getElementById('permission').value
        };
        if(validateForm(data)){
        document.getElementById('usernameU').value = '',
        document.getElementById('email').value = '',
        document.getElementById('password').value = '',
        document.getElementById('permission').value = ''

        fetch('http://192.168.1.23:8000/admin/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('userTable').innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.username}</div></td><td><div contenteditable>${el.email}</div></td><td><div contenteditable>${el.permission}</div></td>
                <td>${el.password}</td><td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
            });}
    });

    
    document.getElementById('users_achievementsBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'users_achievements.html';
    });
    document.getElementById('gameBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'game.html';
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

    fetch('http://192.168.1.23:8000/admin/user/' + id,{
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
        username: element.closest('tr').cells[1].innerText,
        email: element.closest('tr').cells[2].innerText,
        password: element.closest('tr').cells[4].innerText,
        permission:element.closest('tr').cells[3].innerText
    };

    if(validateForm(data)){
    fetch('http://192.168.1.23:8000/admin/user/' + id, {
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
    
    if (data.username.trim() == "") {
        alert("Name must be filled out");
        return false;
    }else if(data.email.trim() == ""){
        alert("Email must be filled out");
        return false;
    }else if(data.password.trim() == ""){
        alert("password must be filled out");
        return false;

    }else if(data.permission.trim() == ""){
        alert("permission must be filled out");
        return false;

    }
    return true
  } 