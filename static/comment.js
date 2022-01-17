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

    fetch('http://192.168.1.23:8000/admin/comments',{
        headers: {
        'Authorization': `Bearer ${token}`
    }})
    .then( res => res.json() )
    .then( data => {
        const table = document.getElementById('categoryTable');

        data.forEach( el => {
            table.innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.userId}</div></td><td><div contenteditable>${el.achievementId}</div></td>
                <td><div contenteditable>${el.text}</div></td><td><div contenteditable>${el.category}</div></td><td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
        });
    });


    document.getElementById('commentBtn').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            achievementId: document.getElementById('achievementIdC').value,
            userId: document.getElementById('userIdC').value,
            text: document.getElementById('textC').value,
            category: document.getElementById('categoryC').value
        };
        if(validateForm(data)){

        document.getElementById('achievementIdC').value = '';
        document.getElementById('userIdC').value = '';
        document.getElementById('textC').value = '';
        document.getElementById('categoryC').value = '';

        fetch('http://192.168.1.23:8000/admin/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('categoryTable').innerHTML += `<tr><td>${el.id}</td><td><div contenteditable>${el.userId}</div></td><td><div contenteditable>${el.achievementId}</div></td>
                <td><div contenteditable>${el.text}</div></td><td><div contenteditable>${el.category}</div></td><td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr> `;
            });}
    });

    document.getElementById('users_achievementsBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'users_achievements.html';
    });
    document.getElementById('userBtn').addEventListener('click', e => {
        e.preventDefault();

        window.location.href = 'user.html';
    });

    document.getElementById('gameBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'game.html';
    });

    document.getElementById('achievementBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'achievement.html';
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

    fetch('http://192.168.1.23:8000/admin/comment/' + id,{
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
        userId: element.closest('tr').cells[1].innerText.trim(),
        achievementId: element.closest('tr').cells[2].innerText.trim(),
        text: element.closest('tr').cells[3].innerText,
        category:element.closest('tr').cells[4].innerText
    };

    if(validateForm(data)){
    fetch('http://192.168.1.23:8000/admin/comment/' + id, {
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
    }else if(data.text.trim() == ""){
        alert("Text must be filled out");
        return false;
    }else if(data.achievementId.trim() == ""){
        alert("achievementId must be filled out");
        return false;

    }
    return true
  } 