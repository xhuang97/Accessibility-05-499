var allelements = null;
var currentelem_index = 0;
var currentstate = "PAUSED";  // READING, READINGBACKWARD, READONEFORWARD, READONEBACK

var u;

//$(":focusable")


$(document).ready(function() {
  readFromBeginning();

  $(document).keydown(function(e) {
    if(e.key=="Escape") {
      setToPaused();
    } if(e.key=='h' && e.ctrlKey) {
      findNextHeading();
    } if(e.key=="r" && (e.metaKey || e.ctrlKey)){
      setToPaused();
      readFromBeginning();
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

  $("input,texarea").keydown(function(e) {
    var keytospeak = e.key;
    if(/[a-z0-9\s]/i.test(keytospeak)) {
      setToPaused();
      speak(keytospeak);
    }
  })
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
    console.log(currentelem_index)
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


function doesItSpeak(elem) {
  console.log($(elem)[0].tagName);
  if($(elem)[0].tagName == "A") {
    return true;
  }
  return false;
}

function speak(text) {
  u = new SpeechSynthesisUtterance(text);
  u.onend = function(event) {
    if(currentstate=="READING") {
      findTheNextOne();
    } else if(currentstate=="READONEBACK") {
      findThePreviousOne();
    } else if(currentstate=="READINGBACKWARD"){
      findThePreviousOne();
    }
  }
  speechSynthesis.speak(u);
}

function speakMe(elem) {
  $(elem).focus();

  $('html, body').animate({
    scrollTop: $(elem).offset().top
  }, 200);

  speak($(elem).text())
  /*var u = new SpeechSynthesisUtterance("another thing"); //$(elem).text());
  u.onend = function(event) {
    console.log("onend event triggered")
    //findTheNextOne();
  }
  speechSynthesis.speak(u);*/
}
