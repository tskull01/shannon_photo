import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Contact} from './contact'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  {

  constructor() { }
  submitted:boolean = false; 

 model = new Contact('','','','','');

 onSubmit(){ this.submitted = true;
console.log(this.model)}
}
