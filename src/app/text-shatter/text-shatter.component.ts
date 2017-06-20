import {
  Component,
  OnInit,
  Input,
  ContentChild,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
  HostListener,
  NgZone
} from '@angular/core';

import {
  trigger,
  state,
  query,
  style,
  animate,
  transition,
  useAnimation,
  AnimationBuilder,
  AnimationPlayer
} from '@angular/animations';

import { fadeAnimation } from './text-shatter.animations';

@Component({
  selector: 'app-text-shatter',
  templateUrl: './text-shatter.component.html',
  styleUrls: ['./text-shatter.component.scss']
})
export class TextShatterComponent implements OnInit, AfterViewInit {
  @ViewChildren('char')
  characters: QueryList<ElementRef>;

  @Input() text = '';

  _text: string[] = [];
  _timings: number[] = [];
  _positions: {x: number, y: number}[] = [];
  _scroll_positions: {y: number, mag: number}[] = [];
  _fade_state = 'in';

  _players: AnimationPlayer[] = [];

  constructor(private _builder: AnimationBuilder,
              private _zone: NgZone) {}

  ngOnInit() {
    console.log(this.text);
    this._text = this.text.split('');
    this._timings = this._text.map((v, i) => Math.random() * 1 + 2 );

    for (let i = 0; i < this._text.length; ++i) {
      this._scroll_positions.push({y: 0, mag: Math.random() * 0.9 + 0.1});
    }
  }

  ngAfterViewInit() {
    this._positions = [];

    for (let i = 0; i < this._players.length; ++i) {
      if (this._players[i]) {
        this._players[i].destroy();
      }
    }

    this._players = [];

    let max_timing_idx = 0;
    let max_timing = this._timings[0];

    for (let i = 1; i < this._timings.length; ++i) {
      if (this._timings[i] > max_timing) {
        max_timing_idx = i;
        max_timing = this._timings[i];
      }
    }

    const chars = this.characters.toArray();

    for (let i = 0; i < chars.length; ++i) {
      const native_el = chars[i].nativeElement;
      const rect = native_el.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const a = Math.atan2(cy - window.innerHeight / 2, cx - window.innerWidth / 2);

      const mag = Math.random() * 400 + 150;
      const x = Math.cos(a) * mag;
      const y = Math.sin(a) * mag;

      this._positions.push({x, y});

      const factory = this._builder.build(useAnimation(fadeAnimation, {
        params: {
          time: this._timings[i],
          x,
          y
        }
      }));

      this._players.push(factory.create(native_el, {}));

      const idx = this._players.length - 1;
      this._players[idx].play();
      this._players[idx].onDone(() => {
        if (i === max_timing_idx) {
          this._zone.runOutsideAngular(() => { this.onScroll(); });
        }

        this._players[idx].destroy();
      });
    }
  }

  onScroll() {
    const chars = this.characters.toArray();

    for (let i = 0; i < chars.length; ++i) {
      const native_el = chars[i].nativeElement;
      native_el.style.transform = 'translate3d(0, ' + ( window.scrollY * this._scroll_positions[i].mag * -1) + 'px, 0)';
    }

    window.requestAnimationFrame(() => { this.onScroll(); });
  }



}
