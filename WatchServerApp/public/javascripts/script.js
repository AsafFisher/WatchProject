/**
 * Created by asaf on 10/25/16.
 */
var sendreq = function () {
    var status = 0;
    if($("#isOnButton").text()=="on"){
        status = 0;
    }else if($("#isOnButton").text()=="off"){
        status = 1;
    }
    $.ajax({url:'/send',type:'POST',dataType:'json',data:{"Status":status},success:function (data) {
        if(data.success==1){
            $("#isOnButton").text("on");
        }else if(data.success==0){
            $("#isOnButton").text("off");
        }

    },error:function (e) {
        console.log("Error");
    }})
}