import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: false,
  styleUrl: './course-registration-reactive-component.css',
  templateUrl: './course-registration-reactive-component.html',
})
export class CourseRegistrationReactiveComponent {
  public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Trần Duy Thanh', [
        Validators.required,
        Validators.minLength(3),
        this.customNameValidator,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, this.customPasswordValidator]),
      confirmPass: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator },
  );

  // Toggle show/hide for password fields
  showPassword = false;
  showConfirmPass = false;

  onSubmit() {
    if (this.regForm.valid) {
      console.log('Submitted data:', this.regForm.value);
      const infor = JSON.stringify(this.regForm.value);
      alert(`Data processing:\n${infor}`);
    }
  }

  setDefaultValues() {
    this.regForm.patchValue({
      name: 'Trần Duy Thanh',
      email: 'thanhtd@uel.edu.vn',
    });
  }

  customNameValidator(control: AbstractControl): { [key: string]: any } | null {
    // Regular expression to check for characters: @, #, $, %, ^, &
    const matchName = /[@#$%^&]/g.test(control.value);

    // If special characters are found, return an object containing the error 'nameNotMatch'
    // Otherwise, return null (valid)
    return matchName ? { nameNotMatch: { value: control.value } } : null;
  }

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null; // Empty value is handled by Validators.required

    // Strong password: at least 1 lowercase, 1 uppercase, 1 digit, 1 special character, min 8 chars
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    return strongPassword.test(value) ? null : { weakPassword: true };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPass = control.get('confirmPass');

    if (password && confirmPass && password.value !== confirmPass.value) {
      return { mismatch: true }; // Return a mismatch error for the entire FormGroup
    }
    return null;
  }
}
