        const btnComenzar = document.querySelector("#comenzar");
        const btnGrabar = document.getElementById("grabar");
        const btnFinalizar = document.getElementById("finalizar");
        const numberOne = document.getElementById("number-one");
        const numberTwo = document.getElementById("number-two");
        const tituloCamara = document.getElementById("titulo-camara");
        const textoCamara = document.getElementById("texto-camara");
        const video = document.querySelector("video");
        const timeRecording = document.getElementById("time-recording");
        const recordedGif = document.getElementById("recorded-gif");
        let recorder;
        
        btnComenzar.addEventListener("click", e => {
          e.preventDefault();
          btnComenzar.style.display = "none";
          numberOne.classList.add("number-active");
          tituloCamara.innerText = "¿Nos das acceso a tu cámara?";
          textoCamara.innerText = "El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO";
          askForPermission();
        });

    function askForPermission() {
        navigator.mediaDevices.getUserMedia({ audio: false, video: {width: 480, height: 320}})
        .then((stream) => {
             tituloCamara.style.display = "none";
             textoCamara.style.display = "none";
             btnGrabar.style.display = "block";
             numberTwo.classList.add("number-active");
             numberOne.classList.remove("number-active");

        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
            video.play();
        };
         recorder = RecordRTC(stream, {
             type: "gif"
         })
        })
    }  
    var dateStart;  

     btnGrabar.addEventListener("click", e => {
         recorder.startRecording();
         console.log("grabando gif");
         dateStart = new Date().getTime();
         btnFinalizar.style.display = "block";
         btnGrabar.style.display = "none";
         timeRecording.style.display = "block";
         
         (function looper() {
             if(!recorder) return
             timeRecording.innerHTML = calculateTime((new Date().getTime() - dateStart) / 1000);
         })
     })
      
     let blob;
     btnFinalizar.addEventListener("click", e => {
       stopRecording();
     })

     function stopRecording() {
         recorder.stopRecording( () => {
             video.style.display = "none";
             console.log("finalizar grabacion");

             blob = recorder.getBlob();
             recordedGif.src = URL.createObjectURL(recorder.getBlob())
         })
     }
    
     function calculateTime(time) {
         var hr = Math.floor(time / 3600);
         var min = Math.floor((time - (hr * 3600)) / 60);
         var sec = Math.floor((time - (hr * 3600) - (min * 60)));

         if (min < 10) {
             min = "0" + min
         }
         if (sec < 10) {
             sec = "0" + sec
         }
         return `${hr}:${min}:${sec}`
     }