(function(){

	'use strict';
	var Flipkart = angular.module('Flipkart', ['ngRoute']);
	Flipkart.config(function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl : './views/home.html'
		})
		.when('/results', {
			templateUrl : './views/results.html'
		})
		.when('/cart', {
			templateUrl : './views/cart.html'
		})
		.when('/search', {
			templateUrl : './views/search.html'
		});
	});
})();