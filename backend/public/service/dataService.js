(function(){
    let app = angular.module("myApp");
    app.factory("dataService",["$http","$stateParams",dataService]);

    function dataService($http,$stateParams){
        return {
            getRestaurents : function(){
                var request = {
                    method:'get',
                    url:'/api/restaurents/',
                    dataType:'json',
                    contentType:'application/json'
                  };
                  return $http(request)
                    .then(function(jsonData){
                      let brandsData = jsonData.data;
                      
                      return brandsData; 
                    });
                },
            
        }
    }

})();

// angular.module('myApp').service('ItemResource', ['$resource', function ($resource) {
//     return $resource('/api/items/:id/:controller',
//     {
//         id: '@_id'
//     },
//     {
//         getByRestaurant: {method: 'GET', params: {controller: 'getByRestaurant'}, isArray: true}
//     });
// }]);