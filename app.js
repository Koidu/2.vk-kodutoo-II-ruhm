(function(){
  "use strict"; //aitab vältida globaalseid muutujaid

  // SINGLETON PATTERN (4 rida) - üksik objekt, mis keelab objekti mitmekordse välja kutsumise.
  var Calendar = function(){
    if(Calendar.instance){
      return Calendar.instance;
    }
    Calendar.instance = this;
    this.routes = Calendar.routes;
    console.log(this); //writing into the browser console

    this.currentRoute = null;
    this.interval = null;
    //siin paneme rakenduse tööle
    this.init();
  };



  //iga lehe kohta hoiame meeles, mis lehel oleme
  Calendar.routes = {
    "home-view":{
      render: function(){
        console.log('Home page');
      }
    },

    "calendar-view":{
      render: function(){
        console.log('Calendar page');
      }
    },

    "to-do-view":{
      render: function(){
        console.log('To do page');
      }
    }
  };




  //kõik kalendri funktsioonid tulevad siia
  //kõik JS objektid pärivad oma omadused ja meetodid oma prototüübilt
  Calendar.prototype = {
    init: function(){
      console.log('rakendus käivitus');
      window.addEventListener('hashchange', this.routeChange.bind(this));
      //vaatan, mis lehel olen
      console.log(window.location.hash);
        if(!window.location.hash){
          window.location.hash = "#home-view";
        }else{
          this.routeChange();
        }
      this.bindMouseEvents();
    },

    bindMouseEvents: function(){
      document.querySelector('add-new-meetings').addEventListener('click', this.addNewClic.bind(this));
    },

    addNewClic: function(event){
      this_click_count++;
      console.log(this_click_count);
    },


    routeChange: function(event){
      this.currentRoute = window.location.hash.slice(1);
      //kas leht on olemas
      if(this.routes[this.currentRoute]){
        this.updateMenu();
        console.log('>>>' + this.currentRoute);
        this.routes[this.currentRoute].render();
      }else{
        console.log('404');
        window.location.hash = "#home-view";
      }
    },

    updateMenu: function(){
      // kui on menuul klass active menu, siis v6tame 2ra
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace(' active-menu', '');

      document.querySelector('.'+this.currentRoute).className += ' active-menu';
      //lisan juurde
    }
  };



  // ?? mida see asi täpsemalt välja kutsub? suure funktsiooni?
  window.onload = function(){
    var app = new Calendar();
  };

})();
