var dog = 0;
var cat = 0;

function start() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/OnreFPPim/model.json', modelReady);
        })
        .catch(function (error) {
            console.error('Erro ao acessar o microfone:', error);
        });
}

function modelReady() {
    classifier.classify(gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }

    else {
        console.log(results);
        random_number_r = Math.floor(Math.random() * 255) + 1;
        random_number_g = Math.floor(Math.random() * 255) + 1;
        random_number_b = Math.floor(Math.random() * 255) + 1;
    
        document.getElementById("name-audio").innerHTML = 'Som detectado de  - '+ results[0].label;
        document.getElementById("audioNum").innerHTML = 'Cachorro detectado - '+dog+ ' Gato detectado - '+cat;
        document.getElementById("name-audio").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_r+")";
        document.getElementById("audioNum").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_r+")";
    
        img = document.getElementById('animal_image');
    
        if (results[0].label == "Cachorro") {
          img.src = 'bark.gif';
          dog = dog+1;
        } else if (results[0].label == "Gato") {
          img.src = 'meow.gif';
          cat = cat + 1;
        } else{
          img.src = 'listen.gif';
        }
    }
}
