import { Component, OnInit, NgZone, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-smooth-scroll',
  templateUrl: './smooth-scroll.component.html',
  styleUrls: ['./smooth-scroll.component.scss']
})
export class SmoothScrollComponent implements OnInit {
  @Input() friction = 0.065;
  @Input() zeroOut = 1;

  _velocity = 0;

  _prev_scroll_pos = null;
  _save_scroll = false;

  constructor(private _zone: NgZone) {}

  ngOnInit() {
    this._zone.runOutsideAngular(() => { this.animateScroll(); })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    console.log('scroll', event);
  }

  @HostListener('window:mousewheel', ['$event'])
  onMouseWheelScroll(event) {
    console.log('mouse wheel event', event);
    event.preventDefault();
    event.stopPropagation();

    this._velocity += 1.76666 * Math.sign(event.deltaY);
  }

  @HostListener('window:DOMMouseScroll', ['$event'])
  onDomMouseWheelScroll(event) {
    console.log('mouse wheel event', event);
    event.preventDefault();
    event.stopPropagation();

    this._velocity += 1.76666 * Math.sign(event.detail);
  }

  animateScroll() {
    this._velocity -= this.friction * this._velocity;

    if (Math.abs(this._velocity) < this.zeroOut) {
      this._velocity = 0;
    }

    console.log(this._velocity);

    window.scrollBy(0, this._velocity);

    window.requestAnimationFrame(() => { this.animateScroll(); });
  }

}
