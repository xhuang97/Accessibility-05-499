var allelements = null;
var currentelem_index = 0;
var currentstate = "PAUSED";  // READING, READINGBACKWARD, READONEFORWARD, READONEBACK
var u;


$(document).ready(function() {
  readFromBeginning();

  $(document).keydown(function(e) {
    e.preventDefault();


    if(e.key=="Escape") {
      setToPaused();
    } if(e.key=='h' && e.ctrlKey) {
      findNextHeading();
    } if(e.key=='g' && e.ctrlKey) {
      findPreviousHeading();
    } if(e.key=="j" && e.ctrlKey) {
      setToPaused();
      readFromBeginning();
    } if(e.key=="k" && e.ctrlKey) {
      setToPaused();
      readFromEnding();
    }
  });

  $('a').click(function() {

    setToPaused();
    readFromBeginning();
  });

  $("input:visible,select:visible").keyup(function(e) {
    // e.preventDefault();
    var keytospeak = e.key;
    if(/[a-z0-9\s]/i.test(keytospeak)) {
      setToPaused();
      speak(keytospeak);
    }
  });

  $("input").keydown(function (e) {

    if (e.keyCode == 9 && e.shiftKey) {
      currentstate = "READONEBACK"
      $("a").html(this.value);

      findThePreviousOne();
      findThePreviousOne();

      $(allelements[currentelem_index]).focus();
      e.preventDefault();
    }
    if (e.keyCode == 9){
      currentstate = "READONEFORWARD"
      $("a").html(this.value);
      $("a").focus();
      findTheNextOne();
      e.preventDefault();
    }
  });

});

function setToPaused() {
  currentstate = "PAUSED";
  speechSynthesis.cancel();
}

/* start reading from the beginning element */
function readFromBeginning() {
  allelements = $("*");
  currentelem_index = 0;

  currentstate = "READING";
  findTheNextOne();
}

/* start reading from the last element */
function readFromEnding() {
  allelements = $("*");
  currentelem_index = allelements.length - 1;

  currentstate = "READINGBACKWARD";
  findThePreviousOne();
}

function findThePreviousOne() {
  do {
    var currentelem = allelements[currentelem_index];
    currentelem_index--;

    if(currentelem_index<2) {
      break;
    }
  } while(!doesItSpeak(currentelem));

    speakMe(currentelem);
}

/**
 *
 *  Finds and reads the next node starting from
 *  the current position.
 **/
function findTheNextOne() {
  do {
    var currentelem = allelements[currentelem_index];
    currentelem_index++;

    if(currentelem_index>100) {
      break;
    }
  } while(!doesItSpeak(currentelem));
    speakMe(currentelem);


}

function findNextHeading() {
  var all = 'h1,h2,h3,h4,h5,h6';
  var currentelem = allelements[currentelem_index];
  var index;

  if(currentelem==null) {
    currentelem = $("body");
  }

  var afters = $(all).add(currentelem).each(function (i) {
    if ($(this).is(currentelem)) {
      index = i;
      return false; // quit looping early
    }
  }).slice(index + 1);


  console.log(afters);

  speakMe(afters[0]);
}

function findPreviousHeading() {
    var all = 'h1,h2,h3,h4,h5,h6';
    var currentelem = allelements[currentelem_index];
    var index;

    if(currentelem==null) {
      currentelem = $("body");
    }

    var afters = $(all).add(currentelem).each(function (i) {
      if ($(this).is(currentelem)) {
        index = i - 1;
        return false; // quit looping early
      }
    }).slice(index + 1);


    console.log(afters);
    speakMe(afters[0]);

}

function doesItSpeak(elem) {
  console.log($(elem)[0].tagName);
  if($(elem)[0].tagName == "A" ) {
    return true;
  }
  return false;
}

function speak(text) {
  u = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(u);
  u.onend = function(event) {
    if(currentstate=="READING") {
      findTheNextOne();
    } else if(currentstate=="READINGBACKWARD"){
      findThePreviousOne();
    }
  }

}

function speakMe(elem) {
  $(elem).focus();

  $(elem).addClass('highlight');
  $('html, body').animate({
    scrollTop: $(elem).offset().top
  }, 200);

  speak($(elem).text())
  $(".highlight").removeClass('highlight');
}
