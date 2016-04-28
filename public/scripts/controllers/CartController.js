(function(){

	'use strict';
	angular.module('Flipkart').controller('CartController', CartController);
	CartController.$inject = ['$scope', '$rootScope', '$http'];

	function CartController($scope, $rootScope, $http){

		$(".nav a").on("click", function(){     // Used for the active link on the navigation bar inverse-collapse.
		   $(".nav").find(".active").removeClass("active");
		   $(this).parent().addClass("active");
		});	

		$scope.showDetails = showDetailsFn;
		$scope._allItems = $rootScope.fakeCart;
		$scope._noOfItems = $rootScope.fakeCart.length;

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
	}
})();