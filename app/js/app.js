'use strict';

var eventsApp = angular.module('eventsApp', []);

$(document).ready(function(){
    
    var answerHolder ;
    
    $(".newQuestion").click(function(){
        $(".overlay").fadeIn();
        $(".input_box").fadeIn();
        $("body").css("overflow-y","hidden");
        $(".blur").css("filter","blur(5px)");
    });

    $(".close").click(function(){
        $(".overlay").fadeOut();
        $(".input_box").fadeOut();
        $("body").css("overflow-y","scroll");
        $(".blur").css("filter","blur(0px)");
    });

    $(".post").click(function(){
        $(".overlay").fadeOut();
        $(".input_box").fadeOut();
        $("body").css("overflow-y","scroll");
        $(".blur").css("filter","blur(0px)");
        location.reload();
    });


    $(".submitAnswer").click(function(){
               
    });

});