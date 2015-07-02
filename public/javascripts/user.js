/**
 * Created by kliu on 01/07/2015.
 */

$("#modify_basic").on('click', function(){
    $("#basic input").attr("disabled", false);
    $("#basic textarea").attr("disabled", false);
    $("#basic button").show();
});