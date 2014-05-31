function userController($scope, $http, $routeParams, $location, $firebase) {

	console.log("user controller works");
	$scope.said = "I said:";

	var ref = new Firebase("https://practicefacebook.firebaseio.com/test-1");

	var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
	    if (error) {
	        alert(error);
	        return;
	    }
	    if (user) {
	        // User is already logged in.
	        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	        myUser = user;
	        // doLogin(user);
	        console.log('logged in')
	    } else {
	        // User is logged out.
	        console.log('logged out');
	    }
	});


	var myRef = new Firebase("https://practicefacebook.firebaseio.com/users/" + $routeParams.id + "/message/data");
	myRef.once('value', function(dataSnapshot) {
	myrefSnapshot = dataSnapshot;
	$scope.stuff = myrefSnapshot.val();
	console.log($scope.stuff);
	$scope.stuff.forEach(function(childSnapshot) {
	  // This code will be called twice.
	  var name = childSnapshot.data();
	  var childData = childSnapshot.val();
	  console.log(name);
	  console.log(childData);
	  // name will be 'fred' the first time and 'wilma' the second time.
	  // childData will be the actual contents of the child.
	});

	});
}