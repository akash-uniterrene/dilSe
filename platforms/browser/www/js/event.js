document.addEventListener("volumeupbutton", callbackFunction, false);  
document.getElementById("cordovaDevice").addEventListener("click", cordovaDevice);  

function callbackFunction() { 
   alert('Volume Up Button is pressed!');
}
function cordovaDevice() {
   alert("Cordova version: " + device.cordova + "\n" +
      "Device model: " + device.model + "\n" +
      "Device platform: " + device.platform + "\n" +
      "Device UUID: " + device.uuid + "\n" +
      "Device version: " + device.version);
}