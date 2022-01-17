function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            permission: document.getElementById('permission').value
        };
        if(validateForm(data)){
            fetch('http://127.0.0.1:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'index.html';
            });
        }
        
    });
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