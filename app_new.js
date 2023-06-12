let faceapi;
let video;
let detections;

const labelEl = document.getElementById('label');
const detection_options = {withLandmarks: true,  withDescriptors: false,}

function setup() {
  video = createCapture(VIDEO);
  video.size(width, height);
  labelEl.style.display = 'none';
  faceapi = ml5.faceApi(video, detection_options, modelReady);
}

function modelReady() {
  faceapi.detect(gotResults);
}

function gotResults(err, result) {

  detections = result;
  labelEl.style.display = 'none';
  video.show();

  if (detections) {

    if (detections.length > 0) {
      labelEl.style.display = '';
      video.hide();
    }

  }

  faceapi.detect(gotResults)
}