(function(){
    let app = angular.module("myApp");
    app.service("PagerService",PagerService);
    
    function PagerService(){
        var service = {};

        service.GetPager = GetPager;
        return service;
        
        function GetPager(totalItems,curentPage,pageSize){
            curentPage = curentPage || 1;
            pageSize = pageSize || 3;

            var totalPages = Math.ceil(totalItems/pageSize);

            var startPage,endPage;
            if(totalPages<=6){
                startPage = 1;
                endPage = totalPages
            }else{
                if(curentPage<=3){
                    startPage = 1;
                    endPage = 6;
                }else if(curentPage+2>totalPages){
                    startPage = curentPage - 5;
                    endPage = totalPages
                }else{
                    startPage = curentPage - 2;
                    endPage = curentPage + 3;
                }
            }
            var startIndex = (curentPage - 1) * pageSize;
            var pages = []
            for (var i = startPage; i <= endPage; i += 1) {
                pages.push(i);
            }
            return {
                totalItems: totalItems,
                curentPage: curentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                pages:pages
            };

        }
    }
})();