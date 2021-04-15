var video = document.getElementById("video");
var videoTexto = document.getElementById("videoTexto");

function subirArchivo() {
  videoTexto.textContent =
    "El vídeo se está subiendo. Este proceso puede tardar unos momentos.";
}

function playVideo() {
  video.play();
}

function pauseVideo() {
  video.pause();
}

function subirVolumen() {
  if (video.volume > 0.9) {
  } else {
    video.volume += 0.1;
  }
}

function bajarVolumen() {
    if (video.volume < 0.001) {
    } else {
      video.volume -= 0.1;
    }
}

video.onloadeddata = function () {
  videoTexto.textContent = "";
};

function handleFileSelect(evt) {
  var files = evt.target.files;
  for (var i = 0, f; (f = files[i]); i++) {
    if (!f.type.match("video.*")) {
      video.src = "";
      videoTexto.textContent = "Este archivo no corresponde con el tipo video.";
      continue;
    }
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        video.src = "";
        videoTexto.textContent ="";
        video.src = e.target.result;
      };
    })(f);
    reader.onloadstart = (function (theFile) {
      return function (e) {
        video.src = "";
        videoTexto.textContent =
          theFile.name +
          " se está subiendo. Este proceso puede tardar unos momentos.";
      };
    })(f);
    reader.readAsDataURL(f);
  }
}
