import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { QuestionnaireService } from 'src/app/core/services/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  questionSet: Record<string, any>[] = [
    {
      id: 1,
      name: 'location',
      question: 'Do you live in Ontario?',
      type: 'radio',
      options: [
        { text: 'yes', active: false },
        { text: 'no', active: false },
      ],
      controls: ['location'],
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
      id: 4,
      name: 'products',
      question: '',
      type: 'div',
      options: [],
      controls: ['products'],
      validations: { required: true },
      title: 'Which product(s) match your preferences?',
      subtitle: 'Please select all products that match your needs.',
    },
    {
      id: 5,
      name: 'gender',
      question: '',
      type: 'radio',
      options: [
        { value: 'male', active: false },
        { value: 'female', active: false },
      ],
      validations: {},
      title: 'What is your gender?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 6,
      name: 'children',
      question: '',
      type: 'radio',
      options: [
        { value: 'yes', active: false },
        { value: 'no', active: false },
      ],
      validations: {},
      title: 'Do you have any children?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 7,
      name: 'income',
      question: '',
      type: 'slider',
      options: ['annual income'],
      validations: { min: 0, max: 500000 },
      title: 'What is your annual income?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 8,
      name: 'mortgage',
      question: '',
      type: 'slider',
      options: ['mortgage'],
      validations: { min: 0, max: 500000 },
      title: 'What is your total mortgage outstanding?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 9,
      name: 'expenses',
      question: '',
      type: 'slider',
      options: ['monthly expenses'],
      validations: { min: 0, max: 500000 },
      title: 'What is your monthly expenses excluding your mortgage?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 10,
      name: 'born',
      question: '',
      type: 'date',
      options: [],
      validations: {},
      title: 'When were you born?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 11,
      name: 'smoke',
      question: '',
      type: 'radio',
      options: [
        { value: 'yes', active: false },
        { value: 'no', active: false },
      ],
      validations: {},
      title: 'Have you smoked in the last 12 months?',
      subtitle:
        'Your recommendation is as unique as you are. Using real info here will help us give you the most accurate recommendation.',
    },
    {
      id: 12,
      name: 'names2',
      question: '',
      type: 'text',
      options: ['First Name', 'Last Name'],
      validations: {},
      title: 'Welcome to G2G,your recommendation is only minutes away!',
      subtitle: '',
      inline: true,
    },
    {
      id: 13,
      name: 'gettoknow',
      question: '',
      type: 'div2',
      options: [],
      validations: {},
      title: "Great, let's get to know you!",
      subtitle:
        "We'll recommend your coverage amount and policy length by assessing",
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
  formGroup = new FormGroup({});

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private questionService: QuestionnaireService,
    private formBuilder: FormBuilder,
  ) {
    this.formSection = parseInt(localStorage.getItem('questionId') || '1');
    this.saveQuestionId();
  }

  ngOnInit(): void {
    this.assignQuestions();

    // this.questionSet.forEach((element: any) => {
    //   this.formGroup.addControl(element.name, new FormControl(''));
    // });

    // subscribe to back button clicks
    this.questionService.backButtonClick.subscribe(_ => this.previousQuestion());
  }

  /**
   * Shows question based on question id in local storage
   */
  assignQuestions() {
    this.questionSet.forEach((question: any) => {
      if (localStorage.getItem('questionId') == question.id) {
        this.currentQuestion = question;
        const validations: any[] = [];
        Object.keys(this.currentQuestion.validations).forEach(validation => {
          (validation === 'required' && this.currentQuestion.validations[validation])
            && validations.push(Validators.required);
          validation === 'pattern'
            && validations.push(Validators.pattern(this.currentQuestion.validations.pattern));
        });
        this.currentQuestion.controls.forEach((controlName: string) => {  
          this.formGroup.addControl(controlName, new FormControl('', validations));
        });
        validations.length = 0;
        // this.formGroup.updateValueAndValidity();
      }
    });
  }

  /**
   * Continue click event
   */
  submit() {
    console.log(this.formGroup.value);
    this.formSection++;
    this.saveQuestionId();
    this.assignQuestions();
    this.questionService.backButtonVisibility.next();
  }

  /**
   * Shows previous question
   */
  previousQuestion() {
    this.formSection--;
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
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events = `${type}: ${event.value}`;
    this.date = new Date(this.events).getDate();
    this.month = new Date(this.events).getMonth() + 1;
    this.year = new Date(this.events).getFullYear();
  }

  /**
   * Check active status of form control
   * @param index
   * @param options Options of current question
   * @param event Click event
   */
  activeSetter(index: any, options: Array<any>, event: Event) {
    options.forEach((element) => {
      element.active = false;
    });
    options[index].active = true;

    console.log(this.formGroup.value);

    // set checked attribute of radio buttons inside form
    // if (this.currentQuestion.type === 'radio') {
    //   const target = <HTMLElement>event.target;
    //   const radioInput = target.querySelector('input[type="radio"]');
    //   this.el.nativeElement
    //     .querySelectorAll('input[type="radio"]')
    //     .forEach((radio: any) => {
    //       this.renderer.setProperty(radio, 'checked', false);
    //     });
    //   radioInput && this.renderer.setProperty(radioInput, 'checked', true);
    //   this.currentQuestion.validations.required = false;
    // }
  }

  /**
   * Sets active status of a preference
   * @param event Click event
   */
  setPreference(event: Event): void {
    const component = this.el.nativeElement;
    component
      .querySelectorAll('.preference')
      .forEach((element: any) => this.renderer.removeClass(element, 'active'));
    this.renderer.addClass((event.target as HTMLElement).closest('.preference'), 'active');
  }
}
