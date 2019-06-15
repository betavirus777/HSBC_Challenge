(function(){

    let app = angular.module("myApp"); 
    app.service('transactionService',["$http" ,transactionService]);
    
    function transactionService($http){
        

        function Transaction(){
            
            this.order = [];
            this.new = {};
            this.totOrders = 0;
        }
        Transaction.prototype.getDate = function () {
            var today = new Date();
            var mm = today.getMonth() + 1;
            var dd = today.getDate();
            var yyyy = today.getFullYear();
    
            var date = dd + "/" + mm + "/" + yyyy
    
            return date
        };

        //ADD Order
        Transaction.prototype.addToOrder = function (item2, qty,addons=[]) {
            var isEqual = function (value2, other2) {
                if(value2.addOnApplied.length!=other2.addOnApplied.length){
                    return false;

                }else{
                    if(JSON.stringify(value2.addOnApplied)!==JSON.stringify(other2.addOnApplied)){
                        return false;
                    }

                }
                return true;
            
            };
            
            item = angular.copy(item2);
            var flag = 0;
            
            if(!item.addOnApplied){
                item.addOnApplied = [];
                item.addOnAppliedDetails = [];
            }
            if(addons.length>0){
                addons.forEach(ele=>{
                    item.addondetails.forEach(ele2=>{
                        if(ele==ele2._id){
                            item.addOnApplied.push(ele);
                            ele2copy = angular.copy(ele2);
                            ele2copy.qty = 1;    
                            item.addOnAppliedDetails.push(ele2copy);
                        }
                    })
                })
            }
            if (this.order.length > 0) {
                for (var i = 0; i < this.order.length; i++) {
                    if (item._id === this.order[i]._id) {
                        item.qty = qty;         
                        if(isEqual(this.order[i],item)){
                        
                            this.order[i].qty += qty;
                            flag = 1;
                            console.log("EQUAL HELLO");
                            
                            break;
                        }
                        

                    }
                    
                }
                if (flag === 0) {
                    item.qty = 1;
                    this.order.push(item);
                }
                if (item.qty < 1) {
                    this.order.push(item);
                }
            } else {
                item.qty = qty;
                this.order.push(item);
            }
            console.log(this.order);
            return this.order;
        };
    
        Transaction.prototype.removeOneEntity = function (item) {
            for (var i = 0; i < this.order.length; i++) {
                if (item._id === this.order[i]._id) {
                    item.qty -= 1;
                    if (item.qty === 0) {
                        this.order.splice(i, 1);
                    }
                }
            }
        };
    
        Transaction.prototype.removeItem = function (item) {
            for (var i = 0; i < this.order.length; i++) {
                if (item._id === this.order[i]._id) {
                    this.order.splice(i, 1);
                }
            }
        };
    
        Transaction.prototype.getTotal = function () {
            var tot = 0;
            var tax = 0;
            for (var i = 0; i < this.order.length; i++) {
                tax += (this.order[i].tax | 0) * this.order[i].qty;
                
                tot += (this.order[i].price * this.order[i].qty+(this.order[i].tax|0)*this.order[i].qty)
                for (var j = 0; j < this.order[i].addOnAppliedDetails.length; j++) {
                    tot += (this.order[i].addOnAppliedDetails[j].price*this.order[i].addOnAppliedDetails[j].qty);
                }
            }
        
            return [tot,tax];
        };
    
        Transaction.prototype.clearOrder = function () {
            this.order = [];
        };
    
        Transaction.prototype.checkout = function (amount) {
            
            this.order = [];
            this.totOrders += 1;
        };
        return Transaction;
    }

})();