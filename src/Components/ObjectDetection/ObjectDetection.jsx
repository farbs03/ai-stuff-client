import React from "react";
import ReactDOM from "react-dom";
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import { Button } from "@material-ui/core"
import "./styles.css"
const cocoSsd = require('@tensorflow-models/coco-ssd');

tf.setBackend('webgl');



const ObjectDetection = () => {
    
    

    // Check if webcam access is supported.
    function getUserMediaSupported() {
        return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
    }
    
    // If webcam supported, add event listener to button for when user
    // wants to activate it to call enableCam function which we will 
    // define in the next step.
    
    // Enable the live webcam view and start classification.
    function enableCam(event) {
        const video = document.getElementById('webcam');
        // Only continue if the COCO-SSD has finished loading.
        if (!model) {
            return;
        }
        
        // Hide the button once clicked.
        event.target.classList.add('removed');  
        
        // getUsermedia parameters to force video but not audio.
        const constraints = {
            video: true
        };

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            video.srcObject = stream;
            video.addEventListener('loadeddata', predictWebcam);
        });
    }
    // Store the resulting model in the global scope of our app.
    var model = undefined;
    cocoSsd.load().then(function (loadedModel) {
        model = loadedModel;
    });

    var children = [];

    function predictWebcam() {
        const video = document.getElementById('webcam');
        const liveView = document.getElementById('liveView');
        const demosSection = document.getElementById('demos');
        const enableWebcamButton = document.getElementById('webcamButton');
        // Now let's start classifying a frame in the stream.
        model.detect(video).then(function (predictions) {
            // Remove any highlighting we did previous frame.
            for (let i = 0; i < children.length; i++) {
                liveView.removeChild(children[i]);
            }
            children.splice(0);
            
            // Now lets loop through predictions and draw them to the live view if
            // they have a high confidence score.
            for (let n = 0; n < predictions.length; n++) {
                // If we are over 66% sure we are sure we classified it right, draw it!
                if (predictions[n].score > 0.66) {
                    const p = document.createElement('p');
                    p.innerText = predictions[n].class  + ' - with ' 
                        + Math.round(parseFloat(predictions[n].score) * 100) 
                        + '% confidence.';
                    p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
                        + (predictions[n].bbox[1] - 10) + 'px; width: ' 
                        + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

                    const highlighter = document.createElement('div');
                    highlighter.setAttribute('class', 'highlighter');
                    highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
                        + predictions[n].bbox[1] + 'px; width: ' 
                        + predictions[n].bbox[2] + 'px; height: '
                        + predictions[n].bbox[3] + 'px;';

                    liveView.appendChild(highlighter);
                    liveView.appendChild(p);
                    children.push(highlighter);
                    children.push(p);
                }
            }
            
            // Call this function again to keep predicting when the browser is ready.
            window.requestAnimationFrame(predictWebcam);
        });
    }
    return (
        <section id="demos">

            <p>Hold some objects up close to your webcam to get a real-time classification! When ready click "enable webcam" below and accept access to the webcam when the browser asks (check the top left of your window)</p>
        
            <div id="liveView" className="camView">
                <Button onClick={enableCam} id="webcamButton">Enable Webcam</Button>
                <video id="webcam" autoPlay width="640" height="480"></video>
            </div>

        </section>
    );
}
  

export default ObjectDetection