
getGoogleDataForKey("1qmGzDLHBK3HYu2L_4HH9tV627-nkTaYHdxNcgBriICM", "receiveData");

function playClip(event) {
  console.log("play");
    document.getElementById(event.target.getAttribute('audioId')).play();
}

function pauseClip(event) {
  console.log("pause");
    document.getElementById(event.target.getAttribute('audioId')).pause();
}

function createLink() {
  console.log("link");
  var str = post_data.song_title + " by " + post_data.song_artist;
  var result = str.link("post_data.itunes_link");
  document.getElementById("ituneslink").innerHTML = result;
}

function receiveData(googleData) {
  var data = convertData(googleData);
 
  var container = document.getElementById("container");
  container.innerHTML = " ";

  for (var i = 0; i < data.length; i++) {
    var post_data = data[i];
    
    if (post_data.category == document.getElementById("header").getAttribute("value")) {
      var new_post = document.createElement("div");
      new_post.className = post_data.category + " " + post_data.class;
    
      var audioId = "audio" + i;
      console.log(playClip);

      var imageElement=document.createElement("img");
      imageElement.src = post_data.image;
      imageElement.setAttribute("audioId", audioId);
      imageElement.addEventListener("mouseover", playClip);
      imageElement.addEventListener("mouseout", pauseClip);
      new_post.appendChild(imageElement);

      var a = document.createElement("a")
      a.href = post_data.itunes_link;
      a.innerHTML = post_data.song_title + " by " + post_data.song_artist;
      new_post.appendChild(a);
      
      var caption = document.createElement("div");
      caption.innerHTML = post_data.caption;
      caption.className = "caption";
      new_post.appendChild(caption);
      
      var audioElement = document.createElement('audio');
      audioElement.src = post_data.audio;
      audioElement.id = audioId;
      audioElement.volume = 0.2;
      new_post.appendChild(audioElement);

      container.appendChild(new_post);

    }
   
  }
}

