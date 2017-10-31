$(document).ready(function(){

  var text = "";
  // var moduleName = 'tesseract.js';
  // import Tesseract from 'tesseract.js'

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

  $('img').each(function() {
    var id = $(this).attr('id');
    if (id){
      console.log("found image id: " + id.toString())
    }
    else{
      console.log("image element without id")
    }

    var title = $(this).attr('title');
    if (title){
      console.log("found image title: " + title.toString())
    }
    else{
      console.log("image element without title")
    }

    if (!this.hasAttribute("alt") || $(this).attr("alt")=="" || $(this).attr("alt")=="\n") {  // image does not have alt text
        var imgaddr = $(this).attr('src')
        var img = $(this)
        // console.log("image src: " +imgaddr)

        $($(this).style).width = '1000%'
        $($(this).style).height = '1000%'

        // image recognition
        var q = "http://www.accessibilitycourse.com/support/rekognition.php?url="
        var query = q + imgaddr
        // console.log("query: " + query)
        var candidates = {};
        var b = true

        $.getJSON( query, function( data ) {
          var items = [];
          $.each( data, function( key, val ) {
            // items.push( "<li id='" + key + "'>" + val + "</li>" );
            // console.log("key: " + key + " val: " + val)
            var count = 0
            name = ""
            confidence = ""
            $.each(val, function(k,v){
              // console.log("k: "  + k + " v: " + v)
              if (count % 2 == 0){
                name = v
              } else {
                // confidence = v
                candidates[name] = v;
              }
              // console.log(candidates)
              count += 1
            })
          });

          // $( "<ul/>", {
          //   "class": "my-new-list",
          //   html: items.join( "" )
          // }).appendTo( "body" );
        }).then(function(){

          // console.log("final candidates: " + candidates)

          var selected = []
          for (var name in candidates) {
              // console.log("word: " + word + " freq: " + dict[word])
              // var nnum = /^([^0-9]*)$/.test(word);
              var conf = candidates[name]
              if (conf > 60){
                  selected.push([name, candidates[name]]);
              }
          }

          // for (var i = 0; i < selected.length ; i++){
          //   console.log("selected: " + selected[i])
          // }

          if (selected.length > 5){
            selected = selected.slice(0,4)
          }

          var newalt = ""
          for (var i = 0; i < selected.length ; i++){
            newalt += selected[i][0] + " "
          }

          img.attr("alt", newalt)

          // console.log("added alt text: " + newalt)

        });


        var dict = {};
        // var Tesseract = require('tesseract.js')

        Tesseract.recognize(imgaddr)
        .then(function(result){
          var s = result.text;
          var words = s.split(/[\s,.|NaN]+/);
          var arrayLength = words.length;
          for (var i = 0; i < arrayLength; i++) {
            word = words[i]
            dict[word] = 0
            // console.log("word: " + word + " freq: " + dict[word])
          }

          for (var i = 0; i < arrayLength; i++) {
            var word = words[i];
            dict[word] += 1
          }
          // console.log("words: " + words)

          // processing
          var sorted = []

          for (var word in dict) {
              // console.log("word: " + word + " freq: " + dict[word])
              var nnum = /^([^0-9]*)$/.test(word);

              if (word.length > 1 && nnum){
                  sorted.push([word, dict[word]]);
              }
          }
          sorted.sort(function(a, b) {
            return b[1] - a[1];
          });
          // console.log("sorted: " + sorted)
          var chosen = []

          chosen = sorted.slice(0,3)

          // console.log("chosen: " + chosen)
          var filtered = ""
          for (var i = 0; i < chosen.length; i++){
            var str = chosen[i][0]
            // console.log("Str: " +str)
            var word = str
            // var nnum = /^([^0-9]*)$/.test(word);
            // console.log("i: " + i + " word: " + word)
            if (dict[word] > 1 && nnum){
              filtered = filtered + " " + word
            }
          }

          // console.log("filtered: " + filtered)
          img.attr("alt", img.attr("alt") + filtered)

          console.log("added alt text: " + img.attr("alt"))
        })


      } else {  // image has some alt text defined
        var alttext = $(this).attr("alt")
        console.log("image has non-empty alt text, leave it as it is")
        console.log("alt: [" + alttext + "]")
    }
  });

});
