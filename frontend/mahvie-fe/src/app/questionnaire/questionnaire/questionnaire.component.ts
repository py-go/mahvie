import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ConstantService } from '@config/constant.service';
import { Option, Question } from '@models/core.model';
import { AuthService } from '@services/auth.service';
import { QuestionnaireService } from '@services/questionnaire.service';
// import { EventEmitter } from 'events';
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
      category: '',
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
      category: '',
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
      category: '',
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
      category: '',
      question: '',
      type: 'div',
      options: [
        { text: 'I know my desired coverage amount, show me some recommendations', active: false, htmlTitle: 'I know what I want', hoverText: 'If I were to pass away, I would like to give money to a person(s) of my choice.' },
        { text: "I'll answer some questions to recieve a tailored recommendations", active: false, htmlTitle: 'I need a recommendation', hoverText: 'If I were to suffer a stroke, heart attack or  get cancer, I would like to personally receive a large amount of money.' },
      ],
      controls: ['help'],
      validations: { required: true },
      title: 'How can we help?',
      subDiv: { control: 'desiredAmount', min: '0', max: '50000' },
      subtitle: 'Please select the option that best describes the kind of help you need.'
    },
    {
      id: 5,
      name: 'names',
      category: '',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'recommendation',
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
  questionPool3: Question[] = [
    {
      id: 1,
      name: 'gettoknowyou',
      category: '',
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
      category: '',
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
      category: '',
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
      category: '',
      question: '',
      type: 'div',
      options: [
        { text: 'I know my desired coverage amount, show me some recommendations', active: false, htmlTitle: 'I know what I want', hoverText: 'If I were to pass away, I would like to give money to a person(s) of my choice.' },
        { text: "I'll answer some questions to recieve a tailored recommendations", active: false, htmlTitle: 'I need a recommendation', hoverText: 'If I were to suffer a stroke, heart attack or  get cancer, I would like to personally receive a large amount of money.' },
      ],
      controls: ['help'],
      validations: { required: true },
      title: 'How can we help?',
      subDiv: { control: 'desiredAmount', min: '0', max: '50000' },
      subtitle: 'Please select the option that best describes the kind of help you need.'
    },
    {
      id: 5,
      name: 'names',
      category: '',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      name: 'name-address',
      category: 'recommendation',
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

  questionPool4: Question[] = [
    {
      id: 1,
      name: 'gettoknowyou',
      category: '',
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
      category: '',
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
      category: '',
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
      category: '',
      question: '',
      type: 'div',
      options: [
        { text: 'I know my desired coverage amount, show me some recommendations', active: false, htmlTitle: 'I know what I want', hoverText: 'If I were to pass away, I would like to give money to a person(s) of my choice.' },
        { text: "I'll answer some questions to recieve a tailored recommendations", active: false, htmlTitle: 'I need a recommendation', hoverText: 'If I were to suffer a stroke, heart attack or  get cancer, I would like to personally receive a large amount of money.' },
      ],
      controls: ['help'],
      validations: { required: true },
      title: 'How can we help?',
      subDiv: { control: 'desiredAmount', min: '0', max: '50000' },
      subtitle: 'Please select the option that best describes the kind of help you need.'
    },
    {
      id: 5,
      name: 'names',
      category: '',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      category: 'finances',
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
      name: 'name-address',
      category: 'recommendation',
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
      category: '',
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
      category: '',
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
      category: '',
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
      category: '',
      question: '',
      type: 'div',
      options: [
        { text: 'I know my desired coverage amount, show me some recommendations', active: false, htmlTitle: 'I know what I want', hoverText: 'If I were to pass away, I would like to give money to a person(s) of my choice.' },
        { text: "I'll answer some questions to recieve a tailored recommendations", active: false, htmlTitle: 'I need a recommendation', hoverText: 'If I were to suffer a stroke, heart attack or  get cancer, I would like to personally receive a large amount of money.' },
      ],
      controls: ['help'],
      validations: { required: true },
      title: 'How can we help?',
      subDiv: { control: 'desiredAmount', min: '0', max: '50000' },
      subtitle: 'Please select the option that best describes the kind of help you need.'
    },
    {
      id: 5,
      name: 'names',
      category: '',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'about-you',
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
      category: 'finances',
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
      category: 'finances',
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
  subDiv: boolean = false;
  subDivvalue: any;
  cachedQuestions: Question[];
  isButtonVisible = parseInt(localStorage.getItem('questionId') || '1') > 1;
  fieldSet: number = 10;
  recommendedArray: any = [];

  constructor(
    private questionService: QuestionnaireService,
    private constantService: ConstantService,
    private authService: AuthService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.questionId = Number(localStorage.getItem('questionId') || '1');
    this.cachedQuestions = JSON.parse(localStorage.getItem('questions') || '{}');
    this.questionSet = Array.isArray(this.cachedQuestions) && this.cachedQuestions.length
      ? this.cachedQuestions
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

    this.formGroup.valueChanges.subscribe(data => {
      this.setProgress();
    })
    this.setProgress();
  }

  setProgress() {
    switch (this.currentQuestion.category) {
      case 'about-you':
        this.fieldSet = 20;
        break;

      case 'finances':
        this.fieldSet = 40;
        break;

      case 'recommendation':
        this.fieldSet = 60;
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  previousClick() {
    if (this.showRecommendation) this.showRecommendation = false;
    this.previousQuestion();
    this.isButtonVisible = parseInt(localStorage.getItem('questionId') || '1') > 1;
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
            if (question.subDiv) {
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
  newFlow(): void{ // clear old state values
    let answers: any = localStorage.getItem('payload');
    answers = JSON.parse(answers);
    let helpValue: any = this.formGroup.get('help');
    helpValue = helpValue.value;
    let desiredAmountValue: any = this.formGroup.get('desiredAmount');
    desiredAmountValue = desiredAmountValue.value;
    let newAnswers: any = {};
    newAnswers.ontario = answers.ontario;
    newAnswers.email = answers.email;
    newAnswers.help = answers.help;
    this.formGroup.reset();
    if(this.formGroup.controls['ontario'] && this.formGroup.controls['email']){
      this.formGroup.controls['ontario'].setValue(newAnswers.ontario);
      this.formGroup.controls['email'].setValue(newAnswers.email);
    } else {
      this.formGroup.controls['help'].setValue(answers.help);
      this.formGroup.controls['desiredAmount'].setValue(answers.desiredAmountValue);
    }
    if(helpValue === 'I know what I want'){
      newAnswers.desiredAmount = answers.desiredAmount;
    }
    localStorage.removeItem('payload');
    localStorage.setItem('payload', JSON.stringify(newAnswers));
  }
  /**
   * Continue click event
   */
  continue(skipQuestion = false): void {
    // console.log(this.formGroup.get('help'), this.currentQuestion)

    if (this.formGroup.get('without-income')) {
      let data: any = this.formGroup.get('without-income');
      if (data.value == 'yes') {
        let alteredQuestions = this.questionPool3;
        alteredQuestions.forEach((item, i) => { // for remove income-replace question
          if (item.name === 'income-replaced') {
            alteredQuestions.splice(i, 1);
          }
        });
        localStorage.setItem('questions', JSON.stringify(alteredQuestions));
        this.questionSet = JSON.parse(localStorage.getItem('questions') || '{}');
      }
      else {
        localStorage.setItem('questions', JSON.stringify(this.questionPool));
        this.questionSet = JSON.parse(localStorage.getItem('questions') || '{}');
      }
    }
    if (this.formGroup.get('survive-without-income')) {
      let data: any = this.formGroup.get('survive-without-income');
      if (data.value == 'yes') {
        localStorage.setItem('questions', JSON.stringify(this.questionPool4));
        this.questionSet = JSON.parse(localStorage.getItem('questions') || '{}');
      }
      else {
        localStorage.setItem('questions', JSON.stringify(this.questionPool));
        this.questionSet = JSON.parse(localStorage.getItem('questions') || '{}');
      }
    }
    // persist state in local & conditionally in backend
    this.saveState(skipQuestion);
    if(this.currentQuestion?.name === 'help'){
      this.newFlow(); // clear old state values
    } 

    // reset slider value on continue
    this.currentQuestion.type === 'slider' && (this.sliderValue = 0);
    if (!this.currentQuestion?.last) {
      this.questionId++;
      this.loadQuestion();
    } else {
      this.showRecommendation = true;
      this.currentQuestion = {};
      this.currentQuestion.category = 'recommendation';
      this.setProgress();
    }
    this.isButtonVisible = parseInt(localStorage.getItem('questionId') || '1') > 1;


  }

  /**
   * Save questions & answers state in backend
   */
  saveState(skipped: boolean): void {
    let status = ''
    if (this.currentQuestion.name == 'name-address') { status = 'completed' }

    const answers = {
      ...(JSON.parse(localStorage.getItem('payload') || '{}')),
      ...this.formGroup.value
    };
    const payload = {
      questions: localStorage.getItem('questions'),
      answers,
      status
    };
    localStorage.setItem('payload', JSON.stringify(answers));

    // persist state in backend
    if (
      (this.authService.isUserLoggedIn() || this.currentQuestion?.last) &&
      this.currentQuestion.id > 1 &&
      !skipped
    ) {
      this.questionService.submitAnswers(payload).subscribe(data => {
        if (data) {
          this.recommendedArray = Object.entries(data).map((e) => (e[1]));
        }
        if (this.recommendedArray.length > 1)
          this.recommendedArray.forEach((element: any) => {
            element.show = false;
          });
      });
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

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  /**
   * Sets selected date in related textboxes
   * @param event Matdatepicker emitted value
   */
  dateSelected(event: MatDatepickerInputEvent<Date>): void {
    const newDates = new Date(event.value!);
    this.date = newDates.getDate();
    this.month = newDates.getMonth() + 1;
    this.year = newDates.getFullYear();
    const newDate = this.formatDate(event.value!)
    this.formGroup.get(this.currentQuestion.name)?.setValue(newDate);
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

  setCardValue(value: any, name: any) {
    this.formGroup.get(name)?.setValue(value);
    if (this.formGroup.get(name)) {
      if (value == 'I know what I want') {
        localStorage.setItem('questions', JSON.stringify(this.questionPool2));
        this.subDiv = true;
      }
      else {
        if (this.formGroup.get(this.currentQuestion.subDiv.control)) {
          this.formGroup.get(this.currentQuestion.subDiv.control)?.setValue('');
        }
        localStorage.setItem('questions', JSON.stringify(this.questionPool));
        this.subDiv = false;

      }
    }
    let cachedQuestions: Question[] = JSON.parse(localStorage.getItem('questions') || '{}');
    this.questionSet = Array.isArray(cachedQuestions) && cachedQuestions.length
      ? cachedQuestions
      : (localStorage.setItem('questions', JSON.stringify(this.questionPool)), this.questionPool);
  }

  sliderValueChangeSub(event: any) {
      let orginalvalue = event.target.value;
      if (orginalvalue !== '') {
        this.subDivvalue = orginalvalue.split('$')[1].trim();
        if (this.formGroup.get(this.currentQuestion.subDiv.control)) {
          this.formGroup.get(this.currentQuestion.subDiv.control)?.setValue(this.subDivvalue);
        }
        else {
          this.formGroup.addControl(this.currentQuestion.subDiv.control, new FormControl(this.subDivvalue));
        }
        console.log(this.subDivvalue)
      }
  }
}
