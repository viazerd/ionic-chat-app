import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket:Socket) { }

  socketConnect(){
    this.socket.connect();
    console.log('Socket Connected');
  }

  online(username){
    this.socket.emit('online',username);
  }
}
