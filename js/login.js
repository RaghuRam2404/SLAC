// User array
var users = [];

// user class
function User(){
	this.name = "";
	this.password = "";	
}

// end of user class

u = new User();
u.name = "raghuram";
u.password = "password";

v = new User();
v.name = "vivek";
v.password = "pass";

users[users.length] = u;
users[users.length] = v;

// check login
function check(){
	var name = document.loginForm.name.value;
	var pass = document.loginForm.password.value;
	var flag = 0;
	for(var i=0; i<users.length; i++){
		if(users[i].name === name && users[i].password === pass){
			sessionStorage.name = name;
			sessionStorage.pass = pass;
			return true;
		}	
	}
	return false;
}

