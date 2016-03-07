(function(){
  "use strict"; //aitab vältida globaalseid muutujaid


  // SINGLETON PATTERN (4 rida) - üksik objekt, mis keelab objekti mitmekordse välja kutsumise.
  var Calendar = function(){
    if(Calendar.instance){
      return Calendar.instance;
    }
    Calendar.instance = this;


    //siin paneme rakenduse tööle
    this.init();
  };




  //kõik kalendri funktsioonid tulevad siia
  //kõik JS objektid pärivad oma omadused ja meetodid oma prototüübilt
  Calendar.prototype = {
    init: function(){
      console.log('rakendus käivitus');
      this.bindMouseEvents();
    },

    bindMouseEvents: function(){
      document.querySelector('.add-new-meetings').addEventListener('click', this.addNewClic.bind(this));
    },

    addNewClic: function(event){
      var start_date = document.querySelector('.start-date').value;
      var start_time = document.querySelector('.start-time').value;
      var finish_date = document.querySelector('.finish-date').value;
      var finish_time = document.querySelector('.finish-time').value;
      var meeting_description = document.querySelector('.meeting-description').value;
      //console.log(start_date+' '+start_time+' '+finish_date+' '+finish_time+' '+meeting_description);

      var new_meeting = new Meeting(start_date, start_time, finish_date, finish_time, meeting_description);
      var li = new_meeting.createHtmlElement();
      document.querySelector('.list-of-meetings').appendChild(li);
    }
  };

  var Meeting = function(new_start_date, new_start_time, new_finish_date, new_finish_time, new_meeting_description){
    this.start_date = new_start_date;
    this.start_time = new_start_time;
    this.finish_date = new_finish_date;
    this.finish_time = new_finish_time;
    this.meeting_description = new_meeting_description;
  };

  Meeting.prototype={
    createHtmlElement: function(){
      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var content_span = document.createElement('span');
      content_span.className = 'content';

      var content = document.createTextNode(this.start_date +'  ' + this.start_time + ' | ' + this.finish_date +'  ' + this.finish_time +'<br>'+ this.meeting_description);

      content_span.appendChild(content);

      li.appendChild(content_span);

      console.log(li);

      return li;
    }
  };





  // ?? mida see asi täpsemalt välja kutsub? suure funktsiooni?
  window.onload = function(){
    var app = new Calendar();
  };

})();
