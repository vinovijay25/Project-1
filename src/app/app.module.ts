import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountUpModule } from 'ngx-countup';
import { StickyNavModule } from 'ng2-sticky-nav';
import { TabsModule } from 'ngx-tabset';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { LightboxModule } from 'ngx-lightbox';
import { AccordionModule } from "ngx-accordion";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { LightgalleryModule } from 'lightgallery/angular';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { SlickCarouselModule } from 'ngx-slick-carousel';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {DataTablesModule} from 'angular-datatables';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { Setting1Component } from './components/setting1/setting1.component';
import { Setting2Component } from './components/setting2/setting2.component';
import { Setting3Component } from './components/setting3/setting3.component';



@NgModule({
  declarations: [
    AppComponent,
    
    Setting1Component,
    Setting2Component,
    Setting3Component,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    CountUpModule,
    StickyNavModule,
    TabsModule,
    NgxScrollTopModule,
    LightboxModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    LightgalleryModule,
    HttpClientModule,
    FontAwesomeModule,
    DataTablesModule,
    NgxChartsModule,
    CommonModule,
    JwtModule,
    SlickCarouselModule,

  ],
  entryComponents:[],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }