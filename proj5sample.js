$(document).keydown(function(e){
  console.log(e.key)
  if(e.key==" ") {
    var firstparagraph = $("p")[0];
    var text = $(firstparagraph).text();
    var betterdisplay = $("<div class='betterdisplay'></div>");
    betterdisplay.text(text);
    $("body").append(betterdisplay);
    e.preventdefault();
  }
})
