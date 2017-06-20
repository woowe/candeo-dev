import { Component, OnInit, AfterViewInit, ElementRef, HostListener, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-svg-loader',
  templateUrl: './svg-loader.component.html',
  styleUrls: ['./svg-loader.component.scss']
})
export class SvgLoaderComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  canvas: ElementRef;

  parent_rect: any = null;
  mouse: {x: number, y: number} = {x: 0, y: 0};

  constructor(private _el: ElementRef, private _zone: NgZone) { }

  getParentRect() {
    console.log(this._el.nativeElement.parentElement.getBoundingClientRect());
    this.parent_rect = this._el.nativeElement.parentElement.getBoundingClientRect();
  }

  pathBuilder(ctx, iy: number, segments: number, peterbs: {x: number, y: number}[]) {
    let p1 = {x: 0 + peterbs[0].x, y: iy + peterbs[0].y * 50};
    const x_step = (this.parent_rect.width) / segments;

    ctx.moveTo(p1.x, p1.y);

    for (let i = 0; i < segments; ++i) {
      const tp = peterbs[i + 1];
      const p2 = {x: p1.x + tp.x + x_step, y: iy};
      const x_percent = p2.x / this.parent_rect.width * 100;
      const scale = Math.abs(50 - x_percent);
      p2.y += (tp.y * scale);

      const dx = p2.x - p1.x;

      ctx.bezierCurveTo(p1.x + dx / 2, p1.y, p2.x - dx / 2, p2.y, p2.x, p2.y);

      p1 = p2;
    }
  }

  animate() {
    const c: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = c.getContext('2d');

    const p_w = this.parent_rect.width;
    const p_h = this.parent_rect.height;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, p_w, p_h);

    const segments = 20;
    const peterb = Math.sin(performance.now() / 170);

    const peterbs = [];

    for (let i = 0; i < segments + 1; ++i) {
      peterbs.push({x: 0, y: peterb * (i % 2 ? 1 : -1)});
    }

    const grd = ctx.createLinearGradient(0, 0, 0, p_h);
    grd.addColorStop(0, 'rgb(225, 0, 0)');
    grd.addColorStop(1, 'rgb(125, 0, 0)');

    ctx.fillStyle = grd;
    ctx.beginPath();
    this.pathBuilder(ctx, p_h / 2, peterbs.length - 1, peterbs);
    ctx.lineTo(p_w, p_h);
    ctx.lineTo(0, p_h);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    window.requestAnimationFrame(() => { this.animate(); });
  }

  mouseMove(event) {
    this.mouse = {
      x: event.clientX,
      y: event.clientY
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getParentRect();
  }

  ngOnInit() {
    this.getParentRect();
    // this._zone.runOutsideAngular(() => { this.animate(); })
  }

  ngAfterViewInit() {
    this._zone.runOutsideAngular(() => { this.animate(); })
  }

}
