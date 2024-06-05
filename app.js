const $videoPlayer = document.querySelector("#video-player");
const $prev = document.querySelector("#prev");
const $play = document.querySelector("#play");
const $next = document.querySelector("#next");
const $shuffle = document.querySelector("#shuffle");
const $list = document.querySelector(".list");
const $playBtn = document.querySelector("#play-btn");
const $pauseBtn = document.querySelector("#pause-btn");
const $title = document.querySelector("#title");
const $videRange = document.querySelector("#videoRange");
const $currentTime = document.querySelector("#currentTime")
let $videos = [
     {
          src: "./video/AronChupa Little Sis Nora - Im an Albatraoz OFFICIAL VIDEO.mp4",
          title: "music",
          images: "./video/photo_2024-05-25_22-56-53.jpg"
     },
     {
          src: "./video/Konsta - Havo Offical Music Video.mp4",
          title: "uzb music",
          images: "./video/photo_2024-05-25_22-56-53.jpg"
     },
     {
          src: "./video/Konsta Timur Alixonov - Odamlar nima deydi AUDIO.mp4",
          title: "timur alixanov",
          images: "./video/photo_2024-05-25_22-56-53.jpg"
     },
     {
          src: "./video/AronChupa Little Sis Nora - Im an Albatraoz OFFICIAL VIDEO.mp4",
          title: "euro music",
          images: "./video/photo_2024-05-25_22-56-53.jpg"
     }
]
let currentIndex = 0
let autoPlaying = false

function currentVideo() {
$videoPlayer.src = $videos[currentIndex].src;
$title.innerText = $videos[currentIndex].title;
}

currentVideo()

const playVideo = () => {
     autoPlaying = !autoPlaying
    if(autoPlaying) {
     $videoPlayer.play()
     $playBtn.style.display = "none"
     $pauseBtn.style.display = "block"
     rangeVideo()
}
     else {
     $videoPlayer.pause()
     $playBtn.style.display = "block"
     $pauseBtn.style.display = "none"
     }
} 
const nextVideo = () => {
     if(currentIndex + 1 < $videos.length) {
          currentIndex++
     }
     else {
          currentIndex = 0
     }
     currentVideo()
     autoPlaying = false
     playVideo()
}


const prevVideo = () => {
     if(currentIndex > 0) {
          currentIndex--
     }
     else {
          currentIndex = $videos.length - 1
     }
     currentVideo()
     autoPlaying = false
     playVideo()
}
const shuffleVideo = () => {
     let random = Math.floor(Math.random()* $videos.length)
     currentIndex = random
     currentVideo()
     autoPlaying = false
     playVideo()
} 
const formatTime = (s) => {
let minutes = Math.floor(s / 60);
let seconds = Math.floor(s % 60);
return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}
const rangeVideo = () => {
     
let formatRange = setInterval(() => {
     let precent = $videoPlayer.currentTime / $videoPlayer.duration * 100
     $videRange.value = precent
     $currentTime.innerText = formatTime($videoPlayer.duration - $videoPlayer.currentTime)
}, 100)
}
const changeRange = (e) => {
     let seconds = $videoPlayer.duration * $videRange.value / 100;
     $videoPlayer.currentTime = seconds
}

const checkEndVideo = () => {
     let checkVideo = setInterval(() => {
          if($videoPlayer.currentTime === $videoPlayer.duration) {
               nextVideo()
               clearInterval(checkEndVideo)
          }
     }, 100)
}

checkEndVideo()

const renderList = () => {
     $videos.forEach((audio, index) => {

          const videoEl = document.createElement("video")
          const $div = document.createElement("div");
          $div.classList.add("selected")
          videoEl.src = audio.src

          $div.dataset.videoId = index

          $div.innerHTML = `
               <img class="images-group" src="${audio.images}" alt="${audio.title}"/>
               <h2>${audio.title}</h2>
          `
          $list.prepend($div)
     })
}
const playSelectedVideo = (e) => {
     if(e.target.classList.contains("selected")) {
          currentIndex = +e.target.dataset.videoId
          currentVideo()
          autoPlaying = false
          playVideo()
     }
}

renderList()
$playBtn.addEventListener("click", playVideo)
$pauseBtn.addEventListener("click", playVideo)
$next.addEventListener("click", nextVideo)
$prev.addEventListener("click", prevVideo)
$list.addEventListener("click", playSelectedVideo)
$shuffle.addEventListener("click", shuffleVideo)
$videRange.addEventListener("input", changeRange)