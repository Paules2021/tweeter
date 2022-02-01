$(document).ready(function() {
  let counter = $("output.counter");
  $("#tweet-text").on('input', function() {
    counter[0].value = 140 - $("#tweet-text").val().length;
    if (counter[0].value < 0) {
      counter.addClass("counterRed");
    } else {
      counter.removeClass("counterRed");
    }
  })
}); 