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

      if(localStorage.events){
        this.collection = JSON.parse(localStorage.events);
        console.log('laadisin massiivi' + this.collection.length);

        this.collection.forEach(function(collection){

            var new_collection = new Meeting(collection.id, collection.start_date, collection.start_time, collection.finish_date, collection.finish_time, collection.meeting_description);

            var li = new_collection.createHtmlElement();
            document.querySelector('.list-of-meetings').appendChild(li);

        });
      }


      this.bindMouseEvents();
    },

    bindMouseEvents: function(){
      document.querySelector('.add-new-meetings').addEventListener('click', this.addNewClic.bind(this));
      //document.querySelector('.add-new-to-do').addEventListener('click', this.addNewTask.bind(this));
    },

    deleteMeeting: function(event){
      console.log(event.target);
      console.log(event.target.parentNode);
      console.log(event.target.parentNode.parentNode);
      console.log(event.target.dataset.id);
      var c = confirm("Oled kindel?");

      //kui ei ole kindel
      if(!c){return;}
      console.log('kustutan');
      var ul = event.target.parentNode.parentNode;
  		var li = event.target.parentNode;
      ul.removeChild(li);

      var delete_id = event.target.dataset.id;

  		for(var i = 0; i < this.collection.length; i++){

  			if(this.collection[i].id == delete_id){
  				this.collection.splice(i, 1);
  				break;
  			}
  		}

  		localStorage.setItem('events', JSON.stringify(this.collection));

    },

    // addNewTask: function(event){
    //   var finish_date_task = document.querySelector('.finish-date').value;
    //   var finish_time_task = document.querySelector('.finish-time').value;
    //   console.log(document.querySelector('.task-description'));
    //   var task_description = document.querySelector('.task-description').value;
    //   //var new_task = new Task(finish_date_task, finish_time_task, task_description);
    //  this.collection.push(new_task);
    // },

    addNewClic: function(event){
      var start_date = document.querySelector('.start-date').value;
      var start_time = document.querySelector('.start-time').value;
      var finish_date = document.querySelector('.finish-date').value;
      var finish_time = document.querySelector('.finish-time').value;
      console.log(document.querySelector('.meeting-description'));

      var meeting_description = document.querySelector('.meeting-description').value;
      var id = guid();


      var new_meeting = new Meeting(id, start_date, start_time, finish_date, finish_time, meeting_description);


      this.collection.push(new_meeting);
      console.log(JSON.stringify(this.collection));
      localStorage.setItem('events', JSON.stringify(this.collection));


      //sorteeri
      //this.collection
      this.collection = this.collection.sort(function(meeting1,meeting2) {
          return meeting1.start_date > meeting2.start_date;
       });

       //kustutab kõik tühjaks
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

  var Meeting = function(new_id, new_start_date, new_start_time, new_finish_date, new_finish_time, new_meeting_description){
    this.id = new_id;
    this.start_date = new_start_date;
    this.start_time = new_start_time;
    this.finish_date = new_finish_date;
    this.finish_time = new_finish_time;
    this.meeting_description = new_meeting_description;
    this.type = "meeting";
  };

  // var Task = function(new_finish_date_task, new_finish_time_task, new_task_description){
  //   this.finish_date_task = new_finish_date_task;
  //   this.finish_time_task = new_finish_time_task;
  //   this.task_description = new_task_description;
  //   this.type = "task";
  // };

  // Task.prototype={
  //   createHtmlElement: function(){
  //     var li = document.createElement('li');
  //
  //     var span = document.createElement('span');
  //     span.className = 'letter';
  //
  //     var letter = document.createTextNode(this.task_description.charAt(0));
  //     span.appendChild(letter);
  //
  //     li.appendChild(span);
  //
  //     var content_span = document.createElement('span');
  //     content_span.className = 'content';
  //
  //     var content = document.createTextNode(this.finish_date_task +'  ' + this.finish_time_task + ' | ' + this.task_description);
  //
  //     content_span.appendChild(content);
  //
  //     li.appendChild(content_span);
  //
  //     console.log(li);
  //
  //     return li;
  //   }
  // };

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

      //DELETE nupp
      var span_delete = document.createElement('span');
 	    span_delete.style.color = "red";
 	    span_delete.style.cursor = "pointer";
 	    //kustutamiseks panen id kaasa
 	    span_delete.setAttribute("data-id", this.id);
 	    span_delete.innerHTML = " Delete";
 	    li.appendChild(span_delete);
 	    //keegi vajutas nuppu
 	    span_delete.addEventListener("click", Calendar.instance.deleteMeeting.bind(Calendar.instance));

      return li;
    }
  };

  //HELPER
  function guid(){
   var d = new Date().getTime();
   if(window.performance && typeof window.performance.now === "function"){
     d += performance.now(); //use high-precision timer if available
   }
   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = (d + Math.random()*16)%16 | 0;
     d = Math.floor(d/16);
     return (c=='x' ? r : (r&0x3|0x8)).toString(16);
   });
   return uuid;
 }




  // ?? mida see asi täpsemalt välja kutsub? suure funktsiooni?
  window.onload = function(){
    var app = new Calendar();
  };

})();
