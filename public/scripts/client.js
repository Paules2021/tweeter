/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Code inside will only run once the page DOM is ready for JavaScript 
$(function () {

  //Escape method to avoid XSS attacks
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  //function to open and close the text area
  const openTextArea = function (boolForScroll = false) {
    if ($('.new-tweet').is(':hidden') || boolForScroll) {
      $('.new-tweet').slideDown('slow', () => {
        $('#tweet-text').focus();
      });
    } else {
      $('.new-tweet').slideUp('slow');
    }
  }

  //if the user scrolls to/away from the top of the page show/hide the return-to-home button 
  $(window).on('scroll', function () {
    if ($(this).scrollTop()) {
      $('#return-to-home').fadeIn();
    } else {
      $('#return-to-home').fadeOut();
    }
  })


  //return to home on click method
  $('#return-to-home').on('click', function () {
    $("html, body").animate({ scrollTop: 0 }, 500, function () { });
    openTextArea(true);
  })

  //write new text on click 
  $('#writeNewText').on('click', function (event) {
    openTextArea();
  })


  //function to create tweet elements
  const createTweetElement = function (tweet) {
    let newTweetHtml = `
      <article class="tweets">
          <header class="tweet-container">
            <div class="tweet-header">
              <img src="${tweet.user.avatars}" />
              <p>${tweet.user.name}</p>
            </div>
            <p class="user-tag">${tweet.user.handle}</p>
          </header>
          <div class="tweet-container">
            <p class="content">${escape(tweet.content.text)}</p>
          </div>
          <footer class="tweet-container">
            <p>${escape(timeago.format(tweet.created_at))}</p>
            <div>
              <i class="far fa-flag" id="flag"></i>
              <i class="far fa-heart" id="heart"></i>
              <i class="fas fa-retweet" id="retweet"></i>
            </div>
          </footer>
        </article>
      `;
    return newTweetHtml;
  }


  // Fetch tweet 
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
      .done((tweets) => {
        renderTweets(tweets)
      })
      .fail(() => console.log('An error has occurred'))
      .always(() => console.log('Succesful request'));
  }


  //show tweets+-  
  const renderTweets = function (tweets) {
    $('#tweets').empty();

    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweets').prepend(newTweet);
    }
  }

  //handle submit 
  $('#new-tweet-form').on('submit', function (event) {
    event.preventDefault();

    const $tweetText = $(this).children('#tweet-text');

    if ($tweetText.val().length > 140) {
      $('.error').html(`<p>Please respect the 140 character limit</p>`);
      $('.error').slideDown('slow');
      return;
    } else if ($tweetText.val().length === 0) {
      $('.error').html(`<p>Please write something!</p>`);
      $('.error').slideDown('slow');
      return;
    }
    const formContent = $(this).serialize();

    //post tweet    
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formContent
    })
      .done(() => loadTweets())
      .fail(() => console.log("Something went wrong!"))
      .always(() => console.log("Successfull"));

    $("#tweet-text").val("");
    $(this).find('.counter').val('140');
  });

  loadTweets();
})