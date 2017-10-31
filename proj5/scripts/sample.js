$(document).ready(function(){
var dzoom = 1.0
var gzoom = 1.0
var bw = $("body").width();

$(document).keydown(function(e){
  console.log(e.key)
  e.preventDefault();
  if(e.key==" ") {
    // var paragraph = $(this);
    var p = $(this)[0];
    var text = $(p).text();
    var betterdisplay = $("<div class='betterdisplay'></div>");
    betterdisplay.text(text);
    $("body").append(betterdisplay);
    // $('#word').text($(this).css('background-color','#ffff66').text());
    e.preventDefault();
  }

  if(e.keyCode == 27){
    $(".betterdisplay").removeClass('betterdisplay');
    // $(".betterdisplay").removeClass('betterdisplay');
  }

  if(e.key=="="){
    dzoom += 0.1;
    document.body.style.zoom = dzoom;
    e.preventDefault();
  }
  if(e.key=="-"){
    dzoom -= 0.1;
    document.body.style.zoom = dzoom;
    e.preventDefault();
  }

  if(e.key=="=" && e.ctrlKey){
    oldzoom = gzoom;
    gzoom += 0.1;
    $("body").css("transform", "scale(" + gzoom + ")")
    e.preventDefault();

    $("body").css("position", "relative")
    bw = bw * 1.1;
    $('body').css('width', bw);


  }
  if(e.key=="-" && e.ctrlKey){
    gzoom -= 0.1;
    $("body").css("transform", "scale(" + gzoom + ")")
    e.preventDefault();

    $("body").css("position", "relative")
    bw = bw * 0.9;
    $('body').css('width', bw);

    // $("body").css("left", "250px")
  }

})

$(document).mousemove(function(e){
    // var pos   = $(this).position();
    // var elPos = { X:pos.left , Y:pos.top };
    // var mPos  = { X:e.clientX-elPos.X, Y:e.clientY-elPos.Y };


    var tempX = e.pageX
    // console.log(tempX)
    var body = $("body");

    // $("body").css("left", "250px")
    body.animate({scrollLeft:0}, 500);
    body.scrollLeft(300);
    body.animate({
        scrollLeft: body.scrollLeft() + 400
    });
    $("body").animate({scrollLeft: body.offset().left}, 800);
    // $("#log").text("Mouse position x:"+ mPos.X +" y:"+ mPos.Y);

    var dw = $(document).width()
    var ww = $(window).width()

    if(tempX < 10){
      console.log("X less then 10: " + tempX)
      body.scrollLeft += 50

    }
})

})
