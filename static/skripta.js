function init() {
    
    fetch('http://192.168.1.23:8000/api/users')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('userLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Username: ${el.username}, E-mail: ${el.email}, Password: ${el.password}, Permission: ${el.permission}</li>`;
            });
        });

    fetch('http://192.168.1.23:8000/api/games')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('gameList');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Developer: ${el.developer.username}</li>`;
            });
        });

    fetch('http://192.168.1.23:8000/api/achievements')
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('achievementList');

        data.forEach( el => {
            lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Game ID: ${el.game.name}</li>, Text: ${el.text}</li>, Finished: ${el.finished} `;
        });
    });

    fetch('http://192.168.1.23:8000/api/comments')
    .then( res => res.json() )
    .then( data => {
        const lst = document.getElementById('commentList');

        data.forEach( el => {
            lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.user.username}, User ID: ${el.user.id}</li>, Achievement ID: ${el.achievement.id}</li>,Text: ${el.text}</li>, Category: ${el.category} `;
        });
    });
    document.getElementById('userBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('usernameU').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            permission: document.getElementById('permission').value
        };

        document.getElementById('usernameU').value = '',
        document.getElementById('email').value = '',
        document.getElementById('password').value = '',
        document.getElementById('permission').value = ''

        fetch('http://192.168.1.23:8000/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('userLst').innerHTML += `<li>ID: ${el.id}, Username: ${el.username}, E-mail: ${el.email}, Password: ${el.password}, Permission: ${el.permission}</li>`;
            });
    });

    document.getElementById('gameBtn').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('nameG').value,
            userId: document.getElementById('userIdG').value
        };

        document.getElementById('nameG').value = '';
        document.getElementById('userIdG').value = '';

        fetch('http://192.168.1.23:8000/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('gameList').innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Developer Id: ${el.userId}</li>`;
            });
    });

    document.getElementById('achievementBtn').addEventListener('click', e => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('nameA').value,
            gameId: document.getElementById('gameIdA').value,
            text:document.getElementById('textA').value,
            finished:document.getElementById('finished').value
        };

        document.getElementById('nameA').value = '';
        document.getElementById('gameIdA').value = '';
        document.getElementById('textA').value = '',
        document.getElementById('finished').value = ''

        fetch('http://192.168.1.23:8000/api/achievement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('achievementList').innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Game ID: ${el.game.id}</li>, Text: ${el.text}</li>, Finished: ${el.finished} `;
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

        document.getElementById('achievementIdC').value = '';
        document.getElementById('userIdC').value = '';
        document.getElementById('textC').value = '';
        document.getElementById('categoryC').value = '';

        fetch('http://192.168.1.23:8000/api/comment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.getElementById('commentList').innerHTML += `<li>ID: ${el.id}, User ID: ${el.userId}</li>, Achievement ID: ${el.achievementId}</li>,Text: ${el.text}</li>, Category: ${el.category} `;
            });
    });
}