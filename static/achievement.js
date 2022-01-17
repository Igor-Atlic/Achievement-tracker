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


    fetch('http://192.168.1.23:8000/admin/achievements',{
        headers: {
        'Authorization': `Bearer ${token}`
    }})
    .then( res => res.json() )
    .then( data => {
        const table = document.getElementById('achTable');

        data.forEach( el => {
            table.innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.name}</div></td><td><div contenteditable>${el.gameId}</div></td><td><div contenteditable>${el.text}</div></td>
                <td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
        });
    });


    document.getElementById('achievementBtn').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('nameA').value,
            gameId: document.getElementById('gameIdA').value,
            text:document.getElementById('textA').value
            
        };
        if(validateForm(data)){

        document.getElementById('nameA').value = '';
        document.getElementById('gameIdA').value = '';
        document.getElementById('textA').value = ''

        fetch('http://192.168.1.23:8000/admin/achievement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('achTable').innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.name}</div></td><td><div contenteditable>${el.game.id}</div></td><td><div contenteditable>${el.text}</div></td>
               <td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
            });}
    });


    document.getElementById('userBtn').addEventListener('click', e => {
        e.preventDefault();

        window.location.href = 'user.html';
    });

    document.getElementById('gameBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'game.html';
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

    fetch('http://192.168.1.23:8000/admin/achievement/' + id,{
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
        name: element.closest('tr').cells[1].innerText,
        gameId: element.closest('tr').cells[2].innerText,
        text: element.closest('tr').cells[3].innerText,
    };

    if(validateForm(data)){
    fetch('http://192.168.1.23:8000/admin/achievement/' + id, {
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
    
    if (data.name.trim() == "") {
        alert("Name must be filled out");
        return false;
    }else if(data.text.trim() == ""){
        alert("Text must be filled out");
        return false;
    }else if(data.gameId.trim() == ""){
        alert("gameId must be filled out");
        return false;

    }
    return true
  } 