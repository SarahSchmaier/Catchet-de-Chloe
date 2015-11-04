
getGoogleDataForKey("1qmGzDLHBK3HYu2L_4HH9tV627-nkTaYHdxNcgBriICM", "receiveData");

function playClip(event) {
  console.log("play");
    document.getElementById(event.target.getAttribute('audioId')).play();
}

function pauseClip(event) {
  console.log("pause");
    document.getElementById(event.target.getAttribute('audioId')).pause();
}

function receiveData(googleData) {
  var data = convertData(googleData);
 
  var container = document.getElementById("container");
  container.innerHTML = " ";

  for (var i = 0; i < data.length; i++) {
    var post_data = data[i];
    
    if (post_data.category == document.getElementById("header").getAttribute("value")) {
      var new_post = document.createElement("div");
      new_post.className = post_data.category + " " + post_data.class 
      new_post.innerHTML = post_data.caption + " " + post_data.song_title + " " + post_data.song_artist + " " + post_data.itunes_link;
    
      var audioId = "audio" + i;
      console.log(playClip);

      var imageElement=document.createElement("img");
      imageElement.src = post_data.image;
      imageElement.setAttribute("audioId", audioId);
      imageElement.addEventListener("mouseover", playClip);
      imageElement.addEventListener("mouseout", pauseClip);
      new_post.appendChild(imageElement);

      var song_title = document.createElement("a");
      song_title.href = post_data.itunes_link;
      song_title.className = "song_title"
      song_title.innerHTML = post_data.song_title + " by " + post_data.song_artist;


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
