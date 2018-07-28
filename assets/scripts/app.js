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

var displayName = '';
var uid = '';
var email = '';

function logOut() {

	if(firebase.auth().currentUser) {
		//	If user is signed in, sign them out
		firebase.auth().signOut();
//		window.location.href='login.html';
	}
}

function calculateCalMaint() {
	
	var weight = $('#weight').val();
	var height = $('#height').val();
	var activity = $('#activity').val();
	var age = $('#age').val();
	var gender = $('#gender').val();
				
	var kg = weight/2.2046226218;
	var cm = height*2.54;
	
	var calMaintLevel = 0;
	
	if(gender === 'male') {
		calMaintLevel = Math.round(10*kg+6.25*cm-5*age+5);
	} else if(gender === 'female') {
		calMaintLevel = Math.round(10*kg+6.25*cm-5*age-161);
	}

/*
	Mifflin - St Jeor Formula
Men
10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5

Women
10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161.
*/
	
	db.ref('users/' + uid).update({
		weightLB: weight,
		weightKG: kg,
		heightIN: height,
		heightCM: cm,
		activity: activity,
		age: age,
		gender: gender,
		calMaintLevel: calMaintLevel
	});
	
	$('#calorie-calculator').addClass('js-hidden');
	$('#daily-calories').text(calMaintLevel);
	$('#calorie-results').removeClass('js-hidden');
}
$(document).ready(function() {
	firebase.auth().onAuthStateChanged(function(user) {
			
		if(user) {
			displayName = user.displayName;
			uid = user.uid;
			email = user.email;
			
			$('.profile-name').text(user.displayName);
			$('.dropdown').empty();
			var logout = $('<div>');
			logout.text('Logout');
			logout.attr('id', 'logout');
			var profile = $('<div>');
			profile.text('Profile');
			$('.dropdown').append(logout, profile);
			
		} else {
			//	redirect to homepage if not logged in
			window.location.href='index.html';
		}
	});
	
	$(document).on('click', '#logout', logOut);
	
	$('#calculate-btn').click(function() {
		
		//	should validate user input here (or in function)
		
		calculateCalMaint();
		
	});
	document.onkeyup = function(event) {
		if(event.keyCode == 13) {
			calculateCalMaint();	
		}	
	}
});