(function(){
	var app= angular.module('Foodback', ['ui.router', 'ngDialog','shoppinpal.mobile-menu']);

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
			.state("home.restrictions",{
				url:"/restrictions",
				templateUrl: "pages/home.restrictions.html",
				controller: 'restrictionsFinalController'
			})
			.state("home.diningHalls",{
				url:"/diningHalls",
				templateUrl: "pages/home.diningHalls.html",
				controller: 'diningFinalController'
			})
			.state("home.choosing",{
				url:"/choosing",
				templateUrl: "pages/home.choosing.html",
				controller: "choosingController"
			})
			.state("home.menu",{
				url:"/menu",
				templateUrl:"pages/home.menu.html",
				controller: 'menuCont'
			})
			.state("home.feedback",{
				url:"/feedback",
				templateUrl:"pages/home.feedback.html",
				controller: 'modalController'
			})
			.state("home.aboutUs",{
				url:"/aboutUs",
				templateUrl:"pages/home.aboutUs.html"
			})
			.state("home.splash",{
				url:"/splash",
				templateUrl:"pages/home.splash.html"
			})
			.state("home.help",{
				url:"/help",
				templateUrl:"pages/home.help.html"
			});
	});

	app.controller("loginController", function($scope){
		$scope.items = ["A","List","Of","Items"];
		
	});

	app.controller("diningController",function($scope,$rootScope){
		$scope.chosenStatus = function(hall, hallStatus) {
			hall.selected = hallStatus
		}

		$rootScope.diningHalls = [
								{name: "Olin", selected: false},
								{name: "Trim", selected: false},
								{name: "Reynolds", selected: false}
								];
	});

	app.controller("restrictionsController", function($scope,$rootScope){
		$scope.chosenStatus = function(restrict, restStatus) {
			restrict.selected = restStatus
		}

		$rootScope.restrictions = [
								{name: "Vegan", selected: false},
								{name: "Gluten Free", selected: false},
								{name: "Vegetarian", selected: false}
								];

	});

	app.controller("restrictionsFinalController", function($scope,$rootScope){
		if ($rootScope.restrictions) {
			$scope.restrictions = $rootScope.restrictions;
		}
		else {
			$rootScope.restrictions = [
								{name: "Vegan", selected: false},
								{name: "Gluten Free", selected: false},
								{name: "Vegetarian", selected: false}
								];
		}
		$rootScope.restrictions = $scope.restrictions;
		
	});

	app.controller("diningFinalController", function($scope,$rootScope){
		if ($rootScope.diningHalls) {
			$scope.diningHalls = $rootScope.diningHalls;
		}
		else {
			$rootScope.diningHalls = [
								{name: "Olin", selected: false},
								{name: "Trim", selected: false},
								{name: "Reynolds", selected: false}
								];
		}
	});

	app.controller("sidebarController", function($scope,$rootScope){
		$scope.sidebarItems = [{name: "Dietary Preferences", link: "home.restrictions"},{name:"Add Dining Halls", link: "home.diningHalls"} , {name:"About", link:"home.aboutUs"}, {name:"Help", link:"home.help"}];
		$scope.overlayOn = false;

		$rootScope.overlayToggle = function() {
			$scope.overlayOn = !$scope.overlayOn
		}

		$rootScope.overlayOn = function() {
			if ($scope.overlayOn == true){
				return true;
			}
			else {
				return false;
			}
		}

	});

	app.controller("navbarController", function($scope, $rootScope){
		$rootScope.changeSelected = function(choice){
			$scope.selectionNum = choice;
		}
	});

	app.controller("menuCont", function($scope){
		$scope.currentDay = 0;
		$scope.mealNumber = 0;
		$scope.selectedMeal = "breakfast";
		$scope.everythingOpen = false;
		$scope.noMoreFuture = false;
		$scope.noMorePast = true;
		$scope.menuItems = [{date : "Monday", 
							'breakfast' : [{stationTitle : "Hot Cereal", stationContents: ["Oatmeal", "Cream of Wheat", "Basmati Rice"], open: false}, 
										{stationTitle: "Entree", stationContents: ["Hard Cooked Eggs", "Turkey Sausage Links", "French Fried Tater Tots"], open:false},
										{stationTitle: "Grill", stationContents: ["Omelet Bar","Scrambled Eggs", "Pancakes", "Egg and Cheese Biscuit"], open:false},
										{stationTitle: "Bread", stationContents: ["Apple and Cinnimon Muffins"], open:false}],
							'lunch'		: [{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Vegetable Chili"], open:false},
										{stationTitle: "Pizza", stationContents: ["Cheese Pizza","Hot Italian Sausage Pizza", "Trainwreck Pizza Casserete", "Vegetable Lo Mein"], open:false},
										{stationTitle: "Entree", stationContents: ["Thai BBQ Salmon", "Confetti Rice", "Fresh Broccoli"], open:false},
										{stationTitle: "Dessert", stationContents: ["Chocolate Brownie", "Peach Shortcake Pudding Cup"], open:false},
										{stationTitle: "International", stationContents: ["Indian Spiced Roasted Potatoes", "Indian Garbanzo Beans", "Channa Masala", "Vegetable Biriyani", "Chicken Tikka Masala", "Vegetable Samosa"], open:false}],
							'dinner'	:[{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Eggplant Parmesan Casserole", "Quinoa Salad Plate"], open:false},
										{stationTitle: "Pizza", stationContents: ["Chicken Florentine Pizza", "Margherita Pizza", "Breadsticks", "Tofu Lo Mein Stir Fry", "Trainwreck Pasta Casserete"], open:false},
										{stationTitle: "Entree", stationContents: ["Arroz Verde", "Aztec Corn", "Roasted Southwestern Vegetables", "Chicken Enchilada"], open:false},
										{stationTitle: "Grill", stationContents: ["Cheeseburger", "Cheese Quesadilla", "Chicken BBQ Sandwich", "French Fries"], open:false},
										{stationTitle: "Dessert", stationContents: ["Bannana Cream Pie", "Chocolate Chip Bread Pudding"], open:false}]			
							},
							{date : "Tuesday", 
							'breakfast' : [{stationTitle : "Hot Cereal", stationContents: ["Oatmeal", "Cream of Wheat", "Basmati Rice"], open: false}, 
										{stationTitle: "Entree", stationContents: ["Hard Cooked Eggs", "Turkey Sausage Links", "French Fried Tater Tots"], open:false},
										{stationTitle: "Grill", stationContents: ["Omelet Bar","Scrambled Eggs", "Pancakes", "Egg and Cheese Biscuit"], open:false},
										{stationTitle: "Bread", stationContents: ["Apple and Cinnimon Muffins"], open:false}],
							'lunch'		: [{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Vegetable Chili"], open:false},
										{stationTitle: "Pizza", stationContents: ["Cheese Pizza","Hot Italian Sausage Pizza", "Trainwreck Pizza Casserete", "Vegetable Lo Mein"], open:false},
										{stationTitle: "Entree", stationContents: ["Thai BBQ Salmon", "Confetti Rice", "Fresh Broccoli"], open:false},
										{stationTitle: "Dessert", stationContents: ["Chocolate Brownie", "Peach Shortcake Pudding Cup"], open:false},
										{stationTitle: "International", stationContents: ["Indian Spiced Roasted Potatoes", "Indian Garbanzo Beans", "Channa Masala", "Vegetable Biriyani", "Chicken Tikka Masala", "Vegetable Samosa"], open:false}],
							'dinner'	:[{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Eggplant Parmesan Casserole", "Quinoa Salad Plate"], open:false},
										{stationTitle: "Pizza", stationContents: ["Chicken Florentine Pizza", "Margherita Pizza", "Breadsticks", "Tofu Lo Mein Stir Fry", "Trainwreck Pasta Casserete"], open:false},
										{stationTitle: "Entree", stationContents: ["Arroz Verde", "Aztec Corn", "Roasted Southwestern Vegetables", "Chicken Enchilada"], open:false},
										{stationTitle: "Grill", stationContents: ["Cheeseburger", "Cheese Quesadilla", "Chicken BBQ Sandwich", "French Fries"], open:false},
										{stationTitle: "Dessert", stationContents: ["Bannana Cream Pie", "Chocolate Chip Bread Pudding"], open:false}]			
							},
							{date : "Wednesday", 
							'breakfast' : [{stationTitle : "Hot Cereal", stationContents: ["Oatmeal", "Cream of Wheat", "Basmati Rice"], open: false}, 
										{stationTitle: "Entree", stationContents: ["Hard Cooked Eggs", "Turkey Sausage Links", "French Fried Tater Tots"], open:false},
										{stationTitle: "Grill", stationContents: ["Omelet Bar","Scrambled Eggs", "Pancakes", "Egg and Cheese Biscuit"], open:false},
										{stationTitle: "Bread", stationContents: ["Apple and Cinnimon Muffins"], open:false}],
							'lunch'		: [{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Vegetable Chili"], open:false},
										{stationTitle: "Pizza", stationContents: ["Cheese Pizza","Hot Italian Sausage Pizza", "Trainwreck Pizza Casserete", "Vegetable Lo Mein"], open:false},
										{stationTitle: "Entree", stationContents: ["Thai BBQ Salmon", "Confetti Rice", "Fresh Broccoli"], open:false},
										{stationTitle: "Dessert", stationContents: ["Chocolate Brownie", "Peach Shortcake Pudding Cup"], open:false},
										{stationTitle: "International", stationContents: ["Indian Spiced Roasted Potatoes", "Indian Garbanzo Beans", "Channa Masala", "Vegetable Biriyani", "Chicken Tikka Masala", "Vegetable Samosa"], open:false}],
							'dinner'	:[{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Eggplant Parmesan Casserole", "Quinoa Salad Plate"], open:false},
										{stationTitle: "Pizza", stationContents: ["Chicken Florentine Pizza", "Margherita Pizza", "Breadsticks", "Tofu Lo Mein Stir Fry", "Trainwreck Pasta Casserete"], open:false},
										{stationTitle: "Entree", stationContents: ["Arroz Verde", "Aztec Corn", "Roasted Southwestern Vegetables", "Chicken Enchilada"], open:false},
										{stationTitle: "Grill", stationContents: ["Cheeseburger", "Cheese Quesadilla", "Chicken BBQ Sandwich", "French Fries"], open:false},
										{stationTitle: "Dessert", stationContents: ["Bannana Cream Pie", "Chocolate Chip Bread Pudding"], open:false}]			
							},
							{date : "Thursday", 
							'breakfast' : [{stationTitle : "Hot Cereal", stationContents: ["Oatmeal", "Cream of Wheat", "Basmati Rice"], open: false}, 
										{stationTitle: "Entree", stationContents: ["Hard Cooked Eggs", "Turkey Sausage Links", "French Fried Tater Tots"], open:false},
										{stationTitle: "Grill", stationContents: ["Omelet Bar","Scrambled Eggs", "Pancakes", "Egg and Cheese Biscuit"], open:false},
										{stationTitle: "Bread", stationContents: ["Apple and Cinnimon Muffins"], open:false}],
							'lunch'		: [{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Vegetable Chili"], open:false},
										{stationTitle: "Pizza", stationContents: ["Cheese Pizza","Hot Italian Sausage Pizza", "Trainwreck Pizza Casserete", "Vegetable Lo Mein"], open:false},
										{stationTitle: "Entree", stationContents: ["Thai BBQ Salmon", "Confetti Rice", "Fresh Broccoli"], open:false},
										{stationTitle: "Dessert", stationContents: ["Chocolate Brownie", "Peach Shortcake Pudding Cup"], open:false},
										{stationTitle: "International", stationContents: ["Indian Spiced Roasted Potatoes", "Indian Garbanzo Beans", "Channa Masala", "Vegetable Biriyani", "Chicken Tikka Masala", "Vegetable Samosa"], open:false}],
							'dinner'	:[{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Eggplant Parmesan Casserole", "Quinoa Salad Plate"], open:false},
										{stationTitle: "Pizza", stationContents: ["Chicken Florentine Pizza", "Margherita Pizza", "Breadsticks", "Tofu Lo Mein Stir Fry", "Trainwreck Pasta Casserete"], open:false},
										{stationTitle: "Entree", stationContents: ["Arroz Verde", "Aztec Corn", "Roasted Southwestern Vegetables", "Chicken Enchilada"], open:false},
										{stationTitle: "Grill", stationContents: ["Cheeseburger", "Cheese Quesadilla", "Chicken BBQ Sandwich", "French Fries"], open:false},
										{stationTitle: "Dessert", stationContents: ["Bannana Cream Pie", "Chocolate Chip Bread Pudding"], open:false}]			
							},
							{date : "Friday", 
							'breakfast' : [{stationTitle : "Hot Cereal", stationContents: ["Oatmeal", "Cream of Wheat", "Basmati Rice"], open: false}, 
										{stationTitle: "Entree", stationContents: ["Hard Cooked Eggs", "Turkey Sausage Links", "French Fried Tater Tots"], open:false},
										{stationTitle: "Grill", stationContents: ["Omelet Bar","Scrambled Eggs", "Pancakes", "Egg and Cheese Biscuit"], open:false},
										{stationTitle: "Bread", stationContents: ["Apple and Cinnimon Muffins"], open:false}],
							'lunch'		: [{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Vegetable Chili"], open:false},
										{stationTitle: "Pizza", stationContents: ["Cheese Pizza","Hot Italian Sausage Pizza", "Trainwreck Pizza Casserete", "Vegetable Lo Mein"], open:false},
										{stationTitle: "Entree", stationContents: ["Thai BBQ Salmon", "Confetti Rice", "Fresh Broccoli"], open:false},
										{stationTitle: "Dessert", stationContents: ["Chocolate Brownie", "Peach Shortcake Pudding Cup"], open:false},
										{stationTitle: "International", stationContents: ["Indian Spiced Roasted Potatoes", "Indian Garbanzo Beans", "Channa Masala", "Vegetable Biriyani", "Chicken Tikka Masala", "Vegetable Samosa"], open:false}],
							'dinner'	:[{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Eggplant Parmesan Casserole", "Quinoa Salad Plate"], open:false},
										{stationTitle: "Pizza", stationContents: ["Chicken Florentine Pizza", "Margherita Pizza", "Breadsticks", "Tofu Lo Mein Stir Fry", "Trainwreck Pasta Casserete"], open:false},
										{stationTitle: "Entree", stationContents: ["Arroz Verde", "Aztec Corn", "Roasted Southwestern Vegetables", "Chicken Enchilada"], open:false},
										{stationTitle: "Grill", stationContents: ["Cheeseburger", "Cheese Quesadilla", "Chicken BBQ Sandwich", "French Fries"], open:false},
										{stationTitle: "Dessert", stationContents: ["Bannana Cream Pie", "Chocolate Chip Bread Pudding"], open:false}]			
							},
							{date : "Saturday", 
							'breakfast' : [{stationTitle : "Hot Cereal", stationContents: ["Oatmeal", "Cream of Wheat", "Basmati Rice"], open: false}, 
										{stationTitle: "Entree", stationContents: ["Hard Cooked Eggs", "Turkey Sausage Links", "French Fried Tater Tots"], open:false},
										{stationTitle: "Grill", stationContents: ["Omelet Bar","Scrambled Eggs", "Pancakes", "Egg and Cheese Biscuit"], open:false},
										{stationTitle: "Bread", stationContents: ["Apple and Cinnimon Muffins"], open:false}],
							'lunch'		: [{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Vegetable Chili"], open:false},
										{stationTitle: "Pizza", stationContents: ["Cheese Pizza","Hot Italian Sausage Pizza", "Trainwreck Pizza Casserete", "Vegetable Lo Mein"], open:false},
										{stationTitle: "Entree", stationContents: ["Thai BBQ Salmon", "Confetti Rice", "Fresh Broccoli"], open:false},
										{stationTitle: "Dessert", stationContents: ["Chocolate Brownie", "Peach Shortcake Pudding Cup"], open:false},
										{stationTitle: "International", stationContents: ["Indian Spiced Roasted Potatoes", "Indian Garbanzo Beans", "Channa Masala", "Vegetable Biriyani", "Chicken Tikka Masala", "Vegetable Samosa"], open:false}],
							'dinner'	:[{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Eggplant Parmesan Casserole", "Quinoa Salad Plate"], open:false},
										{stationTitle: "Pizza", stationContents: ["Chicken Florentine Pizza", "Margherita Pizza", "Breadsticks", "Tofu Lo Mein Stir Fry", "Trainwreck Pasta Casserete"], open:false},
										{stationTitle: "Entree", stationContents: ["Arroz Verde", "Aztec Corn", "Roasted Southwestern Vegetables", "Chicken Enchilada"], open:false},
										{stationTitle: "Grill", stationContents: ["Cheeseburger", "Cheese Quesadilla", "Chicken BBQ Sandwich", "French Fries"], open:false},
										{stationTitle: "Dessert", stationContents: ["Bannana Cream Pie", "Chocolate Chip Bread Pudding"], open:false}]			
							},
							{date : "Sunday", 
							'breakfast' : [{stationTitle : "Hot Cereal", stationContents: ["Oatmeal", "Cream of Wheat", "Basmati Rice"], open: false}, 
										{stationTitle: "Entree", stationContents: ["Hard Cooked Eggs", "Turkey Sausage Links", "French Fried Tater Tots"], open:false},
										{stationTitle: "Grill", stationContents: ["Omelet Bar","Scrambled Eggs", "Pancakes", "Egg and Cheese Biscuit"], open:false},
										{stationTitle: "Bread", stationContents: ["Apple and Cinnimon Muffins"], open:false}],
							'lunch'		: [{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Vegetable Chili"], open:false},
										{stationTitle: "Pizza", stationContents: ["Cheese Pizza","Hot Italian Sausage Pizza", "Trainwreck Pizza Casserete", "Vegetable Lo Mein"], open:false},
										{stationTitle: "Entree", stationContents: ["Thai BBQ Salmon", "Confetti Rice", "Fresh Broccoli"], open:false},
										{stationTitle: "Dessert", stationContents: ["Chocolate Brownie", "Peach Shortcake Pudding Cup"], open:false},
										{stationTitle: "International", stationContents: ["Indian Spiced Roasted Potatoes", "Indian Garbanzo Beans", "Channa Masala", "Vegetable Biriyani", "Chicken Tikka Masala", "Vegetable Samosa"], open:false}],
							'dinner'	:[{stationTitle : "Soup", stationContents: ["Potato Leek Soup", "Chicken and Rice Soup"], open: false}, 
										{stationTitle: "Vegetarian", stationContents: ["Eggplant Parmesan Casserole", "Quinoa Salad Plate"], open:false},
										{stationTitle: "Pizza", stationContents: ["Chicken Florentine Pizza", "Margherita Pizza", "Breadsticks", "Tofu Lo Mein Stir Fry", "Trainwreck Pasta Casserete"], open:false},
										{stationTitle: "Entree", stationContents: ["Arroz Verde", "Aztec Corn", "Roasted Southwestern Vegetables", "Chicken Enchilada"], open:false},
										{stationTitle: "Grill", stationContents: ["Cheeseburger", "Cheese Quesadilla", "Chicken BBQ Sandwich", "French Fries"], open:false},
										{stationTitle: "Dessert", stationContents: ["Bannana Cream Pie", "Chocolate Chip Bread Pudding"], open:false}]			
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
			if(direction == 0 && $scope.currentDay < 6 ){
				$scope.currentDay = $scope.currentDay+1;

			}
			if(direction == 1 && $scope.currentDay > 0 ){
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
			$scope.mealNumber = choice;
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

	app.controller("choosingController", function($scope){

		$scope.getPercentages = function(){
			var num1 = Math.floor(Math.random()*100);
			var num2 = Math.floor(Math.random()*(100-num1));
			var num3 = Math.floor(Math.random()*(100-num1-num2));
			var num4 = 100-num1-num2-num3;
			console.log(num1+num2+num3+num4);
			console.log([num1,num2,num3,num4]);
			return [num1,num2,num3,num4];
		}

		$scope.mealData = [{date : "Wednesday", 
							'lunch' : [{names:['Macaroni and Cheese','Spaghetti and Marinara','Fettucine Alfredo', 'Ravioli Bar'], chosen: 4, results: false},{names:['Cheese Pizza',"Florentine Pizza", "Meatlovers Pizza", "Macaroni Pizza"], chosen: 4, results:false}],
							'dinner': [{names:['Herb Grilled Chicken','Kung Pao Chicken','Peruvian Lime Chicken','Chicken Breast Saltimbocca'], chosen: 4, results: false}, {names:['Grilled Cheese','Turkey Sandwich','Tuna Salad Sandwich','Caprese Sandwich'], chosen:4, results:false}]
							},
							{date : "Thursday", 
							'lunch' : [{names:['Macaroni and Cheese','Spaghetti and Marinara','Fettucine Alfredo', 'Ravioli Bar'], chosen: 4, results: false},{names:['Cheese Pizza',"Florentine Pizza", "Meatlovers Pizza", "Macaroni Pizza"], chosen: 4, results:false}],
							'dinner': [{names:['Herb Grilled Chicken','Kung Pao Chicken','Peruvian Lime Chicken','Chicken Breast Saltimbocca'], chosen: 4, results: false}, {names:['Grilled Cheese','Turkey Sandwich','Tuna Salad Sandwich','Caprese Sandwich'], chosen:4, results:false}]
							},
							{date : "Friday", 
							'lunch' : [{names:['Macaroni and Cheese','Spaghetti and Marinara','Fettucine Alfredo', 'Ravioli Bar'], chosen: 4, results: false},{names:['Cheese Pizza',"Florentine Pizza", "Meatlovers Pizza", "Macaroni Pizza"], chosen: 4, results:false}],
							'dinner': [{names:['Herb Grilled Chicken','Kung Pao Chicken','Peruvian Lime Chicken','Chicken Breast Saltimbocca'], chosen: 4, results: false}, {names:['Grilled Cheese','Turkey Sandwich','Tuna Salad Sandwich','Caprese Sandwich'], chosen:4, results:false}]
							},
							{date : "Saturday", 
							'lunch' : [{names:['Macaroni and Cheese','Spaghetti and Marinara','Fettucine Alfredo', 'Ravioli Bar'], chosen: 4, results: false},{names:['Cheese Pizza',"Florentine Pizza", "Meatlovers Pizza", "Macaroni Pizza"], chosen: 4, results:false}],
							'dinner': [{names:['Herb Grilled Chicken','Kung Pao Chicken','Peruvian Lime Chicken','Chicken Breast Saltimbocca'], chosen: 4, results: false}, {names:['Grilled Cheese','Turkey Sandwich','Tuna Salad Sandwich','Caprese Sandwich'], chosen:4, results:false}]
							},
							{date : "Sunday", 
							'lunch' : [{names:['Macaroni and Cheese','Spaghetti and Marinara','Fettucine Alfredo', 'Ravioli Bar'], chosen: 4, results: false},{names:['Cheese Pizza',"Florentine Pizza", "Meatlovers Pizza", "Macaroni Pizza"], chosen: 4, results:false}],
							'dinner': [{names:['Herb Grilled Chicken','Kung Pao Chicken','Peruvian Lime Chicken','Chicken Breast Saltimbocca'], chosen: 4, results: false}, {names:['Grilled Cheese','Turkey Sandwich','Tuna Salad Sandwich','Caprese Sandwich'], chosen:4, results:false}]
							}];

		$scope.callResult = function(){
			for(var i=0; i<$scope.mealData.length; i++){
				for(var l=0; l<2; l++){
					if($scope.mealData[i]['lunch'][l].chosen != 4){
						$scope.mealData[i]['lunch'][l].results = true;
					}
					if($scope.mealData[i]['dinner'][l].chosen != 4){
						$scope.mealData[i]['dinner'][l].results = true;
					}
					
					
				}	
			}
		}				

		$scope.selectChoice = function(date,mealType,mealNumber,optionChoice){
			var day = $scope.mealData.indexOf(date);
			var mealChoice = $scope.mealData[day][mealType].indexOf(mealNumber);
			var choiceNumber = $scope.mealData[day][mealType][mealChoice].names.indexOf(optionChoice);
			if($scope.mealData[day][mealType][mealChoice].chosen == choiceNumber){
				$scope.mealData[day][mealType][mealChoice].chosen = 4;
				
			}
			else{
				$scope.mealData[day][mealType][mealChoice].chosen = choiceNumber;
	
			}
			
		}	

		$scope.checkIfSelected = function(date, mealType,mealNumber, optionChoice){
			var day = $scope.mealData.indexOf(date);
			var mealChoice = $scope.mealData[day][mealType].indexOf(mealNumber);
			var choiceNumber = $scope.mealData[day][mealType][mealChoice].names.indexOf(optionChoice);
			if(choiceNumber == $scope.mealData[day][mealType][mealChoice].chosen){
				return false;
			}
			else{
				return true;
			}
		}	

	
		$scope.indexFinder = function(mealing,opt){
			return mealing.names.indexOf(opt);
		}			
							
	});


	app.controller("modalController", function($scope, ngDialog){
		$scope.clickToOpen = function () {
       		ngDialog.open({ template: 'pages/feedbackModal.html', className: 'ngdialog-theme-default' });

    	};

	});


})();



