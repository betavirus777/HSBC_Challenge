var myApp = angular.module("myApp");

myApp.service("storeService",["$http","CheckRoleService","$state",Store]);

function Store($http,CheckRoleService,$state){
    this.transactionData = [];
    this.addTransaction = function(data,restaurentId){
        CheckRoleService.getUserId().then(function(data2){
            
            data.res_id = restaurentId;
            data.user_id = data2;

            var method = {
                method:'POST',
                data:data,
                url:'/api/transactions/addTransaction'
            }

            $http(method).then(function(response){
                console.log(response)
                $state.go('client.transactions',{transactId:response.data._id});
            }).catch(function(response){
                console.log(response);
            })
            this.transactionData = data;
        })       
    }
    this.getTransaction = function(){
        return this.transactionData;
    }
}