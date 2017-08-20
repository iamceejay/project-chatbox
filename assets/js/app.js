var app = angular.module('chatbox', ['ngRoute', 'toaster', 'ngAnimate', 'firebase', 'luegg.directives']);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBIonhGEWducbGbLTFHRtMN0TzbndEaDX4",
    authDomain: "chatbox-19e7b.firebaseapp.com",
    databaseURL: "https://chatbox-19e7b.firebaseio.com",
    projectId: "chatbox-19e7b",
    storageBucket: "chatbox-19e7b.appspot.com",
    messagingSenderId: "236862783357"
};

firebase.initializeApp(config);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html'
    })

    .when('/create-account', {
        templateUrl: 'templates/create-account.html'
    })

    .when('/chatbox', {
        templateUrl: 'templates/chatbox.html'
    })
})

app.run(function($location) {
    if(firebase.auth().currentUser == null) {
        $location.path('/');
    } else {
        $location.path('/chatbox');
    }
})