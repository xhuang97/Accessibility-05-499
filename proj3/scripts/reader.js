$(document).ready(function(){

  var text = "";

  $("*:not(body)").hover(
    function (ev){

      text = $(this).text();


      var tagname = this.tagName.toLowerCase();
      if (tagname == 'img'){
        if($(this).attr('title') && text == ""){
          text = $(this).attr('title');
        }
        if($(this).attr('alt') && text == ""){
          text = $(this).attr('alt');
        }
        if($(this).attr('href') && text == ""){
          text = $(this).attr('href');
        }
        if($(this).attr("src") && text == ""){
          text = $(this).attr("src");
        }
      }

      $(this).addClass('highlight');
      $(document).keydown(function(ev){
        if(ev.keyCode == 0 || ev.keyCode == 32){
          ev.preventDefault();
          speechSynthesis.speak(new SpeechSynthesisUtterance(text));
          text = "";
        }
      });
      ev.stopPropagation();
    },
    function (ev){
      $(this).removeClass('highlight');
      $(".highlight").removeClass('highlight');
      speechSynthesis.cancel();
      text = "";
    }
  );

});
