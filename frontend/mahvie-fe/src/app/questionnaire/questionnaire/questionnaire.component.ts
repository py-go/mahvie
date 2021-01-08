import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { Question } from 'src/app/core/models/core.model';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  questionSet: Question[] = [
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
      validations: { required: true, pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$' },
      title: 'Before we get started...',
      subtitle: '',
      skip: true,
    },
    {
      id: 3,
      name: 'gettoknow',
      question: '',
      type: 'div2',
      options: [],
      validations: { },
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
      title: 'Lets get to know you!',
      subtitle: '',
      inline: true,
    },
    {
      id: 5,
      name: 'products',
      question: '',
      type: 'products-radio',
      options: [
        { text: 'life-insurance', active: false },
        { text: 'critical-illness', active: false },
        { text: 'long-term-care', active: false },
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
      name: 'names2',
      question: '',
      type: 'text',
      options: ['First Name', 'Last Name'],
      controls: ['firstName2', 'lastName2'],
      validations: { required: true },
      title: 'Welcome to G2G,your recommendation is only minutes away!',
      subtitle: '',
      inline: true,
    },
  ];
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

  constructor(
    private questionService: QuestionnaireService,
  ) {
    this.formSection = parseInt(localStorage.getItem('questionId') || '1');
    this.saveQuestionId();
  }

  ngOnInit(): void {
    this.assignQuestions();

    // subscribe to back button clicks
    this.questionService.backButtonClick.subscribe(_ => this.previousQuestion());

    // set emitted value from mat-slider as current question's form control value
    this.subsink.sink = this.sliderValueChange$.subscribe(value => {
      this.sliderValue = value;
      this.formGroup.get(this.currentQuestion.name)?.setValue(value);
    })
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
        const validations: any[] = [];
        // creates validations array for a control
        Object.keys(question.validations).forEach(validation => {
          (validation === 'required' && question.validations[validation])
            && validations.push(Validators.required);
          validation === 'pattern'
            && validations.push(Validators.pattern(question.validations.pattern));
          validation === 'min'
            && validations.push(Validators.min(question.validations.min + 100));
          validation === 'max'
            && validations.push(Validators.max(question.validations.max));
        });
        // enable submit button if there are no controls
        if (!question?.controls?.length) this.formGroup.setErrors(null);
        else {
          // creates form controls & updates with empty/cached value
          question.controls.forEach((controlName: string) => {
            this.formGroup.addControl(controlName, new FormControl(cachedPayload[controlName] ?? '', validations));
          });
        }
        // removes validations of all form controls except the current question's
        Object.keys(this.formGroup.controls).forEach(key => {
          !question?.controls?.includes(key)
            && this.formGroup.get(key)!.setErrors(null);
        });
        // set default/cached value for slider control
        if (question.type === 'slider') {
          this.sliderValue = cachedPayload[question.name] || 0;
          this.formGroup.get(question.name)?.setValue(this.sliderValue);
        }
        // set default/cached value for date
        question.type === 'date'
          && (this.dateValue = cachedPayload[question.name]);
        validations.length = 0;
      }
    });
  }

  /**
   * Continue click event
   */
  continue() {
    // reset slider value on continue
    this.currentQuestion.type === 'slider'
      && (this.sliderValue = 0);
    this.formSection++;
    this.loadQuestion();
    localStorage.setItem('payload', JSON.stringify(this.formGroup.value));
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
   * Check active status of form control
   * @param index
   * @param options Options of current question
   * @param event Click event
   */
  radioSelection(index: number, options: Array<any>) {
    options.forEach((element) => {
      element.active = false;
    });
    options[index].active = true;
    this.formGroup.get(this.currentQuestion.name)!.setValue(options[index].text);
  }
}
