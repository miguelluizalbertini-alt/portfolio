

/* =========================================================
VIDEO ASSETS
Somente vídeos dependem do JavaScript.
As thumbs agora estão diretamente no HTML.
========================================================= */

const portfolioAssets = {

  almondegaVideo:
  "assets/videos/Almondega_Web_1080p.mp4",

  midnightVideo:
  "assets/videos/teaser_midnight_circus.mp4",

  icomSelectVideo:
  "assets/videos/XP1.mp4",

  instaplay06Video:
  "assets/videos/INSTAPLAY-ANUNCIO-06.mp4",

  icpVideo:
  "assets/videos/AUDIO-OK-REELS-ICP.mp4",

  instaplay04Video:
  "assets/videos/INSTAPLAY-ANUNCIO-04.mp4",

  instaplay01Video:
  "assets/videos/INSTAPLAY-ANUNCIO-01-COM-PRECO.mp4"

};



/* =========================================================
MODAL
========================================================= */

const modal =
document.getElementById("videoModal");

const modalVideo =
document.getElementById("modalVideo");

const modalYoutube =
document.getElementById("modalYoutube");

const modalTitle =
document.getElementById("modalTitle");

const modalMeta =
document.getElementById("modalMeta");

const modalClose =
document.getElementById("modalClose");



document
.querySelectorAll(".video-project")
.forEach(function(project){


  project.addEventListener(
    "click",
    function(){


      const youtubeID =
      project.dataset.youtube;


      const videoKey =
      project.dataset.videoKey;


      const videoURL =
      videoKey
      ? portfolioAssets[videoKey]
      : null;



      if(youtubeID){


        modalVideo.pause();

        modalVideo.style.display =
        "none";


        modalYoutube.style.display =
        "block";


        modalYoutube.src =
        "https://www.youtube.com/embed/" +
        youtubeID +
        "?autoplay=1&rel=0";


      }


      else if(videoURL){


        modalYoutube.removeAttribute(
          "src"
        );


        modalYoutube.style.display =
        "none";


        modalVideo.style.display =
        "block";


        modalVideo.src =
        videoURL;


        modalVideo
        .play()
        .catch(function(){});


      }


      else{

        return;

      }



      modalTitle.textContent =
      project.dataset.title || "";


      modalMeta.textContent =
      project.dataset.meta || "";


      modal.classList.add(
        "active"
      );


      document.body.classList.add(
        "modal-open"
      );


    }
  );


});



function closeVideoModal(){


  modal.classList.remove(
    "active"
  );


  document.body.classList.remove(
    "modal-open"
  );


  modalVideo.pause();


  modalVideo.removeAttribute(
    "src"
  );


  modalVideo.load();


  modalYoutube.removeAttribute(
    "src"
  );


  modalVideo.style.display =
  "none";


  modalYoutube.style.display =
  "none";


}



modalClose.addEventListener(
  "click",
  function(event){

    event.stopPropagation();

    closeVideoModal();

  }
);



modal.addEventListener(
  "click",
  function(event){

    if(
      event.target === modal
    ){

      closeVideoModal();

    }

  }
);



document.addEventListener(
  "keydown",
  function(event){

    if(
      event.key === "Escape"
    ){

      closeVideoModal();

    }

  }
);



/* =========================================================
COLOR GRADING
========================================================= */

const colorCompare =
document.getElementById(
  "colorCompare"
);


const gradeRawVideo =
document.getElementById(
  "gradeRawVideo"
);


const gradeFinalVideo =
document.getElementById(
  "gradeFinalVideo"
);


const compareSlider =
colorCompare.querySelector(
  ".compare-range"
);


const compareLine =
colorCompare.querySelector(
  ".slider-line"
);


const compareCircle =
colorCompare.querySelector(
  ".slider-circle"
);



gradeRawVideo.muted =
true;


gradeFinalVideo.muted =
true;


gradeRawVideo.defaultMuted =
true;


gradeFinalVideo.defaultMuted =
true;



function updateColorDivider(value){


  const split =
  Math.max(
    0,
    Math.min(
      100,
      Number(value)
    )
  );


  gradeFinalVideo.style.clipPath =
  "inset(0 0 0 " +
  split +
  "%)";


  compareLine.style.left =
  split +
  "%";


  compareCircle.style.left =
  split +
  "%";


}



updateColorDivider(
  compareSlider.value
);



compareSlider.addEventListener(
  "input",
  function(){

    updateColorDivider(
      compareSlider.value
    );

  }
);



function playColorVideos(){


  gradeRawVideo.muted =
  true;


  gradeFinalVideo.muted =
  true;


  gradeRawVideo
  .play()
  .catch(function(){});


  gradeFinalVideo
  .play()
  .catch(function(){});


}



function syncColorVideos(){


  if(
    !gradeRawVideo.paused &&
    gradeFinalVideo.readyState >= 2
  ){


    const difference =
    Math.abs(
      gradeRawVideo.currentTime -
      gradeFinalVideo.currentTime
    );


    if(
      difference > .12
    ){


      gradeFinalVideo.currentTime =
      gradeRawVideo.currentTime;


    }


  }


  requestAnimationFrame(
    syncColorVideos
  );


}



syncColorVideos();



gradeRawVideo.addEventListener(
  "seeked",
  function(){

    gradeFinalVideo.currentTime =
    gradeRawVideo.currentTime;

  }
);



if(
  "IntersectionObserver" in window
){


  const colorObserver =
  new IntersectionObserver(

    function(entries){


      entries.forEach(
        function(entry){


          if(
            entry.isIntersecting
          ){


            playColorVideos();


          }


          else{


            gradeRawVideo.pause();

            gradeFinalVideo.pause();


          }


        }
      );


    },

    {
      threshold:.15
    }

  );


  colorObserver.observe(
    colorCompare
  );


}



/* =========================================================
SECTION REVEAL
NÃO esconde nada previamente.
A animação é executada diretamente pelo navegador.
========================================================= */

const motionDisabled =
window.matchMedia &&
window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;



if(
  !motionDisabled &&
  "IntersectionObserver" in window
){


  const sections =
  document.querySelectorAll(
    ".portfolio .section, .portfolio .contact"
  );


  const sectionObserver =
  new IntersectionObserver(

    function(entries){


      entries.forEach(
        function(entry){


          if(
            entry.isIntersecting
          ){


            entry.target.animate(

              [

                {
                  opacity:0,
                  transform:
                    "translateY(15px)"
                },

                {
                  opacity:1,
                  transform:
                    "translateY(0)"
                }

              ],

              {
                duration:700,

                easing:
                  "cubic-bezier(.2,.7,.2,1)",

                fill:"both"
              }

            );


            sectionObserver.unobserve(
              entry.target
            );


          }


        }
      );


    },

    {
      threshold:.10,

      rootMargin:
        "0px 0px -5% 0px"
    }

  );


  sections.forEach(
    function(section){

      sectionObserver.observe(
        section
      );

    }
  );


}



/* =========================================================
AUTOPLAY FALLBACK
========================================================= */

window.addEventListener(
  "load",
  function(){


    setTimeout(
      playColorVideos,
      300
    );


  }
);



let modalTrigger = null;
document.querySelectorAll('.video-project').forEach(project => {
  project.tabIndex = 0;
  project.setAttribute('role', 'button');
  project.setAttribute('aria-label', 'Play ' + project.dataset.title);
  project.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); project.click();
    }
  });
  project.addEventListener('click', () => {
    if (!modal.classList.contains('active')) return;
    modalTrigger = project;
    modal.setAttribute('aria-hidden', 'false');
    document.querySelector('.portfolio').inert = true;
    modalClose.focus();
  });
});
const originalCloseVideoModal = closeVideoModal;
closeVideoModal = function() {
  const wasOpen = modal.classList.contains('active');
  originalCloseVideoModal();
  modal.setAttribute('aria-hidden', 'true');
  document.querySelector('.portfolio').inert = false;
  if (wasOpen && modalTrigger) modalTrigger.focus();
};
modal.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const media = modalYoutube.style.display === 'block' ? modalYoutube : modalVideo;
  if (event.shiftKey && document.activeElement === modalClose) {
    event.preventDefault(); media.focus();
  } else if (!event.shiftKey && document.activeElement === media) {
    event.preventDefault(); modalClose.focus();
  }
});
