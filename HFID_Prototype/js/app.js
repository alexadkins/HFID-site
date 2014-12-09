(function(){
	var app= angular.module('Foodback', ['ui.router', 'ngDialog']);

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
				templateUrl:"pages/home.menu.html",
				controller: 'menuCont'
			}).
			state("home.feedback",{
				url:"/feedback",
				templateUrl:"pages/home.feedback.html",
				controller: 'modalController'
			}).
			state("home.splash",{
				url:"/splash",
				templateUrl:"pages/home.splash.html"
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

	});

	app.controller("menuCont", function($scope){
		$scope.currentDay = 0;
		$scope.selectedMeal = "breakfast";
		$scope.everythingOpen = false;
		$scope.noMoreFuture = false;
		$scope.noMorePast = true;
		$scope.menuItems = [{date : "Monday", 
							'breakfast' : [{stationTitle : "Grill", stationContents: ["Grill1", "Grill2", "Grill3"], open: false}, 
										{stationTitle: "Pizza", stationContents: ["Pizza1", "Pizza2"], open:false} ] 
							}];
		$scope.allVisible = false;
		$scope.viewAll = function(){
			
			for(var i=0;i < $scope.menuItems[$scope.currentDay][$scope.selectedMeal].length; i++){
				$scope.menuItems[$scope.currentDay][$scope.selectedMeal][i].open = !$scope.everythingOpen;
			}
			$scope.everythingOpen = !$scope.everythingOpen;
		}

		$scope.checkStatus = function(stat){
			if($scope.everythingOpen == true){
				$scope.everythingOpen = false;
			}
		}

		$scope.changeDay = function(direction){
			var maxDate = 6;
			if(direction == 0){
				$scope.currentDay = $scope.currentDay+1;

			}
			if(direction == 1){
				$scope.currentDay = $scope.currentDay-1;
			}	
			$scope.noMoreFuture = false;
			$scope.noMorePast = false;
			if($scope.currentDay == maxDate){
				$scope.noMoreFuture = true;
			}
			if($scope.currentDay == 0){
				$scope.noMorePast = true;
			}
		}

		$scope.changeMeal = function(choice){
			if(choice == 0){
				$scope.selectedMeal = 'breakfast'
			}
			else if(choice == 1){
				$scope.selectedMeal = 'lunch'
			}
			else if(choice == 2){
				$scope.selectedMeal = 'dinner'
			}
		}


	});


	app.controller("modalController", function($scope, ngDialog){
		$scope.clickToOpen = function () {
       		ngDialog.open({ template: 'pages/feedbackModal.html' });

    	};

	});


})();



