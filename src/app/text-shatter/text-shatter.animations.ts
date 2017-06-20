import {animation, style, animate} from '@angular/animations';

// cubic-bezier(0.445, 0.05, 0.55, 0.95)
// cubic-bezier(1, 0.02, 0.29, 1)

export let fadeAnimation = animation([
  style({ opacity: '0', transform: 'translate3d({{ x }}px, {{ y }}px, 0)' }),
  animate('{{ time }}s cubic-bezier(1, 0.02, 0.29, 1)', style({ opacity: '1', transform: 'translate3d(0px, 0px, 0)'}))
]);
