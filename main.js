// let scrollHeight = 17450;
var scrollHeight
var fadePosition, descendPosition, position;
var leftPosition;
var wheelRotate = 0;
var isMobile = false;

// position for when the plane starts fading away to transition to next section


// this code will run when DOM is loaded
$(function () {
  if(window.navigator.userAgent.match(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
    switchToMobile()
  }
  getPositionValues()
  
  position =
    window.pageXOffset === 0
      ? window.pageYOffset * -1
      : window.pageXOffset * -1;
  vehicleAppear();

  shift(position);
  switchToButton()

  scrollHeight = changeScrollHeight()
  $("#page").css({ height: scrollHeight });
});

addEventListener('resize', (event) => {
  getPositionValues()
  scrollHeight = changeScrollHeight()
  $("#page").css({ height: scrollHeight });
  switchToButton()
});

function switchToButton(){
  var height = window.innerHeight
  var width = window.innerWidth
  if(height < 900 || width < 1000){
    $(".register-link").css({display: 'block'});
    $("#form-container").css({display: 'none'});
  } else {
    $(".register-link").css({display: 'none'});
    $("#form-container").css({display: 'flex'});
  }
}

addEventListener('touchstart', (event) => {
  switchToMobile()
})

function changeScrollHeight() {
  return window.innerWidth*2 + 450 + 2500 + 7000 + 7000  
}

function switchToMobile() {
  $("#planeGif").css({display: 'none'});
  $("#planePng").css({display: 'block'});
  $("#submarine").css({display: 'none'});
  $("#submarinePng").css({display: 'block'});
  $(".register-link").css({display: 'block'});
  $("#form-container").css({display: 'none'});
}

function getPositionValues(){
  var screenWidth = window.innerWidth >= 2350 ? window.innerWidth - 600 : window.innerWidth
  fadePosition = screenWidth + 1900;

  // the px position for the plane to start descending
  descendPosition = screenWidth + 1250;
  if(window.innerWidth > 1200) {
    leftPosition = 200
  } else if(window.innerWidth <= 1200 && window.innerWidth > 750){
    leftPosition = 60
  } else if (window.innerWidth <= 750){
    leftPosition = -20
  }
  $(".plane-container").css({ left: `${leftPosition}px` });
}

// if a specific FAQ is clicked, fade in the answer
$(".faq").click(function () {
  var id = $(this).attr("id");
  $("#" + id + " .answer").fadeToggle();
});

$(window).bind("scroll", function (event) {
  if($("#modal").css("display") == "none") {
    handleMovement()
  }
  
});

function handleMovement() {
  var div1 = document.getElementById("div1")
  var div1Rect = div1.getBoundingClientRect();
  if(div1Rect.left < 0) {
    $(".plane-container").css({ display: "none" });
  } else {
    $(".plane-container").css({ display: "block" });
  }
  
  // traveling left
  if (Math.abs(position) > window.pageYOffset) {
    wheelRotate += 5
    $("#submarine").css({ transform: "scaleX(1)" });
    $("#submarinePng").css({ transform: "scaleX(1)" });
    if (Math.abs(position) < descendPosition) {
      // planeface left
      $(".plane img").css({ transform: "scaleX(1)" });
      
      // if plane is at position more than descend position, face upwards
    } else {
      // face left, upwards
      $(".plane img").css({ transform: "scaleX(1) rotate(30deg)" });
    }

    // traveling right
  } else {
    wheelRotate -= 5
    $("#submarine").css({ transform: "scaleX(-1)" });
    $("#submarinePng").css({ transform: "scaleX(-1)" });
    if (Math.abs(position) < descendPosition) {
      // plane face right
      $(".plane img").css({ transform: "scaleX(-1)" });
      
    } else {
      // face right, downwards
      $(".plane img").css({ transform: "scaleX(-1) rotate(-30deg)" });
    }
  }

  // apply train wheel rotation
  $(".train-wheel").css({ transform: `rotate(${wheelRotate}deg)`})

  // move the plane downwards
  // NEED TO FIX: where the plane descends to based on window height
  
  if (Math.abs(position) / descendPosition > 1) {
    $(".plane-container").css({ top: (Math.abs(position) % descendPosition) / 3 + "px" });
  }

  // update position AFTER the code above to get the scroll direction based on comparisons
  position =
    window.pageXOffset === 0
      ? window.pageYOffset * -1
      : window.pageXOffset * -1;

  if (position > -fadePosition) {
    $(".plane-container").css({ opacity: "1" });
  } else {
    if (Math.abs(position) < fadePosition * 2) {

      $(".plane-container").css({
        opacity: 1 + (position % fadePosition) * 0.008,
      });
    }
  }

  var sub = document.getElementById("div2")
  var rect = sub.getBoundingClientRect();

  if(rect.right < leftPosition){
    $("#submarine").css({opacity: 1})
    $("#submarinePng").css({opacity: 1})
    $("#submarine-container").css({display: 'block'})
  } else {
    $("#submarine").css({opacity: 0})
    $("#submarinePng").css({opacity: 0})
    $("#submarine-container").css({display: 'none'})
  }
  shift(position);
}

// run this when page loads up
function vehicleAppear() {
  $(".plane img").css({ transform: "scaleX(-1)" });
  $(".plane-container").css({ left: `${leftPosition}px` });
  $(".train-container").css({ left: "10%" });

  // ensure plane disappears if user refreshes page at a different section
  if (Math.abs(position) > fadePosition) {
    $(".plane-container").css({ opacity: "0" });
  }
}

// runs when register button is clicked
function scrollBottom() {
  scroll({
    top: $("#page").height(),
    left: 0,
    behavior: "smooth",
  });
}

function shift(position) {
  // move everything to the left to simulate movement
  $(".vertical-section").css({ left: position });
  $("#stars").css({left: position/30})
  $(".buildings-container").css({left: 700+position/7})
  $(".divider").css({ left: position });

  // move clouds to the left, but at a slow rate, based on their size.
  $(".clouds-container .sm").css({ left: -position / 1.2 });
  $(".clouds-container .md").css({ left: -position / 2 });
  $(".clouds-container .lg").css({ left: -position / 4 });
}

function sideHackModal(id) {
  console.log('hi')
}
