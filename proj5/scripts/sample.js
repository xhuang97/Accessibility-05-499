$(document).keydown(function(){
  console.log(e.key)
  if(e.key==" ") {
    var firstparagraph = $("p")[0];
    var text = $(firstparagraph).text();

    var betterdisplay = $("<div class='betterdisplaybackground'><div class='betterdisplay'></div></div>");

    $("body").append(betterdisplay);
    $(".betterdisplay").text(text);

    e.preventdefault();
  }
})
