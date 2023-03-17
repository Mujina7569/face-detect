let video = null
let detector = null
let detections = []
let videoVisibility = true
let detecting = false
let canvas

const toggleVideoEl = document.getElementById('toggleVideoEl')
const toggleDetectingEl = document.getElementById('toggleDetectingEl')
const labelEl = document.getElementById('label')

document.body.style.cursor = 'wait'

function preload() {
  const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
  }
  detector = ml5.faceApi(detectionOptions, modelLoaded)
}

function modelLoaded() {
  console.log('Model Loaded!')

  faceapi.detect(myImage, (err, results) => {
    console.log(results)
  })
}

function setup() {
  canvas = createCanvas(640, 480)
  video = createCapture(VIDEO)
  video.size(640, 480)
  console.log('video element is created')
  video.elt.addEventListener('loadeddata', function () {

    if (video.elt.readyState >= 2) {
      document.body.style.cursor = 'default'
      console.log(
        'video element is ready! Click "Start Detecting" to see the magic!'
      )
    }
  })
  video.hide();
}

function draw() {
  if (!video || !detecting) return

  image(video, 0, 0)

  for (let i = 0; i < detections.length; i++) {
    drawResult(detections[i])
  }
}

function drawResult(object) {
  drawBoundingBox(object)
  drawLabel(object)
}

function drawBoundingBox(object) {
  stroke('green')
  strokeWeight(4)
  noFill()
  rect(object.x, object.y, object.width, object.height)
}

function drawLabel(object) {
  noStroke()
  fill('white')
  textSize(24)
  text(object.label, object.x + 10, object.y + 24)
}

function onDetected(error, results) {
  if (error) {
    console.error(error)
  }
  detections = results

  if (detections.length > 0) {
    hideVieoElAfterDetected()
  }

  if (detecting) {
    detect()
  }
}

function detect() {
  detector.detect(video, onDetected)
}

function toggleVideo() {
  if (!video) return
  if (videoVisibility) {
    video.hide()
    toggleVideoEl.innerText = 'Show Video'
  } else {
    video.show()
    toggleVideoEl.innerText = 'Hide Video'
  }
  videoVisibility = !videoVisibility
}

// Main
function hideVieoElAfterDetected() {
  canvas.hide()
  toggleDetecting()
  labelEl.style.display = ''
  labelEl.innerText = 'Face Detected !!!'
}

function toggleDetecting() {
  if (!video || !detector) return
  if (!detecting) {
    detect()
    canvas.show()
    labelEl.style.display = 'none'
    labelEl.innerText = ''
  } else {
    toggleDetectingEl.innerText = 'Start Detecting'
  }
  detecting = !detecting
}
