// Initialize Firebase
var config = {
	apiKey: "AIzaSyBoMGE2tup_IQsm5aHnfdlAh4HMLD3J_Yw",
	authDomain: "login-test-25879.firebaseapp.com",
	databaseURL: "https://login-test-25879.firebaseio.com",
	projectId: "login-test-25879",
	storageBucket: "login-test-25879.appspot.com",
	messagingSenderId: "127721403757"
};

firebase.initializeApp(config);
var db = firebase.database();

function logOut() {

	if(firebase.auth().currentUser) {
		//	If user is signed in, sign them out
		firebase.auth().signOut();
//		window.location.href='login.html';
	}
}

firebase.auth().onAuthStateChanged(function(user) {
		
	if(user) {
		$('.profile-name').text(user.displayName);
		$('.dropdown').empty();
		var logout = $('<div>');
		logout.text('Logout');
		logout.attr('id', 'logout');
		var profile = $('<div>');
		profile.text('Profile');
		$('.dropdown').append(logout, profile);
	} else {
		$('.profile-name').text('Get Fit!');
		$('.dropdown').empty();
		var login = $('<div>');
		login.text('Log In');
		login.attr('id', 'login');
		var signup = $('<div>');
		signup.text('Sign Up');
		signup.attr('id', 'signup');
		$('.dropdown').append(login, signup);
	}
});

$(document).on('click', '#logout', logOut);
$(document).on('click', '#login', function() { window.location.href='login.html' });
$(document).on('click', '#signup', function() { window.location.href='signup.html' });
$('#get-started').click(function() { console.log('test'); window.location.href='getstarted.html' });

