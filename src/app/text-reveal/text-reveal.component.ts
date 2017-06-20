import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { trigger, state, style, keyframes, animate, transition, query } from '@angular/animations';

@Component({
  selector: 'app-text-reveal',
  templateUrl: './text-reveal.component.html',
  styleUrls: ['./text-reveal.component.scss'],
  animations: [
    trigger('reveal', [
      state('revealIn', style({color: '#fff'})),
      state('revealOut', style({color: 'transparent'})),
      transition('* => revealIn', [
        animate('0.01s 1s linear'),
      ]),
      transition('* => revealOut', [
        animate('0.01s 1s linear'),
      ])
    ]),
    trigger('slide', [
      transition('* => revealIn', [
        animate('2s cubic-bezier(.84,.05,.29,1)', keyframes([
          // style({eft: '0px', transform: 'translateX(-101%)', offset: 0}),
          style({left: '0px', transform: 'translateX(0%)', offset: 0.3}),
          style({left: '0px', transform: 'translateX(0%)', offset: 0.5}),
          style({left: '100%', offset: 1}),
        ]))
      ]),
      transition('* => revealOut', [
        animate('2s cubic-bezier(.84,.05,.29,1)', keyframes([
          // style({eft: '0px', transform: 'translateX(-101%)', offset: 0}),
          style({left: '0px', transform: 'translateX(0%)', offset: 0.3}),
          style({left: '0px', transform: 'translateX(0%)', offset: 0.5}),
          style({left: '100%', offset: 1}),
        ]))
      ])
    ])
  ]
})
export class TextRevealComponent implements OnInit, AfterViewInit {
  @Input() reveal_color = '#fff';

  reveal_state = 'revealIn';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.reveal_state = '';
  }

}
