$(document).ready(function() {
  $(document).keydown(function(ev){

  var curnode = $("body")[0];
  console.log(curnode);

  _curnode = curnode;

  // store elem
  setInterval(funciton() {
    var next = getNextElement(_curnode);
    $(".bigredborder").removeClass("bigredborder");
    $(next).addClass("bigredborder");
    _curnode = next;
  }, 4000);

  var nextnode = getNextElement(curnode[0]);
  console.log(nextnode);

  });
});

function getNextElement(elem) {
  var nodetype = elem.nodeType;
  var tagname = elem.tagName;

  console.log(nodetype + " " + tagname);

  if(nodetype == 1){
    if($(elem).children().length > 0) {
      return element.children()[0];
    }
  } else if(nodetype == 3){
    
  }
}
