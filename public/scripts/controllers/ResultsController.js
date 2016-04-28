(function(){

	'use strict';
	angular.module('Flipkart').controller('ResultsController', ResultsController);
	ResultsController.$inject = ['$scope', '$rootScope', '$http'];

	function ResultsController($scope, $rootScope, $http){

		$(".nav a").on("click", function(){     // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	

		$scope.images = $rootScope.images;
		$rootScope.cart = $rootScope.number;
		$rootScope.idArray = $rootScope.idTempArray;
		$scope.category = $rootScope.category;
		$scope.shoesBrand = $rootScope.shoesBrand;
		$scope.brand = $rootScope.brand;
		$scope.getImages = getImagesFn;
		$scope.showDetails = showDetailsFn;
		$scope.addCart = addCartFn;
		$scope.ascending = true;
		$scope.setAscending = setAscendingFn;
		$scope.setDescending = setDescendingFn;
		$rootScope.transferCart = transferCartFn;
		$rootScope.fakeCart = $rootScope.fakeTempCart;

		function getImagesFn(){
			if($scope.name == "Men's Shoes")
			{
				if($scope.category == 1)
				{
					var req = {
						method : 'GET',
						url : '/getFormalShoesImages',
						params : {
							shoesBrand : $scope.shoesBrand
						}
					};
					$http(req).then(successGetFormalShoes, function(res){
						console.log("An error occured in getting the formal shoes -- ResultsController");
					});
				}
				else
				{
					var req = {
						method : 'GET',
						url : '/getSportsShoesImages',
						params : {
							shoesBrand : $scope.shoesBrand
						}
					};
					$http(req).then(successGetSportsShoes, function(res){
						console.log("An error occured in getting the sports shoes images -- ResultsController");
					});
				}
			}
			else
			{
				var req = {
					method : 'GET',
					url : '/getProductImages',
					params : {
						name : $scope.name,
						brand : $scope.brand
					}
				};
				$http(req).then(successGetProducts, function(res){
					console.log("An error occured in getting the product images -- ResultsController");
				});
			}
		}

		function successGetFormalShoes(res){
			$scope.images = res.data.images;
		}
		function successGetSportsShoes(res){
			$scope.images = res.data.images;
		}
		function successGetProducts(res){
			$scope.images = res.data.images;
		}

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
			$rootScope.fakeTempCart = $rootScope.fakeCart;
			$rootScope.idTempArray = $rootScope.idArray;
		}

		function setAscendingFn(){
			$scope.ascending = true;
		}
		function setDescendingFn(){
			$scope.ascending = false;
		}

		function transferCartFn(){
			window.location = '#/cart';
			$('#linkResults').removeClass('active');
			$('#linkCart').addClass('active');
		}

		$scope.getImages();
	}
})();