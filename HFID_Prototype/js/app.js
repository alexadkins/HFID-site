(function(){
	var app= angular.module('Foodback', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise("/login");

		$stateProvider
			.state("login",{
				url: "/login",
				templateUrl: "pages/login.html",
				controller: "loginController"
			})
			.state("setup",{
				url:'/setup',
				templateUrl: "pages/setup.html",
			})
			.state("setup.diningHalls",{
				url:"/diningHalls",
				templateUrl:"pages/setup.diningHalls.html",
				controller:'diningController'
			})
			.state("setup.restrictions",{
				url:"/restrictions",
				templateUrl: "pages/setup.restrictions.html",
				controller: 'restrictionsController'
			})
			.state("home",{
				url:"/home",
				templateUrl: "pages/home.html"
			})
			.state("home.choosing",{
				url:"/choosing",
				templateUrl: "pages/home.choosing.html",
			}).
			state("home.menu",{
				url:"/menu",
				templateUrl:"pages/home.menu.html"
			}).
			state("home.feedback",{
				url:"/feedback",
				templateUrl:"pages/home.feedback.html"
			});
	});

	app.controller("loginController", function($scope){
		$scope.items = ["A","List","Of","Items"];
		
	});

	app.controller("diningController",function($scope){
		$scope.diningHalls = ["Olin","Trim", "Reynolds"];

	});

	app.controller("restrictionsController", function($scope){
		$scope.restrictions = ["Vegan","Gluten Free", "Vegetarian"];

	})



})();



