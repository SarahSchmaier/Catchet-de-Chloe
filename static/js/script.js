
getGoogleDataForKey("1qmGzDLHBK3HYu2L_4HH9tV627-nkTaYHdxNcgBriICM", "receiveData");

function playClip(event) {
  console.log("play");
    document.getElementById(event.target.getAttribute('audioId')).play();
}

function pauseClip(event) {
  console.log("pause");
    document.getElementById(event.target.getAttribute('audioId')).pause();
}

function getSoundAndFadeAudio(event) {
    var sound = document.getElementById(event.target.getAttribute('audioId'));
    
    var fadeTime = 1000;

    var maxvolume = 0.2;

    sound.volume = 0;

    sound.play();

    var timestep = 100;

    var fadeAudio = setInterval(function () {

        if (sound.volume < maxvolume) {
            var steps = fadeTime/timestep;
            sound.volume += maxvolume/steps;
        }
        
        if (sound.volume === maxvolume) {
            clearInterval(fadeAudio);
        }

    }, timestep);

}

function receiveData(googleData) {
  var data = convertData(googleData);
  console.log(data);

  for (var i = 0; i < data.length; i++) {
    var post_data = data[i];
    var container = document.getElementById("container");
    
    if (post_data.category == document.getElementById("header").getAttribute("value")) {
      var new_post = document.createElement("div");
      new_post.className = "grid";
      container.appendChild(new_post);

      var audioId = "audio" + i;
      console.log(playClip);

      var ImageDiv = document.createElement("div");
      ImageDiv.className = post_data.category + "-img";

      var ItunesDiv = document.createElement("div");
      ItunesDiv.className = post_data.category + "-itunes";

      var BlogDiv = document.createElement("div");
      BlogDiv.className = post_data.category + "-blog";

      var imageElement=document.createElement("img");
      imageElement.src = post_data.image;
      imageElement.setAttribute("audioId", audioId);
      imageElement.addEventListener("mouseover", getSoundAndFadeAudio, playClip);
      imageElement.addEventListener("mouseout", pauseClip);
      ImageDiv.appendChild(imageElement);
      new_post.appendChild(ImageDiv);

      var ituneslink = document.createElement("a")
      ituneslink.href = post_data.itunes_link;
      ituneslink.innerHTML = post_data.song_title + " by " + post_data.song_artist + "\n";
      ituneslink.className = "musiclinktext"
      ItunesDiv.appendChild(ituneslink);
      new_post.appendChild(ItunesDiv);

      var bloglink = document.createElement("a")
      bloglink.href = post_data.blog_link;
      bloglink.innerHTML = "\n" + post_data.caption;
      bloglink.className = "bloglinktext"
      BlogDiv.appendChild(bloglink);
      new_post.appendChild(BlogDiv);
      
      var audioElement = document.createElement('audio');
      audioElement.src = post_data.audio;
      audioElement.id = audioId;
      audioElement.volume = 0.2;
      new_post.appendChild(audioElement);

      container.appendChild(new_post);
    }
   
  }
}

