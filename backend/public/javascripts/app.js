$(function(){
   
    /** Click on Fetch data and display in HTML table **/

    $("#fetchdata").on('click', function(){

        $.get( "/fetchdata", function( data ) {

            console.log("Data Fetched",data);

            var products = data['data'];

            $("#trdata").html('');

            $("#message").hide();

            var string = '';

            $.each(products, function(index, product ) {

                string += '<tr><td>'+(index+1)+'</td><td>'+product['_id']+'</td><td>'+product['Symbol']+'</td><td>'+product['Name']+'</td><td>'+product['MarketCap']+'</td><td>'+product['Sector']+'</td><td>'+product['Industry']+'</td></tr>';

            });

            $("#trdata").html(string);

        });
    });
 
    /** Import data after click on a button */

    $("#importdata").on('click', function(){

        $.get( "/import", function( data ) {

            $("#message").show().html(data['success']);

        });

    });

});