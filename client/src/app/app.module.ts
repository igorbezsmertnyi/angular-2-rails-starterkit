//Modules
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdSliderModule, MdInputModule,
         MdSelectModule, MdIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
//Services
import { StateService } from './states.service';
import { StoreService } from './store.service';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdSliderModule,
    MdInputModule,
    MdSelectModule,
    MdIconModule,
    MdButtonModule
  ],
  providers: [
    StateService,
    StoreService
   ],
  bootstrap: [  ]
})
export class AppModule { }
