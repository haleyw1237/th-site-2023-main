// if a specific FAQ is clicked, fade in the answer
$(".faq").click(function () {
  var id = $(this).attr("id");
  $("#" + id + " .answer").fadeToggle();
});