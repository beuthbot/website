import { environment } from './../../environments/environment.dev';
import { Component, OnInit } from '@angular/core';
import {Gateway, BotRequest} from '@bhtbot/bhtbot';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  reply = '';
  value = '';

  gateway = new Gateway(environment.gateway_endpoint, 'website');

  message: BotRequest;

  constructor() { }

  ngOnInit() {
  }

  messageRequest() {
    this.message = new BotRequest({
      text: 'Wie ist das Wetter?',        // cleanMessage
      clientDate: new Date().getTime(),   // createdTimestamp
      clientLanguage: 'de'
    });
  }

  chatbotReply(messageRequest) {
    messageRequest = this.messageRequest();
    this.gateway.query(messageRequest).then(botResponse => {
      console.log('bot responded', botResponse);
      if (botResponse && botResponse.answer && botResponse.answer.content) {
          const responseMessage = botResponse.answer.content;
          this.reply = responseMessage;
      } else {
        this.reply = 'ERROR cant connect to bot gateway';
      }
      console.log(this.reply);
    });
  }

}
