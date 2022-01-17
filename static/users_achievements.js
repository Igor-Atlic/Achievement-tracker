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

    fetch('http://192.168.1.23:8000/admin/users_achievements',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const table = document.getElementById('userTable');

            data.forEach( el => {
                table.innerHTML += `<td>${el.userId}</td><td>${el.achievementId}</td><td><div contenteditable>${el.finished}</div></td>
                <td><button class="btn btn-primary" onclick ="editRow(this)" >edit</button></td><td><button class="btn btn-danger" onclick ="deleteRow(this)" >delete</button></td></tr>`;
            });
        });


    
    document.getElementById('user_achievementBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            userId: document.getElementById('userId').value,
            achievementId: document.getElementById('achievementId').value,
            finished: document.getElementById('finished').checked,
        };
        if(validateForm(data)){
        document.getElementById('userId').value = '',
        document.getElementById('achievementId').value = '',
        document.getElementById('finished').checked = 'false'
        

        fetch('http://192.168.1.23:8000/admin/user_achievement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('userTable').innerHTML += `<td>${el.userId}</td><td>${el.achievementId}</td><td><div contenteditable>${el.finished}</div></td>
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


    var userId = element.closest('tr').cells[0].innerText;
    var achievementId = element.closest('tr').cells[1].innerText;

    console.log(element.closest('tr'))
    element.closest('tr').remove();

    fetch('http://192.168.1.23:8000/admin/user_achievement/' + userId + '/'+ achievementId,{
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
    
    var userId = element.closest('tr').cells[0].innerText;
    var achievementId = element.closest('tr').cells[1].innerText;
    const data = {
        userId: element.closest('tr').cells[0].innerText.trim(),
        achievementId: element.closest('tr').cells[1].innerText.trim(),
        finished: element.closest('tr').cells[2].innerText,
        
    };

    if(validateForm(data)){
    fetch('http://192.168.1.23:8000/admin/user_achievement/'  + userId + '/'+ achievementId, {
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
    }else if(data.achievementId.trim() == ""){
        alert("AchievementId must be filled out");
        return false;
    }
    return true
  } 