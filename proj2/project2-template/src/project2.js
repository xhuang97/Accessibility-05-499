$(document).ready(function() {

  // Check the spam checkbox with space bar
  $("#receivespambutton").keypress(function (e) {
    if (e.keyCode === 32 || e.which === 32) {
      e.preventDefault();
      document.getElementById("receivespambutton").click();
    }
  });

  // Toggle the receive spam checkbox
  $("#receivespambutton").click(function() {
    var node = document.getElementById("receivespambutton");
    var state = node.getAttribute('aria-checked').toLowerCase();

    if($($("#receivespambutton").children()[0]).attr("src")=="pics/unchecked.png") {
      $($("#receivespambutton").children()[0]).attr("src","pics/checked.png");
      node.setAttribute('aria-checked', 'false');
    } else {
      $($("#receivespambutton").children()[0]).attr("src","pics/unchecked.png");
      node.setAttribute('aria-checked', 'true');
    }
  });

  // Play video
  $("#videoplayer").click(function() {
    var video = document.getElementById("thevideo");
    var videoplayer = document.getElementById("videoplayer");
    var state = videoplayer.getAttribute('aria-pressed').toLowerCase();
    var button = document.getElementById("playbutton");

    if(state == "false") {
      button.src = "pics/pause.jpg";
      $("#thevideo")[0].play();
      videoplayer.setAttribute('aria-pressed', 'true');
    } else {
      button.src = "pics/play.png";
      $("#thevideo")[0].pause();
      videoplayer.setAttribute('aria-pressed', 'false');
    }
  });


  // Form validation
  $("#signupbutton").click(function() {
    if($("#fn").val()=="" || $("#ln").val()=="") {
      alert("Please enter a valid name!");

      return false;
    }

    if($("#em").val()=="") {
      $("#email").addClass("error");
      alert("Please enter your email!");
      return false;
    }

    alert("Thank you!  Please watch your email for our exciting newsletter and offers!");
    return true;
  });
});
