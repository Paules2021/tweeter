/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
$(function () {
  const createTweetElement = function (tweet) {
    let tweetHTML = `
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
            <p>${timeago.format(data.created_at)}</p>
            <div>
              <i class="far fa-flag" id="flag"></i>
              <i class="far fa-heart" id="heart"></i>
              <i class="fas fa-retweet" id="retweet"></i>
            </div>
          </footer>
        </article>
      `;
      return tweetHTML;
  }

  const renderTweets = function (tweets) {
    $('#tweets').empty();

    for (let tweet of tweets) {
      const newTweet = createTweetElement(tweet);

      $('#tweets').prepend(newTweet);
    }
  }


