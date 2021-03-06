import { BrowserModule, HammerModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BioComponent } from "./bio/bio.component";
import { ContactComponent } from "./contact/contact.component";
import { MobileDisplayComponent } from "./mobile-display/mobile-display.component";
import { MobileNavComponent } from "./mobile-nav/mobile-nav.component";
import { PhotoFullComponent } from "./photo-full/photo-full.component";
import { PhotoDisplayComponent } from "./photo-display/photo-display.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import { SwiperModule } from "ngx-swiper-wrapper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ConsoleComponent } from "./console/console.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { LandingComponent } from "./landing/landing.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LandingElementsComponent } from "./landing-elements/landing-elements.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ScullyLibModule } from "@scullyio/ng-lib";
import "hammerjs";
@NgModule({
  declarations: [
    AppComponent,
    BioComponent,
    ContactComponent,
    MobileDisplayComponent,
    MobileNavComponent,
    PhotoFullComponent,
    PhotoDisplayComponent,
    TopNavComponent,
    ConsoleComponent,
    LandingComponent,
    LandingElementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    MatProgressSpinnerModule,
    ScrollingModule,
    ScullyLibModule,
    HammerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
