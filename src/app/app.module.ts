import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BioComponent } from './bio/bio.component';
import { ContactComponent } from './contact/contact.component';
import { EditingComponent } from './editing/editing.component';
import { MobileDisplayComponent } from './mobile-display/mobile-display.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { PhotoFullComponent } from './photo-full/photo-full.component';
import { PhotoDisplayComponent } from './photo-display/photo-display.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule }   from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { ConsoleComponent } from './console/console.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {enableProdMode} from '@angular/core';

enableProdMode();
   
@NgModule({
  declarations: [
    AppComponent,
    BioComponent,
    ContactComponent,
    EditingComponent,
    MobileDisplayComponent,
    MobileNavComponent,
    PhotoFullComponent,
    PhotoDisplayComponent,
    TopNavComponent,
    ConsoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMasonryModule,
    SwiperModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
   MatButtonModule,
   MatInputModule,
   ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
