import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ConstantService } from '@config/constant.service';
import { Option, Question } from '@models/core.model';
import { AuthService } from '@services/auth.service';
import { QuestionnaireService } from '@services/questionnaire.service';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
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
      name: 'gettoknowyou',
      question: '',
      type: '',
      options: [],
      validations: {},
      title: 'Great, let\'s get to know you!',
      subtitle:
        'We\'ll recommend your coverage amount and policy length by assessing',
    },
    {
      id: 2,
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
      id: 3,
      name: 'email',
      question: 'What is your email?',
      type: 'text',
      options: ['Email Address'],
      controls: ['email'],
      validations: {
        required: true,
        pattern: this.constantService.emailRegex,
      },
      title: 'Before we get started...',
      subtitle: '',
      skip: true,
    },
    {
      id: 4,
      name: 'help',
      question: '',
      type: 'div',
      options: [
        { text: 'I know my desired coverage amount, show me some recommendations', active: false, htmlTitle: 'I know what I want', hoverText: 'If I were to pass away, I would like to give money to a person(s) of my choice.' },
        { text: "I'll answer some questions to recieve a tailored recommendations", active: false, htmlTitle: 'I need a recommendation', hoverText: 'If I were to suffer a stroke, heart attack or  get cancer, I would like to personally receive a large amount of money.' },
      ],
      controls: ['help'],
      validations: { required: true },
      title: 'How can we help?',
      subDiv:{control:'desiredAmount',min:'0',max:'50000'},
      subtitle: 'Please select the option that best describes the kind of help you need.'
    },
    {
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
      name: 'income-replaced',
      question: '',
      type: 'date-slider',
      options: [],
      controls: ['income-replaced'],
      validations: { required: true, min: 0, max: 50 },
      title: 'How many years of income would you like to replace?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 16,
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
      id: 17,
      name: 'income-to-spouse',
      question: '',
      type: 'date-slider',
      options: [],
      controls: ['income-to-spouse'],
      validations: { required: true, min: 0, max: 50 },
      title: 'How many years of income would you like to give your spouse or family?',
      subtitle:
        'Feel free to use close estimates when it comes to your finances.',
    },
    {
      id: 18,
      name: 'name-address',
      question: '',
      type: 'text',
      options: ['Email Address'],
      controls: ['email'],
      validations: {
        required: true,
        pattern: this.constantService.emailRegex,
      },
      title: 'Thanks, that\'s all we need!',
      subtitle: 'We’ll use this email address to save your recommendation and keep in touch. Your email is always safe with us!',
      inline: false,
      last: true
    },
  ];
  questionPool2: Question[] = [
    {
      id: 1,
      name: 'gettoknowyou',
      question: '',
      type: '',
      options: [],
      validations: {},
      title: 'Great, let\'s get to know you!',
      subtitle:
        'We\'ll recommend your coverage amount and policy length by assessing',
    },
    {
      id: 2,
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
      id: 3,
      name: 'email',
      question: 'What is your email?',
      type: 'text',
      options: ['Email Address'],
      controls: ['email'],
      validations: {
        required: true,
        pattern: this.constantService.emailRegex,
      },
      title: 'Before we get started...',
      subtitle: '',
      skip: true,
    },
    {
      id: 4,
      name: 'help',
      question: '',
      type: 'div',
      options: [
        { text: 'I know my desired coverage amount, show me some recommendations', active: false, htmlTitle: 'I know what I want', hoverText: 'If I were to pass away, I would like to give money to a person(s) of my choice.' },
        { text: "I'll answer some questions to recieve a tailored recommendations", active: false, htmlTitle: 'I need a recommendation', hoverText: 'If I were to suffer a stroke, heart attack or  get cancer, I would like to personally receive a large amount of money.' },
      ],
      controls: ['help'],
      validations: { required: true },
      title: 'How can we help?',
      subDiv:{control:'desiredAmount',min:'0',max:'50000'},
      subtitle: 'Please select the option that best describes the kind of help you need.'
    },
    {
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
      name: 'name-address',
      question: '',
      type: 'text',
      options: ['Email Address'],
      controls: ['email'],
      validations: {
        required: true,
        pattern: this.constantService.emailRegex,
      },
      title: 'Thanks, that\'s all we need!',
      subtitle: 'We’ll use this email address to save your recommendation and keep in touch. Your email is always safe with us!',
      inline: false,
      last: true
    },
  ];
  
  questionSet: Question[];
  questionId: number;
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
  maxDate = new Date();
  showRecommendation = false;
  subDiv:boolean=false;
  subDivvalue:any;
  isButtonVisible = parseInt(localStorage.getItem('questionId') || '1') > 1;

  constructor(
    private questionService: QuestionnaireService,
    private constantService: ConstantService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.questionId = Number(localStorage.getItem('questionId') || '1');
    let cachedQuestions: Question[] = JSON.parse(localStorage.getItem('questions') || '{}');
    this.questionSet = Array.isArray(cachedQuestions) && cachedQuestions.length
      ? cachedQuestions
      : (localStorage.setItem('questions', JSON.stringify(this.questionPool)), this.questionPool);
    this.saveQuestionId();
  }

  ngOnInit(): void {
    this.assignQuestions();

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

  previousClick(){
    this.previousQuestion();
    this.isButtonVisible =  parseInt(localStorage.getItem('questionId') || '1') > 1;
  }

  /**
   * Shows question based on question id in local storage
   */
  assignQuestions(): void {
    this.questionSet.forEach((question: Question) => {
      if (Number(localStorage.getItem('questionId')) === question.id) {
        this.currentQuestion = question;
        const cachedPayload = JSON.parse(localStorage.getItem('payload') || '{}');

        // enable submit button if there are no controls
        if (!question?.controls?.length) this.formGroup.setErrors(null);
        // creates form controls & updates with empty/cached value
        else {
          question.controls.forEach((controlName: string) => {
            this.formGroup.addControl(
              controlName,
              new FormControl(cachedPayload[controlName] ?? '', this.getValidations(question, controlName))
            );
            if(question.subDiv){
              this.formGroup.addControl(question.subDiv.control, new FormControl(''))
            }
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
        if (question.type === 'date') {
          this.dateValue = new Date(cachedPayload[question.name]);
          if (this.dateValue.getDate()) {
            this.date = this.dateValue.getDate();
            this.month = this.dateValue.getMonth() + 1;
            this.year = this.dateValue.getFullYear();
          }
        }

        // set default/cached value of children length
        question.name === 'children'
          && this.formGroup.get('children-length')?.setValue(cachedPayload['children-length'] || 1);

        // set full name from cached names if exists
        if (
          question.name === 'name-address' &&
          cachedPayload?.firstName &&
          cachedPayload?.lastName
        ) {
          this.formGroup.get('fullName')
            ?.setValue(`${cachedPayload.firstName} ${cachedPayload.lastName}`);
        }
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
          allValidations.push(Validators.min(question.validations.min! + 1));
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
  continue(skipQuestion = false): void {
    // persist state in local & conditionally in backend
    this.saveState(skipQuestion);

    // reset slider value on continue
    this.currentQuestion.type === 'slider' && (this.sliderValue = 0);
    if (!this.currentQuestion?.last) {
      this.questionId++;
      this.loadQuestion();
    }
    else this.showRecommendation = true;
    this.isButtonVisible =  parseInt(localStorage.getItem('questionId') || '1') > 1;

  }

  /**
   * Save questions & answers state in backend
   */
  saveState(skipped: boolean): void {
    const answers = {
      ...(JSON.parse(localStorage.getItem('payload') || '{}')),
      ...this.formGroup.value
    };
    const payload = {
      questions: localStorage.getItem('questions'),
      answers,
    };
    localStorage.setItem('payload', JSON.stringify(answers));

    // persist state in backend
    if (
      (this.authService.isUserLoggedIn() || this.currentQuestion?.last) &&
      this.currentQuestion.id > 1 &&
      !skipped
    ) {
      this.questionService.submitAnswers(payload).subscribe();
    }

  }

  /**
   * Shows previous question
   */
  previousQuestion(): void {
    this.questionId--;
    this.loadQuestion();
  }

  /**
   * Loads current question
   */
  loadQuestion(): void {
    this.saveQuestionId();
    this.assignQuestions();
    this.questionService.backButtonVisibility.next();
  }

  /**
   * Saves current question id in local storage
   */
  saveQuestionId(): void {
    localStorage.setItem('questionId', this.questionId.toString());
  }

  /**
   * Sets selected date in related textboxes
   * @param event Matdatepicker emitted value
   */
  dateSelected(event: MatDatepickerInputEvent<Date>): void {
    const newDate = new Date(event.value!);
    this.date = newDate.getDate();
    this.month = newDate.getMonth() + 1;
    this.year = newDate.getFullYear();
    this.formGroup.get(this.currentQuestion.name)?.setValue(newDate.toLocaleDateString('en-US'));
  }

  /**
   * Options selections event
   * @param index Index of selected radio
   */
  radioSelection(index: number): void {
    this.questionSet.forEach((question: Question) => {
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
   * @param index Index of selected checkbox
   */
  checkboxSelection(index: number): void {
    this.questionSet.forEach((question: Question) => {
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
  redirectToHome(): void {
    localStorage.removeItem('payload');
    localStorage.removeItem('questions');
    localStorage.removeItem('questionId');
    this.isOntarioPopupVisible = false;
    this.router.navigateByUrl('/home');
  }

  setCardValue(value:any,name:any){
    this.formGroup.get(name)?.setValue(value);
    if(this.formGroup.get(name)){
      if(value=='I know what I want'){
        localStorage.setItem('questions', JSON.stringify(this.questionPool2));
        this.subDiv=true;
      }
      else{
        if(this.formGroup.get(this.currentQuestion.subDiv.control)){
          this.formGroup.get(this.currentQuestion.subDiv.control)?.setValue('');
        }
        localStorage.setItem('questions', JSON.stringify(this.questionPool));
        this.subDiv=false;
        
      }
    }
    let cachedQuestions: Question[] = JSON.parse(localStorage.getItem('questions') || '{}');
    this.questionSet = Array.isArray(cachedQuestions) && cachedQuestions.length
      ? cachedQuestions
      : (localStorage.setItem('questions', JSON.stringify(this.questionPool)), this.questionPool);
  }

  sliderValueChangeSub(){
    if(this.formGroup.get(this.currentQuestion.subDiv.control)){
      this.formGroup.get(this.currentQuestion.subDiv.control)?.setValue(this.subDivvalue);
    }
    else{
      this.formGroup.addControl(this.currentQuestion.subDiv.control,new FormControl (this.subDivvalue));
    }
  }
}
