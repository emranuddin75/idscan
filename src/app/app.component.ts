import { Component } from '@angular/core';
import { KycComponent } from './kyc/kyc.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KycComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
