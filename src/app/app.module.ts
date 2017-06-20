import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SvgLoaderComponent } from './svg-loader/svg-loader.component';
import { TextRevealComponent } from './text-reveal/text-reveal.component';
import { TextShatterComponent } from './text-shatter/text-shatter.component';
import { SmoothScrollComponent } from './smooth-scroll/smooth-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgLoaderComponent,
    TextRevealComponent,
    TextShatterComponent,
    SmoothScrollComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
