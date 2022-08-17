import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';  
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { common } from '../app.common';
import { BaseComponent } from 'src/app/components/base/base.component';

declare var $ :any;

var messages: string[] = [], //array that hold the record of each string in chat
  lastUserMessage = "", //keeps track of the most recent input string from the user
  botMessage = "", //var keeps track of what the chatbot is going to say
  botName = 'ThienAnBOT', //name of the chatbot
  talking = true; //when false the speach function doesn't work
function chatbotResponse() {
  talking = true;
  botMessage = "Bạn cần nhập đúng lựa chọn !"; //the default message
  if (lastUserMessage === '1' || lastUserMessage.toLowerCase() =='mot') {
    const sdt = ['Điện thoại hỗ trợ: ','024 7308 3232 lẻ (102, 103, 104, 105)','Email tiếp nhận yêu cầu:','hotro@thienan.vn']
    botMessage =  sdt[0] + "<br>" + 
                  "<a href='tel:024 7308 3232'>"+sdt[1]+"</a>"+"<br>"+
                  sdt[2] + "<br>"+ 
                  "<a href='#' style='pointer-events: none;'>"+sdt[3]+"</a>";
  }
  if (lastUserMessage === '2' || lastUserMessage.toLowerCase() =='hai') {
    const dc = ['273, Nguyễn Trãi, Thanh Xuân, Hà Nội']
    botMessage = "<p style='color:blue;'>"+dc[0]+"</p>";
  }
  if (lastUserMessage === '3' || lastUserMessage.toLowerCase() =='ba') {
    const linkGT = ['http://thienan.vn/']
    botMessage = linkGT[0];
  }
  if (lastUserMessage === '4' || lastUserMessage.toLowerCase() =='bon') {
    const linkHD = ['http://thienan.vn/chitiet/video-huong-dan-su-dung-phan-mem/huong-dan-su-dung-phan-mem-quan-ly-dao-tao-phan-he-quan-ly-sinh-vien']
    botMessage = linkHD[0];
  }
  if (lastUserMessage === '5' || lastUserMessage.toLowerCase() =='nam') {
    const linkGT = ['Angular, .NET framework MVC, SQL Server']
    botMessage = "<p style='color:blue;'>"+linkGT[0]+"</p>";
  }
  if (lastUserMessage === 'name') {
    botMessage = 'My name is ' + botName;
  }
}
//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e: any) {
  console.log(e);
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    // newEntry();
  }
  if (key == 38) {
     
      //document.getElementById("chatbox").value = lastUserMessage;
  }
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent extends BaseComponent implements OnInit {

  Token: any

  public com: common | undefined;
  UserName_get: any;
  FullName_get: any;
  form = new FormGroup({
    myInput: new FormControl('')
  });

  ngOnInit(): void {
  }
  
  clickComment() {
    $('.chatbox-popup').fadeToggle();
  }
  closePopUp() {
    $('.chatbox-popup').fadeOut();
  }
  zoomOutPopUp() { 
    $('.chatbox-popup__main').css('height','50vh');
    $('.chatbox-zoomOut').css('display','none');
    $('.chatbox-zoomIn').css('display','block');
  }
  zoomInPopUp() { 
    $('.chatbox-popup__main').css('height','300px');
    $('.chatbox-zoomOut').css('display','block');
    $('.chatbox-zoomIn').css('display','none');
  }
  ngAfterViewInit() {
    setTimeout(() => {
      var elem = this.renderer.selectRootElement('#chatbox');
      elem.focus();

    }, 1000);
  }

  focusMyInput() {    
    var ampm = new Date().getHours() >= 12 ? 'pm' : 'am';
    var strTime = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds()+" "+ ampm;
    this.renderer.selectRootElement('#chatbox').focus();
    if (this.form.value.myInput != "") {
      lastUserMessage = this.remove_sign(this.form.value.myInput.toLowerCase());
      this.form.value.myInput = "";
      messages.push('   <div  > '+
      ' <div class="direct-chat-msg">' +
        ' <div class="direct-chat-infos clearfix">'+
          '<span class="direct-chat-name float-left">'+this.UserName_get+'</span>'+
          ' <span class="direct-chat-timestamp float-right">'+ strTime +'</span>'+
         '</div>'+
        ' <img class="direct-chat-img" src="assets/img/logoUser.png" alt="Message User Image">' +
         '<div class="direct-chat-text">'+
         lastUserMessage +
         '</div>'+
      ' </div>');
      chatbotResponse();
      if (lastUserMessage == "3" || lastUserMessage == "ba" || lastUserMessage == "4" || lastUserMessage == "bon") {

        messages.push(
          ' <div class="direct-chat-msg right">' +
            ' <div class="direct-chat-infos clearfix">' +
               '<span class="direct-chat-name float-right">' + botName +'</span>' +
               '<span class="direct-chat-timestamp float-left">' + strTime +'</span>'+
            ' </div>'+
            ' <img class="direct-chat-img" src="assets/img/logoChatBot.png" alt="Message User Image">'+
            ' <div class="direct-chat-text">'+
            "<a href = '"+botMessage+"' target='_blank'>"+botMessage+"</a>"+
            ' </div>'+
           '</div>'+
             '</div>')
      }  
      else {
        // messages.push("<b>" + botName + ":</b> " + botMessage);
        messages.push(
       ' <div class="direct-chat-msg right">' +
         ' <div class="direct-chat-infos clearfix">' +
            '<span class="direct-chat-name float-right">' + botName +'</span>' +
            '<span class="direct-chat-timestamp float-left">' + 
            strTime +'</span>'+
         ' </div>'+
         ' <img class="direct-chat-img" src="assets/img/logoChatBot.png" alt="Message User Image">'+
         ' <div class="direct-chat-text">'+
         botMessage+
         ' </div>'+
        '</div>'+
          '</div>')
      } 
      for (var i = 1; i < 8; i++) {
        if (messages[messages.length - i])
          $('#chatlog'+i).html(messages[messages.length - i]);
      }
      $('.chatbox-popup__main').scrollTop($('.chatbox-popup__main')[0].scrollHeight);
    }
    this.form.reset();
  }
}
