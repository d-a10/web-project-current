"use strict";
//window.onload = function (){
//  document.getElementById((document.title + '-nav').toLowerCase()).classList.add('active');
//}


const accordion = document.getElementsByClassName("accordion");
let i;
//This creates the accordion slide functionality
if (accordion){    
  for(i = 0; i < accordion.length; i++){
      accordion[i].addEventListener("click", function(){
          this.classList.toggle("active");
          const panel = this.nextElementSibling;
          if (panel.style.maxHeight){
              panel.style.maxHeight = null;
          }else{
              panel.style.maxHeight = panel.scrollHeight + 'px';
          }
      } )
  }
}
const modal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
window.onclick = function (event){
    if (event.target === modal) {
        modal.style.display = "none";
    }else if (event.target === signupModal){
        signupModal.style.display = "none";
    }
}

const xhr = new XMLHttpRequest();//This is to receive the top headlines from the news api
const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=d00cf7de0e6b42b48c3f2a6d64d7acbc";
const newsElement = document.getElementById('side-block');

if (newsElement){
    xhr.open('GET', url, true);
    xhr.onload = function(){
        if(this.status == 200){
            const headlines = JSON.parse(this.responseText);
            console.log(headlines);
            let output = '';
            let count = 0;
            output += '<h2>Top Headlines</h2>';
            for(count; count<5 ; count++){
                output +=
                    '<div class="headline" > ' + 
                    '<ul> ' + 
                    '<li> <a target="_blank" href = "'+headlines.articles[count].url+'" >' + headlines.articles[count].title + '</a></li> ' + 
                    '<li class=small> Published: ' + headlines.articles[count].publishedAt.substring(0, 10) + ' Source: ' + headlines.articles[count].source.name + '</li> ' +
                    '</ul> '+
                    '</div> ';
            }
            newsElement.innerHTML = output;
        }
    }
    xhr.onerror = function(){
        console.log('error on data retrieval for news headlines');
        newsElement.innerHTML = "<h2>Top Headlines</h2>" +
                                "<div class=\"headline\" style=\"text-align: center\" > (Error on Data Retrieval)</div> ";
    }
    xhr.send();
}

//let messageElements = document.getElementsByClassName('success-msg error-msg');
//if (messageElements) {
//  console.log('messageEl:' + messageElements.innerHTML);
//  messageElements.display = 'none';
//}

  //c7300b18871b4ea682b0bd663f547e84








