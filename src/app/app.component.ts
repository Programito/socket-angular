import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(
    public wsService: WebsocketService,
    public chatService: ChatService
    ) {}

  // componente principal y siempre estara activo
  // por eso lo usamos para mensajes privados
  // cuando se inicialice el AppComponent
  ngOnInit() {
    this.chatService.getMessagesPrivate().subscribe(msg => {
      console.log(msg);
    });
  }
 
}
