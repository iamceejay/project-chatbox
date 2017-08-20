app.controller('loginCtrl', function($scope, $location, $timeout, toaster) {
    $scope.input = {};

    // Login function
    $scope.login = function() {
        const auth = firebase.auth();
    
        auth.signInWithEmailAndPassword($scope.input.email, $scope.input.password)
        .then(function(response) {
            $scope.input = {};

            $timeout(function () {
                toaster.pop('success', 'Successfuly Logged-in!', 'Enjoy the conversation!');
            }, 0);

            $timeout(function() {
                $location.path('/chatbox')
            }, 2000);
        })
        .catch(function(response){
            $timeout(function () {
                toaster.error('Login Error', response.message);
            }, 0);
            
            console.log(response.message);
        });
    }

    // Redirect to create account
    $scope.redirectCreateAcc = function() {
        $location.path('/create-account')
    }
})

app.controller('createAccCtrl', function($scope, $location, $timeout, toaster) {
    $scope.input = {};

    // Create Account Function
    $scope.createAccount = function() {
        const auth = firebase.auth();
    
        auth.createUserWithEmailAndPassword($scope.input.email, $scope.input.password)
        .then(function(response) {
            $scope.input = {};

            $timeout(function () {
                toaster.pop('success', 'Account Created', 'Your account has been successfuly created!');
            }, 5);
            
            $timeout(function() {
                $location.path('/')
            }, 2000);

            console.log(response);
        })
        .catch(function(response){
            $timeout(function () {
                toaster.error('Create Account Error', response.message);
            }, 0);
            
            console.log(response.message);
        });
    }

    // Redirect to Login
    $scope.redirectLogin = function() {
        $location.path('/')
    }
})

app.controller('chatboxCtrl', function($scope, $firebaseObject, $interval, $location) {
    $scope.chat = {};
    $scope.user = firebase.auth().currentUser.email;
    $scope.wait = false;
    const rootRef = firebase.database();
    const collection = rootRef.ref().child('messages').orderByChild('date');
    const ref = rootRef.ref('messages');

    // Loads all the messages from the database
    collection.on('value', function(snapshot) {
        $scope.messages = snapshot.val();
    });

    // Update time every 1s
    $interval(function() {
        $scope.date = moment().format('YYYY/MM/DD, h:mm:ss a');
    }, 1000);

    // Send message function
    $scope.send = function() {
        ref.push({
            message: $scope.chat.message,
            date : $scope.date,
            user : $scope.user
        });

        $scope.chat = {};
        $scope.wait = true;

        $interval(function() {
            $scope.wait = false;
        }, 6000);
    }

    // Logout Function
    $scope.logout = function() {
        firebase.auth().signOut();
        $location.path('/');
    }
})