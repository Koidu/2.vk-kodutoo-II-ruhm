(function(){
  "use strict"; //aitab vältida globaalseid muutujaid

  // SINGLETON PATTERN (4 rida) - üksik objekt, mis keelab objekti mitmekordse välja kutsumise.
  var Calendar = function(){
    if(Calendar.instance){
      return Calendar.instance;
    }
    Calendar.instance = this;
    console.log('kalendri sees'); //writing into the browser console
  };


})();
