import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoDisplayComponent } from './photo-display/photo-display.component';
import { PhotoFullComponent } from './photo-full/photo-full.component';
import { BioComponent } from './bio/bio.component';
import { ContactComponent } from './contact/contact.component';
import { ConsoleComponent } from './console/console.component';
import { LandingComponent } from './landing/landing.component';
import { MobileDisplayComponent } from './mobile-display/mobile-display.component';

const routes: Routes = [
  { path: 'display', component: PhotoDisplayComponent },
  { path: 'mobileDisplay', component: MobileDisplayComponent },
  { path: 'console', component: ConsoleComponent},
  { path: 'full', component: PhotoFullComponent },
  { path: 'editing', component: ConsoleComponent},
  { path: 'bio', component: BioComponent },
  { path: 'contact', component: ContactComponent},
  { path: '', component: PhotoDisplayComponent },
  { path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
