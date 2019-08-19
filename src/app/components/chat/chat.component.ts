import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  // desuscribirse cuando cambies de direccion
  mensajesSubscription: Subscription;

  // para crear el scroll con un setTimeOut
  elemento: HTMLElement;
  mensajes: any[] = [];

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes');

    this.mensajesSubscription = this.chatService.getMessages().subscribe( msg => {
      console.log(msg);
      this.mensajes.push(msg);

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }

  enviar() {
    // si es vacio no envia nada
    if ( this.texto.trim().length === 0) {
      return; 
    }
    console.log(this.texto);
    this.chatService.sendMessage(this.texto);
    this.texto = '';
  }

}
