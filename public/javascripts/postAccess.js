"use strict";

//This will receive the user's blog posts for the feed
const hrequest = new XMLHttpRequest(); //This is to receive the top headlines from the news api
const url2 = "/posts/";
const streamElement = document.getElementById('feed');
console.log('in post access');
//console.log(streamElement);
if (streamElement) {
  hrequest.open('GET', url2, true);
  hrequest.onload = function () {
    if (this.status == 200) {
      console.log('success');
      console.log(JSON.parse(this.responseText));

      var posts = JSON.parse(this.responseText);
      posts = posts.users;
      let output = '';
      output += '<h1 class="stream-header">Feed</h1>';
      let count = 0;
      //console.log(posts.users.length);
      while (count < posts.length) {
        console.log(posts.length);
        output +=
          `
          <div class=blog-block>
            <h2>${posts[count].title}</h2>
            <p>${posts[count].body}</p>
            <p class="right-align">${posts[count].created_at.substr(0, 10)}</p>
          </div>
          `;
        count++;
      }
      streamElement.innerHTML = output;
    }
  }
  hrequest.onerror = (err) => {
    console.log(err);
  }

  hrequest.send();
}
