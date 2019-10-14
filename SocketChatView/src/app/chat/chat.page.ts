import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(private route: ActivatedRoute) { 

    console.log(route.snapshot.paramMap.get('userId'))
  }

  ngOnInit() {
   
  }

}
