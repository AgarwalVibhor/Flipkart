(function(){

	'use strict';
	angular.module('Flipkart').controller('SearchController', SearchController);
	SearchController.$inject = ['$scope', '$rootScope', '$http', '$route'];

	function SearchController($scope, $rootScope, $http, $route){

		$(".nav a").on("click", function(){     // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	

		$scope.show = $rootScope.show;
		$scope.search = $rootScope.search;
		$scope.images = $rootScope.images;
		$scope.showDetails = showDetailsFn;
		$scope.ascending = true;
		$scope.setAscending = setAscendingFn;
		$scope.setDescending = setDescendingFn;
		$scope.addCart = addCartFn;
		$rootScope.idArray = $rootScope.idTempArray;
		$rootScope.fakeCart = $rootScope.fakeTempCart;
		$rootScope.cart = $rootScope.number;
		$rootScope.transferCart = transferCartFn;
		$rootScope.showItems = showItemsFn;

		function showDetailsFn(image){
			bootbox.dialog({
				title : 'Product Details',
				message : '<div class="row">' + 
	                	       '<div class="col-md-12">' +
		                            '<img src="' + image.image + '" alt="Product Image" style="width: 400px; height: 400px; margin-left: 100px;">' +
		                      		'<br>' +
									'<br>' +
									'<label style="margin-left: 20px;">Product ID :</label>' +
									'<span style="margin-left: 20px;">' + image.id + '</span>' +
		 							'<hr />' + 
									'<label style="margin-left: 20px;"> Product Model :</label>' +
									'<span style="margin-left: 20px;">' + image.model + '</span>' +
		 							'<hr />' + 
									'<label style="margin-left: 20px;">Product Details :</label>' +
									'<span style="margin-left: 20px;">' + image.details + '</span>' +
									'<hr />' +
									'<label style="margin-left: 20px;">In Stock :</label>' +
									'<span style="margin-left: 20px;">' + image.stock + '</span>' +
									'<hr />' +
									'<label style="margin-left: 20px;"> Product Price :</label>' +
									'<span style="margin-left: 20px;"><i class="fa fa-inr" style="font-size: 15px;"></i>' + image.price + '</span>' +
								'</div>' +
							'</div>',
			    buttons : {
			    	danger : {
			    		label: "< Back",
			    		className : 'btn-danger',
			    		callback : function(){

			    		}
			    	}
			    }				
			});
		}

		function setAscendingFn(){
			$scope.ascending = true;
		}
		function setDescendingFn(){
			$scope.ascending = false;
		}

		function addCartFn(image){

			if($rootScope.idArray.indexOf(image.id) == -1)
			{
				$rootScope.cart = $rootScope.cart + 1;
				$rootScope.idArray.push(image.id);
				$rootScope.fakeCart.push(image);
			}
			else
			{
				bootbox.alert("This item has already been added to the cart. You cannot add it again.", function(){

				});
			}
			$rootScope.number = $rootScope.cart;
			$rootScope.idTempArray = $rootScope.idArray;
			$rootScope.fakeTempCart = $rootScope.fakeCart;
		}

		function transferCartFn(){
			window.location = '#/cart';
			$('#linkSearch').removeClass('active');
			$('#linkCart').addClass('active');
		}

		function showItemsFn(search){

			console.log($rootScope.search);
			console.log($scope.search);

			if(($rootScope.search == "shoes") || ($rootScope.search == "Shoes") || ($rootScope.search == "SHOES") || ($rootScope.search == "shoe") || ($rootScope.search == "Shoe") || ($rootScope.search == "SHOE"))
			{
				var req = {
					method : 'GET',
					url : '/getAllShoes',
					params : {
						brand : 0
					}
				};
				$http(req).then(successGetAllShoes, function(res){
					console.log("An error occured in getting all shoes -- HomeController");
				});
			}
			else if(($rootScope.search == "Formal Shoes") || ($rootScope.search == "formal shoes") || ($rootScope.search == "Formal shoes") || ($rootScope.search == "FORMAL SHOES") || ($rootScope.search == "formal_shoes"))
			{
				var req = {
					method : 'GET',
					url : '/getFormalShoesImages',
					params : {
						shoesBrand : 0
					}
				};
				$http(req).then(successGetFormalShoes, function(res){
					console.log("An error occured in getting the formal shoes -- HomeController");
				});
			}
			else if(($rootScope.search == "Sports Shoes") || ($rootScope.search == "sports shoes") || ($rootScope.search == "Sports shoes") || ($rootScope.search == "SPORTS SHOES") || ($rootScope.search == "sports_shoes"))
			{
				var req = {
					method : 'GET',
					url : '/getSportsShoesImages',
					params : {
						shoesBrand : 0
					}
				};
				$http(req).then(successGetSportsShoes, function(res){
					console.log("An error occured in getting the sports shoes -- HomeController");
				});
			}
			else if(($rootScope.search == "watches") || ($rootScope.search == "Watches") || ($rootScope.search == "WATCHES"))
			{
				var req = {
					method : 'GET',
					url : '/getProductImages',
					params : {
						name : "watches",
						brand : 0
					}
				};
				$http(req).then(successGetWatches, function(res){
					console.log("An error occured in getting the watches -- HomeController");
				});
			}
			else if($rootScope.search == "smartphones")
			{
				var req = {
					method : 'GET',
					url : '/getProductImages',
					params : {
						name : "smartphones",
						brand : 0
					}
				};
				$http(req).then(successGetSmartphones, function(res){
					console.log("An error occured in getting the smartphones -- HomeController");
				});
			}
			else
			{
				$rootScope.show = false;
				$route.reload();
			}
		}

		function successGetAllShoes(res){
			$rootScope.images = res.data.details;
			$rootScope.show = true;
			$route.reload();  // $route.reload() causes to reinitialize the controller.
			                  // $route is a service. Inject it in the controller.

		}

		function successGetFormalShoes(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$route.reload();  // $route.reload() causes to reinitialize the controller.
			                  // $route is a service. Inject it in the controller.
		}

		function successGetSportsShoes(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$route.reload();   // $route.reload() causes to reinitialize the controller.
			                  // $route is a service. Inject it in the controller.
		}

		function successGetWatches(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$route.reload();  // $route.reload() causes to reinitialize the controller.
			                  // $route is a service. Inject it in the controller.
		}

		function successGetSmartphones(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$route.reload();   // $route.reload() causes to reinitialize the controller.
			                  // $route is a service. Inject it in the controller.
		} 

	}
})();