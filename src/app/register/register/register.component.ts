import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Validation } from '../validators/validation';
import { RegisterService } from '../service/register.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  isChecked: boolean = false;
  password!: boolean;
  allReadyRegistered!: boolean;
  confirmPassword!: boolean;

  // Regex patterns

  // Firstname and Lastname pattern
  namePattern = "^[A-Za-z]+(['?]{0,1}[A-Za-z]+)?$";

  // Email pattern 
  emailPattern = /^(?!\.)(?!.*\.\.)(?!.*@\.)(?!.*\.$)(?=.*[@])[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*([.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+[a-zA-Z]+[a-zA-Z0-9]*(\.[a-zA-Z0-9]+)+$/




  // Password Pattern
  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&_!])[A-Za-z0-9@#$&_!]*$";

  public isEmailValid: boolean;
  public isErrorForMinAndMaxLength: boolean;
  /** This is defined for manage destroy subject */
  private destroy: Subject<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private userService: RegisterService,
    private loaderService: LoaderService

  ) {
    this.isEmailValid = false;
    this.isErrorForMinAndMaxLength = false;
    this.allReadyRegistered = false;
    this.destroy = new Subject();
    // Form builder
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern(this.namePattern),
          ],
        ],

        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100),
            Validators.pattern(this.namePattern),
          ],
        ],

        email: [
          '',
          [
            Validators.required,
            // Validators.email,
            // Validators.minLength(3),
            // Validators.maxLength(80),
            Validators.pattern(this.emailPattern),
          ],
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(25),
            Validators.pattern(this.passwordPattern),
          ],
        ],

        confirmPassword: ['', [Validators.required]],
      },
      // password and confirm password match validator
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  // get form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    /** get form change event for email field */
    this.form.get('email')?.valueChanges.pipe(takeUntil(this.destroy)).subscribe((value: string) => {
      console.log('value : ', value);
      this.isErrorForMinAndMaxLength = false;
      if (value.includes('@')) {
        const userName = value.split('@')[0];
        if (userName.length < 3 || userName.length > 80) {
          this.isErrorForMinAndMaxLength = true;
        } else if(userName.includes('..')){

        } else if(userName){

        } 
        console.log('userName : ', userName);

      }
    });
  }
  // onclick icon show password and change the icon
  togglePasswordText() {
    this.isChecked = !this.isChecked;
    this.password = this.isChecked;
  }
  toggleConfirmPasswordText() {
    this.isChecked = !this.isChecked;
    this.confirmPassword = this.isChecked;
  }

  // Already regestered users
  removeallReadyRegistered() {
    this.allReadyRegistered = false;
  }

  // method execute on form submit
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loaderService.showLoader(true);
    this.userService.userRegister(this.form.value).subscribe((res: any) => {
      this.loaderService.showLoader(false);
      this.route.navigate(['/']);
    },

      (error) => {
        this.loaderService.showLoader(false);
        // Handle error
        if (error === 'Email Id Already Exists') {
          this.allReadyRegistered = true;
          return;
        }
      }
    );
  }

  /** destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
