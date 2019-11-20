const URL = 'https://teachablemachine.withgoogle.com/models/WbliF9QZ/model.json';

let classifier;
let video;
let prediction;
let loading;
let ready = false;

function setup() {
    noCanvas();

    video = createCapture({
        video: {
            width: 1024,
            height: 1024,
        },
        audio: false,
    }, videoReady);
    video.parent('videoContainer')
    video.class('video hide');

    prediction = createP('');
    prediction.parent('videoContainer');
    prediction.class('prediction')

    loading = createP('Loading model...')
    loading.parent('videoContainer');
    loading.class('loading');
}

function videoReady() {
    classifier = ml5.imageClassifier(URL, video, modelReady);
}

function modelReady() {
    classify();
}

function classify() {
    classifier.classify(1, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    if (!ready) {
        ready = true;
        video.class('video');
        loading.html('').class('hide');
    }

    if (results) {
        prediction.html(emoji(results[0].label));
    }

    classify();
}

function emoji(text) {
    switch (text) {
        case 'rock': return '✊';
        case 'paper': return '✋';
        case 'scissors': return '✌';
        default: return '❓';
    }
}