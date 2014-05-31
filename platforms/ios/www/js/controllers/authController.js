function authController($scope, $http, $routeParams, $location, $firebase) {
	console.log("auth controller works");
	$scope.word = "Firebase Login";
	$scope.hometitle = "Firebase auth with angular";
	console.log($scope.word);
	
	myUser = -1;
	var ref = new Firebase("https://practicefacebook.firebaseio.com/test-1");
	window.scope = $scope;
	$scope.auth = { username: "", password: ""}
	$scope.register = function(){
		var email = $scope.auth.username;
		var password = $scope.auth.password;
        authClient.createUser(email, password, function (error, user) {
            if (!error) {
                console.log('New user registered');
                doLogin(email, password);
                console.log("new user logged in");
                $location.path("/home");

            } else {
                alert(error);
            }
        });
        console.log("logging in " + $scope.auth.username);
    };

	$scope.login = function(){
		console.log('trying to login: ' + $scope.auth.username);
		var email = $scope.auth.username;
		var password = $scope.auth.password;
        doLogin(email, password);
        $location.path("/home")

    };

	$scope.logout = function(){
		authClient.logout();
		$location.path("/");
	}

	function doLogin(email, password) {
	    authClient.login('password', {
	        email: email,
	        password: password
	    });
	};

	var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
	    if (error) {
	        alert(error);
	        return;
	    }
	    if (user) {
	    	$('#data').prop('disabled', false);
	        // User is already logged in.
	        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
	        myUser = user;
	        // doLogin(user);
	        console.log('logged in')
	    } else {
	        // User is logged out.
	        console.log('logged out');
	        $('#data').prop('disabled', true);
	    }
	});

	$('#data').keypress(function (e) {
	    if (e.keyCode == 13) {
	        var data = $('#data').val();
	        console.log(myUser.id);
	        $scope.userid = myUser.id;
	        var myRef = new Firebase("https://practicefacebook.firebaseio.com/users/" + myUser.id + "/message/data");
	        myRef.set({
	            data: data
	        });
			myRef.once('value', function(dataSnapshot) {
			  // store dataSnapshot for use in below examples.
			  myrefSnapshot = dataSnapshot;
			  $scope.data = myrefSnapshot.val();
			  console.log($scope.data);
			});
	        $('#data').val('');
	    }
	});




}





