(function(){
    
  var app = angular.module("myApp");
  app.config(function($stateProvider,$urlRouterProvider){
	
	$urlRouterProvider.otherwise('/error')
	
	$stateProvider
	
});

})();