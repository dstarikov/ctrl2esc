/* Based off google's chromeOS capslock remap example keyboard */
var contextID = -1;
var lastRemappedKeyEvent = undefined;
var ctrlKey = false;

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(function(context) {
  contextID = -1;
});

function isControlKey(keyData) {
   return (keyData.code == "ControlLeft");
};

function isRemappedEvent(keyData) {  
 // hack, should check for a sender ID (to be added to KeyData)
 return lastRemappedKeyEvent != undefined &&
        (lastRemappedKeyEvent.key == keyData.key &&
         lastRemappedKeyEvent.code == keyData.code &&
         lastRemappedKeyEvent.type == keyData.type
        ); // requestID would be different so we are not checking for it  
}

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (isRemappedEvent(keyData)) {
        console.log(keyData); // TODO eventually remove
        return false;
      }
      
      
      if (isControlKey(keyData)) {
        ctrlKey = (keyData.type == "keydown");

        // Send the Escape if it was just a ctrl press
        if (keyData.type == "keyup" && lastRemappedKeyEvent != undefined 
            && lastRemappedKeyEvent.key == keyData.key && lastRemappedKeyEvent.type == "keydown") {
          lastRemappedKeyEvent = keyData;
          chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});

          keyData.code = "Escape";
          keyData.key = "Esc";
          keyData.type = "keydown";

          lastRemappedKeyEvent = keyData;
          chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});

          keyData.type = "keyup";

          lastRemappedKeyEvent = keyData;
          chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});

          handled = true;
        } else {
          lastRemappedKeyEvent = keyData;
          chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
          handled = true;
        }
      } else if (ctrlKey) {
        keyData.ctrlKey = ctrlKey;
        chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [keyData]});
        lastRemappedKeyEvent = keyData;
        handled = true;
      }       
      return handled;
});
