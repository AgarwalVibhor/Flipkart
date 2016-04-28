(function(){

	'use strict';
	angular.module('Flipkart').controller('HomeController', HomeController);

	HomeController.$inject = ['$scope', '$rootScope', '$http'];
	function HomeController($scope, $rootScope, $http){

		$(".nav a").on("click", function(){     // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	

		$rootScope.number  = 0;
		$rootScope.fakeTempCart = [];
		$rootScope.idTempArray = [];
		$rootScope.show = true;
		$scope.name = "0";
		$scope.warning1 = false;
		$scope.setWarning1 = setWarning1Fn;
		$scope.shoes = false;
		$scope.category = "0";
		$scope.shoesBrand = "initial";
		$scope.brand = "initial";
		$scope.show = false;
		$scope.setShow = setShowFn;
		$scope.getBrands = getBrandsFn;
		$scope.getShoesBrands = getShoesBrandsFn;
		$scope.warning2 = false;
		$scope.setWarning2 = setWarning2Fn;
		$scope.either = false;
		$scope.warning3 = false;
		$scope.setWarning3 = setWarning3Fn;
		$scope.afterHome = afterHomeFn;
		$rootScope.search = null;
		$rootScope.showItems = showItemsFn;

		function setWarning1Fn(){
			$scope.warning1 = false;
		}

		function getCategory(){
			var req = {
				method : 'GET',
				url : '/getCategory'
			};
			$http(req).then(successGetCategory, function(res){
				console.log("An error occured in the getCategoryFn -- HomeController");
			});
		}
		function successGetCategory(res){
			$scope.categories = res.data.shoes;
		}

		function setShowFn(){
			$scope.show = false;
		}

		function getBrandsFn(){
			if($scope.name == "Men's Shoes")
			{
				$scope.shoes = true;
				getCategory();
			}
			else
			{
				var req = {
					method : 'GET',
					url : '/getBrands',
					params : {
						name : $scope.name
					}
				};
				$http(req).then(successGetBrands, function(res){
					console.log("An error occured in the getBrands");
				});
			}
		}

		function getShoesBrandsFn(){
			var req = {
					method : 'GET',
					url : '/getShoesBrands'
				};
				$http(req).then(successGetShoesBrands, function(res){
					console.log("An error occured in the getting the shoe's brands");
				});
		}

		function successGetBrands(res){
			$scope.brands = res.data.brands;
		}

		function successGetShoesBrands(res){
			console.log($scope.name);
			console.log($scope.category);
			$scope.either = true;
			//$scope.shoesBrands = res.data.$scope.category;
			if($scope.category == 1)
				$scope.shoesBrands = res.data.formal;
			else
				$scope.shoesBrands = res.data.sports;
		}

		function setWarning2Fn(){
			$scope.warning2 = false;
		}
		function setWarning3Fn(){
			$scope.warning3 = false;
		}

		function afterHomeFn(){
			if($scope.name == "0")
			{
				$scope.warning1 = true;
				document.getElementById('name').focus();
				return false;
			}

			if($scope.shoes == true)
			{
				if($scope.category == "0")
				{
					$scope.show = true;
					document.getElementById('category').focus();
					return false;
				}
			}

			if($scope.either == true)
			{
				if($scope.shoesBrand == "initial")
				{
					$scope.warning2 = true;
					document.getElementById('shoesBrand').focus();
					return false;
				}
			}
			else
			{
				if($scope.brand == "initial")
				{
					$scope.warning3 = true;
					document.getElementById('brand').focus();
					return false;
				}
			}
			$rootScope.name = $scope.name;
			$rootScope.category = $scope.category;
			$rootScope.shoesBrand = $scope.shoesBrand;
			$rootScope.brand = $scope.brand;
			$('#linkHome').removeClass('active');
			$('#linkResults').addClass('active');
			window.location = '#/results';
		}

		function showItemsFn(search){
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
				$('#linkHome').removeClass('active');
				$('#linkSearch').addClass('active');
				window.location = '#/search';
			}
		}

		function successGetAllShoes(res){
			$rootScope.images = res.data.details;
			$rootScope.show = true;
			$('#linkHome').removeClass('active');
			$('#linkSearch').addClass('active');
			window.location = '#/search';
		}

		function successGetFormalShoes(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$('#linkHome').removeClass('active');
			$('#linkSearch').addClass('active');
			window.location = '#/search';
		}

		function successGetSportsShoes(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$('#linkHome').removeClass('active');
			$('#linkSearch').addClass('active');
			window.location = '#/search';
		}

		function successGetWatches(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$('#linkHome').removeClass('active');
			$('#linkSearch').addClass('active');
			window.location = '#/search';
		}

		function successGetSmartphones(res){
			$rootScope.images = res.data.images;
			$rootScope.show = true;
			$('#linkHome').removeClass('active');
			$('#linkSearch').addClass('active');
			window.location = '#/search';
		}
	}
})();