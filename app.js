(function(){
  "use strict"; //aitab vältida globaalseid muutujaid


  // SINGLETON PATTERN (4 rida) - üksik objekt, mis keelab objekti mitmekordse välja kutsumise.
  var Calendar = function(){
    if(Calendar.instance){
      return Calendar.instance;
    }
    Calendar.instance = this;

    this.collection = [];

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
      document.querySelector('.add-new-to-do').addEventListener('click', this.addNewClic.bind(this));
    },

    addNewClic: function(event){
      var start_date = document.querySelector('.start-date').value;
      var start_time = document.querySelector('.start-time').value;
      var finish_date = document.querySelector('.finish-date').value;
      var finish_time = document.querySelector('.finish-time').value;
      var finish_date_task = document.querySelector('.finish-date').value;
      var finish_time_task = document.querySelector('.finish-time').value;
      console.log(document.querySelector('.task-description'));
      console.log(document.querySelector('.meeting-description'));
      var meeting_description = document.querySelector('.meeting-description').value;
      //console.log(start_date+' '+start_time+' '+finish_date+' '+finish_time+' '+meeting_description);
      var task_description = document.querySelector('.task-description').value;

      var new_meeting = new Meeting(start_date, start_time, finish_date, finish_time, meeting_description);
      var new_task = new Task(finish_date_task, finish_time_task, task_description);

      this.collection.push(new_meeting);
      this.collection.push(new_task);
      console.log(this.collection);

      //sorteeri
      //this.collection
      this.collection = this.collection.sort(function(meeting1,meeting2) {
          return meeting1.start_date > meeting2.start_date;
       });

       //ksututab k]ik tühjaks
      document.querySelector('.list-of-meetings').innerHTML = '';

      for(var i = 0; i < this.collection.length; i++){
        if(this.collection[i].type == "meeting"){
          console.log('meeting');
        }
        var li = this.collection[i].createHtmlElement();
        document.querySelector('.list-of-meetings').appendChild(li);
      }

      //LISAD JUURDE
     //var li = new_meeting.createHtmlElement();
     //document.querySelector('.list-of-meetings').appendChild(li);



    }
  };

  var Meeting = function(new_start_date, new_start_time, new_finish_date, new_finish_time, new_meeting_description){
    this.start_date = new_start_date;
    this.start_time = new_start_time;
    this.finish_date = new_finish_date;
    this.finish_time = new_finish_time;
    this.meeting_description = new_meeting_description;
    this.type = "meeting";
  };

  var Task = function(new_finish_date_task, new_finish_time_task, new_task_description){
    this.finish_date_task = new_finish_date_task;
    this.finish_time_task = new_finish_time_task;
    this.task_description = new_task_description;
    this.type = "task";
  };

  Task.prototype={
    createHtmlElement: function(){
      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.task_description.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var content_span = document.createElement('span');
      content_span.className = 'content';

      var content = document.createTextNode(this.finish_date_task +'  ' + this.finish_time_task + ' | ' + this.task_description);

      content_span.appendChild(content);

      li.appendChild(content_span);

      console.log(li);

      return li;
    }
  };

  Meeting.prototype={
    createHtmlElement: function(){
      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.meeting_description.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var content_span = document.createElement('span');
      content_span.className = 'content';

      var content = document.createTextNode(this.start_date +'  ' + this.start_time + ' | ' + this.finish_date +'  ' + this.finish_time +' | '+ this.meeting_description);

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
