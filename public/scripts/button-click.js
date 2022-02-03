//on clicks for like, flag, and retweet
$(function () {
  $('#tweets').on('click', '#flag',(event) => {
    $(event.target).toggleClass("fas blue")
  })

  $('#tweets').on('click', '#heart',(event) => {
    $(event.target).toggleClass("fas blue")
  })

  $('#tweets').on('click', "#retweet", (event) => {
    $(event.target).toggleClass("blue")
  })

}); 