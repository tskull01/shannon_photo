import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoDisplayComponent } from './photo-display/photo-display.component';
import { PhotoFullComponent } from './photo-full/photo-full.component';
import { EditingComponent } from './editing/editing.component';
import { BioComponent } from './bio/bio.component';
import { ContactComponent } from './contact/contact.component';
import { ConsoleComponent } from './console/console.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'display', component: PhotoDisplayComponent },
  { path: 'console', component: ConsoleComponent},
  { path: 'full', component: PhotoFullComponent },
  { path: 'editing', component: EditingComponent},
  { path: 'bio', component: BioComponent },
  { path: 'contact', component: ContactComponent},
  { path: '', component: PhotoDisplayComponent },
  { path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
