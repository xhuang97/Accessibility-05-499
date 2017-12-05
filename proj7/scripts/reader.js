$(document).ready(function() {
  // $("body").append("<div class='keyboard' id='keyboard'> </div>");
  $("#keyboard").load("keyboard.html")


  var horizontalmovement = "ydown"; // up
  var verticalmovement = "xright"; // left, right
  var state = "none";  // verticalscan, horizontalscan, none
  var interval = null;
  var barspeed = 5
  var scrollheight = 0
  var showkeyboard = false
  var lasttext = null;
  var shifton = false
  var capson = false
  var done = true
  var virtualclick = false


  $("#thebutton").click(function() {
  	alert("I was clicked!");
  })
  $("body").append("<div class='scanbar' id='horizontal-scanbar'></div><div class='scanbar' id='vertical-scanbar'></div>")
count = 0

  // $('.key:not(".backspace"):not(".shift"):not(".caps"):not(".space1")').keydown(function() {

  $('.key:not(".backspace"):not(".shift"):not(".caps"):not(".space1")').click(function() {
    console.log("detected click")
    console.log("lasttext:" + $(lasttext).val())
    var newchar = $(this).text().trim();
    console.log("newchar: " + newchar)
    b = true
    if (virtualclick){
      b = !done
    }
    if (b){
      if (newchar.length > 1 && shifton){
        $(lasttext).val($(lasttext).val() + newchar.substring(0,1));
        // console.log("added!" + newchar);
      } else if (newchar.length > 1 && !shifton){
        $(lasttext).val($(lasttext).val() + newchar.substring(1,2));
        // console.log("added!" + newchar);
      } else if (newchar.length <= 1 && capson){
        // newchar = newchar.toUpperCase();
        $(lasttext).val($(lasttext).val() + newchar.toUpperCase());
        // console.log("added!" + newchar);
      } else{
        // newchar = newchar.toLowerCase();
        $(lasttext).val($(lasttext).val() + newchar.toLowerCase());
        // console.log("added!" + newchar);
      }
    }
    done = true
    virtualclick = false
  });

  $('.key.space1').click(function(){
    str = $(lasttext).val();
    $(lasttext).val( str+ " ");
  })

  $('.key.backspace').click(function() {
    str = $(lasttext).val();
    //console.log("str: " + str)
    newstr = str.substring(0, str.length -1);
    //console.log("newstr: " + newstr)
    $(lasttext).val(newstr);
    //console.log($(lasttext).val());
  });

  $('.key.shift').click(function() {
    console.log("shifton: " + shifton)
    shifton = !shifton;
  });

  $('.key.caps').click(function() {
    console.log("capson: " + capson)
    capson = !capson;
  });

  $("input[type='text'],textarea").click(function(){
    lasttext = $(this);
  });


  $(document).keydown(function(e) {

    	if(e.key=="b") {
        if(interval){
          clearInterval(interval);
        }

        barspeed = 5
        // none -> vertical -> horizontal -> none -> etc.
        if(state=="none") {
          if(interval){
            clearInterval(interval);
          }

          barspeed = 5

          state = "verticalscan";
          $("#horizontal-scanbar").show();

          // Setting up the vertical scan
      	  interval = setInterval(function() {
      	  	var offset = $("#horizontal-scanbar").offset();
      	  	var y = offset.top - scrollheight;

      	  	if(y >= $(window).height()) {
      	  	  horizontalmovement = "yup";
              //console.log("exceeded height")
              //console.log("y is: " + y + " horizontalmovement: " + horizontalmovement)
      	  	} else if(y <= 0) {
      	  	  horizontalmovement = "ydown";
      	  	}

      	  	if(horizontalmovement=="ydown") {
      	  	  y = y+barspeed;
              //console.log("barspeed: " + barspeed)
              //console.log("new y is " + y + " " + $(window).height());

        	  	$("#horizontal-scanbar").css("top", y+"px");
              //console.log("after changing css: y = " + offset.top)
      	    } else if(horizontalmovement=="yup") {
      	      y = y-barspeed;
              //console.log("barspeed: " + barspeed)
              //console.log("new y is " + y + " " + $(window).height());

        	  	$("#horizontal-scanbar").css("top", y+"px");
              //console.log("after changing css: y = " + offset.top)
      	    }


      	  }, 100);
    	  } else if(state=="verticalscan") {
          barspeed = 5

          state = "horizontalscan";
          $("#vertical-scanbar").show();

          // Setting up the vertical scan
          interval = setInterval(function() {
            var offset = $("#vertical-scanbar").offset();
            var x = offset.left;


            if(x >= $(window).width()) {
              verticalmovement = "xleft";
              // console.log("exceeded width")
              // console.log("x is: " + x + " verticalmovement: " + verticalmovement)
            } else if(x <= 0) {
              verticalmovement = "xright";
            }

            if(verticalmovement=="xright") {
              x = x+barspeed;
              // console.log("new x is " + x + " " + $(window).width());
              $("#vertical-scanbar").css("left", x+"px");
            } else if(verticalmovement=="xleft") {

              // console.log("old x: " + x);
              x = x-barspeed;
              // console.log("new x is " + x + " " + $(window).width());
              $("#vertical-scanbar").css("left", x+"px");
              // console.log("after changing css: x = " + offset.left)
            }

          }, 100);
        } else if(state=="horizontalscan") {
          state = "none"
          var offset = $("#vertical-scanbar").offset();
          var x = offset.left + $("#vertical-scanbar").width()/2.0;

          var offset = $("#horizontal-scanbar").offset();
          var y = offset.top + $("#horizontal-scanbar").height()/2.0 - scrollheight;
          // console.log("click x : " + x+ " click y: " + y)


          $("body").append("<div class='click'></div>");

          $(".click").css("left", x+"px");
          $(".click").css("top", y+"px");

          $(".click").animate({
            width: "+=50",
            height: "+=50",
            left: "-=25",
            top: "-=25",
            opacity: '0.3',
            "border-radius": "+=25"
          }, 700, function() {
            $(".click").hide();
            var elementtoclick = document.elementFromPoint(x, y);
            if ($(elementtoclick).is("input[type='text'],textarea")){
              simulateType(elementtoclick)
            } else{
              simulateClick(elementtoclick);
            }
          });
          done = false
          virtualclick = true
          $("#horizontal-scanbar").hide();
          $("#vertical-scanbar").hide();
          $("#horizontal-scanbar").css("top", 0+"px");
          $("#vertical-scanbar").css("left", 0+"px");
        }
    	}
  })

function simulateClick(element) {
  if (!element) return;
  var dispatchEvent = function (elt, name) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(name, true, true);
    elt.dispatchEvent(clickEvent);
  };
  dispatchEvent(element, 'mouseover');
  dispatchEvent(element, 'mousedown');
  dispatchEvent(element, 'click');
  dispatchEvent(element, 'mouseup');
};

function simulateType(elem) {
  if (!elem) return;
  // var keyEvent = document.createEvent('KeyEvents');
  // $(document).dispatchEvent(new KeyboardEvent('keydown',{'key':'k'}));

  var e = $.Event('keydown');
  e.which = 75; // k
  e.key = 'k'
  $(document).trigger(e);
  // console.log(e)
  lasttext = elem;
};
})
