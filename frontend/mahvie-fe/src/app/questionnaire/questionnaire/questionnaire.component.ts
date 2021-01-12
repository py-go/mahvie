import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConstantService } from 'src/app/config/constant.service';
import { Option, Question } from 'src/app/core/models/core.model';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  questionPool: Question[] = [
    {
      id: 1,
      name: 'ontario',
      question: 'Do you live in Ontario?',
      type: 'radio',
      options: [
        { text: 'yes', active: false },
        { text: 'no', active: false },
      ],
      controls: ['ontario'],
      validations: { required: true },
      title: 'Before we get started...',
      subtitle: '',
    },
    {
      id: 2,
      name: 'email',
      question: 'What is your email?',
      type: 'text',
      options: ['Email Address'],
      controls: ['email'],
      validations: {
        required: true,
        pattern: this.constants.emailRegex,
      },
      title: 'Before we get started...',
      subtitle: '',
      skip: true,
    },
    {
      id: 3,
      name: 'gettoknowyou',
      question: '',
      type: '',
      options: [],
      validations: {},
      title: "Great, let's get to know you!",
      subtitle:
        "We'll recommend your coverage amount and policy length by assessing",
    },
    {
      id: 4,
      name: 'names',
      question: '',
      type: 'text',
      options: ['First Name', 'Last Name'],
      controls: ['firstName', 'lastName'],
      validations: { required: true },
      title: 'Welcome to G2G, your recommendation is only minutes away!',
      subtitle: '',
      inline: true,
    },
    {
      id: 5,
      name: 'products',
      question: '',
      type: 'products-radio',
      options: [
        { text: 'life-insurance', active: false, htmlTitle: 'life insurance', hoverText: 'If I were to pass away, I would like to give money to a person(s) of my choice.' },
        { text: 'critical-illness', active: false, htmlTitle: 'critical illness', hoverText: 'If I were to suffer a stroke, heart attack or  get cancer, I would like to personally receive a large amount of money.' },
        { text: 'long-term-care', active: false, htmlTitle: 'long term care', hoverText: 'If I were unable to perform my daily tasks independently, I would like to receive money to hire assistance.' }, 
      ],
      controls: ['products'],
      validations: { required: true },
      title: 'Which product(s) match your preferences?',
      subtitle: 'Please select all products that match your needs.',
    },
    {
      id: 6,
      name: 'gender',
      question: '',
      type: 'radio',
      options: [
        { text: 'male', active: false },
        { text: 'female', active: false },
      ],
      controls: ['gender'],
      validations: { required: true },
      title: 'What is your gender?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 7,
      name: 'children',
      question: '',
      type: 'radio',
      options: [
        { text: 'yes', active: false },
        { text: 'no', active: false },
      ],
      controls: ['children', 'children-length'],
      validations: { required: true },
      title: 'Do you have any children?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 8,
      name: 'income',
      question: '',
      type: 'slider',
      options: [],
      controls: ['income'],
      validations: { required: true, min: 0, max: 500000 },
      title: 'What is your annual income?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 9,
      name: 'mortgage',
      question: '',
      type: 'slider',
      options: [],
      controls: ['mortgage'],
      validations: { required: true, min: 0, max: 500000 },
      title: 'What is your total mortgage outstanding?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 10,
      name: 'expenses',
      question: '',
      type: 'slider',
      options: [],
      controls: ['expenses'],
      validations: { required: true, min: 0, max: 500000 },
      title: 'What is your monthly expenses excluding your mortgage?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 11,
      name: 'dob',
      question: '',
      type: 'date',
      options: [],
      controls: ['dob'],
      validations: { required: true },
      title: 'When were you born?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 12,
      name: 'smoke',
      question: '',
      type: 'radio',
      options: [
        { text: 'yes', active: false },
        { text: 'no', active: false },
      ],
      controls: ['smoke'],
      validations: { required: true },
      title: 'Have you smoked in the last 12 months?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 13,
      name: 'without-income',
      question: '',
      type: 'radio',
      options: [
        { text: 'yes', active: false },
        { text: 'no', active: false },
      ],
      controls: ['without-income'],
      validations: { required: true },
      title: 'Can you, your spouse or your family survive without your income?',
      subtitle: '',
    },
    {
      id: 14,
      name: 'income-replaced',
      question: '',
      type: 'slider',
      options: [],
      controls: ['income-replaced'],
      validations: { required: true, min: 0, max: 500000 },
      title: 'How many years of income would you like to replace?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 15,
      name: 'survive-without-income',
      question: '',
      type: 'radio',
      options: [
        { text: 'yes', active: false },
        { text: 'no', active: false },
      ],
      controls: ['survive-without-income'],
      validations: { required: true },
      title: 'If you were not alive, can your spouse or family survive without your income?',
      subtitle: '',
    },
    {
      id: 16,
      name: 'income-to-spouse',
      question: '',
      type: 'slider',
      options: [],
      controls: ['income-to-spouse'],
      validations: { required: true, min: 0, max: 500000 },
      title: 'How many years of income would you like to give your spouse or family?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 17,
      name: 'name-address',
      question: '',
      type: 'text',
      options: ['Full Name', 'Email Address'],
      controls: ['fullName', 'email'],
      validations: {
        required: true,
        pattern: this.constants.emailRegex,
      },
      title: 'Thanks, that\'s all we need!',
      subtitle: 'We’ll use this email address to save your recommendation and keep in touch. Your email is always safe with us!',
      inline: false,
      last: true
    },
  ];
  questionSet: Question[];
  submitBtn: any = true;
  formSection: number;
  currentQuestion: any;
  sliderValue: any = 0;
  events: any;
  date: any;
  month: any;
  year: any;
  formGroup: FormGroup = new FormGroup({});
  sliderValueChange$ = new Subject<number | null>();
  subsink = new SubSink();
  dateValue!: Date;
  isChildrenPopupVisible = false;
  isOntarioPopupVisible = false;
  lastQuestionIndex!: number;

  constructor(
    private questionService: QuestionnaireService,
    private router: Router,
    private constants: ConstantService,
  ) {
    this.formSection = parseInt(localStorage.getItem('questionId') || '1');
    const cachedQuestions: Question[] = JSON.parse(localStorage.getItem('questions') || '{}');
    this.questionSet = Array.isArray(cachedQuestions) && cachedQuestions.length
      ? cachedQuestions
      : (localStorage.setItem('questions', JSON.stringify(this.questionPool)), this.questionPool);
    this.saveQuestionId();
  }

  ngOnInit(): void {
    this.assignQuestions();
    this.lastQuestionIndex = this.questionSet.filter(question => !!question?.last)[0].id;

    // subscribe to back button clicks
    this.questionService.backButtonClick.subscribe(_ => this.previousQuestion());

    // set emitted value from mat-slider as current question's form control value
    this.subsink.sink = this.sliderValueChange$.subscribe((value) => {
      this.sliderValue = value;
      this.formGroup.get(this.currentQuestion.name)?.setValue(value);
    });

    // show ontario popup when no is selected
    this.subsink.sink = this.formGroup.valueChanges.pipe(
      filter(_ => this.currentQuestion.name === 'ontario')
    ).subscribe(value => value.ontario === 'no' && (this.isOntarioPopupVisible = true));
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  /**
   * Shows question based on question id in local storage
   */
  assignQuestions() {
    this.questionSet.forEach((question: any) => {
      if (localStorage.getItem('questionId') == question.id) {
        this.currentQuestion = question;
        const cachedPayload = JSON.parse(localStorage.getItem('payload') || '{}');
        // enable submit button if there are no controls
        if (!question?.controls?.length) this.formGroup.setErrors(null);
        // creates form controls & updates with empty/cached value
        else {
          question.controls.forEach((controlName: string) => {
            this.formGroup.addControl(controlName, new FormControl(cachedPayload[controlName] ?? '', this.getValidations(question, controlName)));
          });
        }
        // removes validations of all form controls except the current question's
        Object.keys(this.formGroup.controls).forEach(key => {
          !question?.controls?.includes(key) &&
            this.formGroup.get(key)!.setErrors(null);
        });
        // set default/cached value for slider control
        if (question.type === 'slider') {
          this.sliderValue = cachedPayload[question.name] || 0;
          this.formGroup.get(question.name)?.setValue(this.sliderValue);
        }
        // set default/cached value for date
        question.type === 'date'
          && (this.dateValue = cachedPayload[question.name]);
        question.name === 'children'
          && this.formGroup.get('children-length')?.setValue(cachedPayload['children-length'] || 1);
      }
    });
  }

  /**
   * Creates validations array for a control
   */
  getValidations(question: Question, controlName: string): any[] {
    const allValidations: any[] = [];
    Object.keys(question.validations).forEach(validation => {
      switch (validation) {
        case 'required':
          question.validations[validation]
            && allValidations.push(Validators.required);
          break;
        case 'pattern':
          if (question.id === 17) {
            controlName === 'email'
              && allValidations.push(Validators.pattern(question.validations.pattern!));
          } else {
            allValidations.push(Validators.pattern(question.validations.pattern!));
          }
          break;
        case 'min':
          allValidations.push(Validators.min(question.validations.min! + 100));
          break;
        case 'max':
          allValidations.push(Validators.max(question.validations.max!));
          break;
      }
    });
    return allValidations;
  }

  /**
   * Continue click event
   */
  continue() {
    // reset slider value on continue
    this.currentQuestion.type === 'slider' && (this.sliderValue = 0);
    if (this.currentQuestion.id < this.lastQuestionIndex) {
      this.formSection++;
      this.loadQuestion();
    }
    const payload = { ...(JSON.parse(localStorage.getItem('payload') || '{}')), ...this.formGroup.value };
    localStorage.setItem('payload', JSON.stringify(payload));
  }

  /**
   * Shows previous question
   */
  previousQuestion() {
    this.formSection--;
    this.loadQuestion();
  }

  /**
   * Loads current question
   */
  loadQuestion() {
    this.saveQuestionId();
    this.assignQuestions();
    this.questionService.backButtonVisibility.next();
  }

  /**
   * Saves current question id in local storage
   */
  saveQuestionId() {
    localStorage.setItem('questionId', this.formSection.toString());
  }

  /**
   * Sets selected date in related textboxes
   * @param type
   * @param event
   */
  dateSelected(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = `${type}: ${event.value}`;
    this.date = new Date(this.events).getDate();
    this.month = new Date(this.events).getMonth() + 1;
    this.year = new Date(this.events).getFullYear();
    this.formGroup.get(this.currentQuestion.name)?.setValue(event.value);
  }

  /**
   * Options selections event
   * @param index
   */
  radioSelection(index: number) {
    this.questionSet.forEach(question => {
      if (question.id === this.currentQuestion.id) {
        question.options.forEach((option: Option) => {
          option.active = false;
        });
        question.options[index].active = true;
        this.formGroup.get(this.currentQuestion.name)!.setValue(question.options[index].text);
      }
    });
    localStorage.setItem('questions', JSON.stringify(this.questionSet));
  }

  /**
   * Common checkbox selection event
   * @param index 
   */
  checkboxSelection(index: number) {
    this.questionSet.forEach(question => {
      if (question.id === this.currentQuestion.id) {
        let checkedValues = '';
        question.options.forEach((option: Option, ind: number) => {
          index === ind 
            && (option.active = !option.active);
          option.active
            && (checkedValues += `${option.text},`);
        });
        this.formGroup.get(this.currentQuestion.name)!.setValue(checkedValues ? checkedValues.slice(0, -1) : '');
      }
    });
    localStorage.setItem('questions', JSON.stringify(this.questionSet));
  }

  /**
   * Route redirection to home page
   */
  redirectToHome() {
    localStorage.removeItem('payload');
    localStorage.removeItem('questions');
    localStorage.removeItem('questionId');
    this.isOntarioPopupVisible = false;
    this.router.navigateByUrl('/home');
  }
}
