(function () {
 
    let app = angular.module("myApp");

    app.service("CheckRoleService", ["$http","$state","growl","$q",CheckRoleService]);
    
    function CheckRoleService($http,$state,growl,$q){
        this.checkRole = function () {
            var roles = $state.$current.roles;
            var data = localStorage.getItem('secret_token');
            
            $http(
                {
                    method: 'POST',
                    url: '/api/users/checkRoles',
                }).then(function (response) {
                    console.log(response)
                    if(response.data.data && roles.includes(response.data.data.role)){
                        return response.data.role;
                    }else{
                        $state.go("login");
                    }
                    
                }).catch(function (response) {
                    $state.go("login");
                });

        }
        this.getUserId =  function () {
            var token = localStorage.getItem('secret_token');
            if(token){
             var deferred = $q.defer();
             $http(
                    {
                        method: 'POST',
                        url: '/api/users/checkRoles',
                       
                    }).then(function (response) {
                        
                        deferred.resolve(response.data.data._id);
                    }).catch(function (response) {
                        deferred.reject(response);
                        $state.go("login");
                    });
                
                return deferred.promise;
            }else{
                growl.warning("Please Login And then Only you can Order!!",{
                    onclose:function(){
                        $state.go("login");
                    }
                });

                
            }

        }
        this.logout = function(){
            localStorage.removeItem("secret_token");
            growl.success("You are Logged out Succesfully!",{
                onclose : function(){
                 $state.go("login");
                },
                ttl:1000
            })
        }
        return this;
    }
    
})();