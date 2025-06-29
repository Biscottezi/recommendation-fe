import { Component } from '@angular/core';
import { delay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  isOpen = false;
  messages: ChatMessage[] = [];
  newMessage = '';

  constructor(private router: Router) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push(<ChatMessage>{
        content: this.newMessage,
        isUser: true,
      });
      this.newMessage = '';

      delay(2000);

      this.messages.push(<ChatMessage>{
        content: 'Howard LC0008 Leather Conditioner, 8-Ounce (4-Pack)',
        isUser: false,
        productId: 'B01CUPMQZE'
      });

      this.messages.push(<ChatMessage>{
        content: 'Yes to Tomatoes Detoxifying Charcoal Cleanser (Pack of 2) with Charcoal Powder, Tomato Fruit Extract, and Gingko Biloba Leaf Extract, 5 fl. oz.',
        isUser: false,
        productId: 'B076WQZGPM'
      });

      this.messages.push(<ChatMessage>{
        content: 'Eye Patch Black Adult with Tie Band (6 Per Pack)',
        isUser: false,
        productId: 'B000B658RI'
      });

      this.messages.push(<ChatMessage>{
        content: 'Tattoo Eyebrow Stickers, Waterproof Eyebrow, 4D Imitation Eyebrow Tattoos, 4D Hair-like Authentic Eyebrows Waterproof Long Lasting for Woman & Man Makeup Tool',
        isUser: false,
        productId: 'B088FKY3VD'
      });

      this.messages.push(<ChatMessage>{
        content: 'Precision Plunger Bars for Cartridge Grips – 93mm – Bag of 10 Plungers',
        isUser: false,
        productId: 'B07NGFDN6G'
      });
    }
  }

  onMessageClick(msg: ChatMessage) {
    if (!msg.isUser && msg.productId) {
      this.router.navigate(['/categories/product', msg.productId]);
    }
  }
}

interface ChatMessage {
    content: string;
    isUser: boolean;
    productId?: string;
}