function init() {
    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://192.168.1.23:8000/admin/currentUser',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('currentUser').innerHTML = `Username ${data.username}`;
            if(data.permission != "admin"){
                document.getElementById('admin').innerHTML = `You dont have permission to use this features`;
            }
            
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

    document.getElementById('commentBtn').addEventListener('click', e => {
        e.preventDefault();
        
        window.location.href = 'comment.html';

    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}