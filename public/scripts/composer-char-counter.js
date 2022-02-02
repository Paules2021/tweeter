$(function () {
  $('textarea').on('input', function (event) {
    $('.error').hide();

    //Resize textarea on input
    this.style.height = "";
    this.style.height = this.scrollHeight + 'px';

    //Decrements the counter on input
    const counter = $(this).closest('form').find('.counter')[0];

    counter.value = 140 - this.value.length;

    //if counter exceeds character limit change the color to red
    counter.value < 0 ? $(counter).css("color", "red") : $(counter).css("color", "#545149");
  })

  //resize textarea if window is resized
  $(window).on('resize', function (event) {
    const $textarea = $('textarea');

    $textarea.height(0);
    $textarea.height($textarea.prop('scrollHeight'));
  })
}); 