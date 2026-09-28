import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-property-component',
  standalone: false,
  styleUrls: ['./binding-property-component.css'],
  templateUrl: './binding-property-component.html',
})
export class BindingPropertyComponent {
  public name: string= "Nguyen Le Quynh Tho"
  public email: string = "quynhtho@gmail.com"
  public nameid: string = 'nameid'
  public emailid: string = 'emailid'
  public isDisabled: boolean = false
  public hello: string = 'Welcome to K24411E!'
  public red_color: string = 'red'
  public advanced_message: string = '<font color="blue"> =This is advanced message</font>'
}
