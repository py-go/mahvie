import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '@services/questionnaire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isButtonVisible = parseInt(localStorage.getItem('questionId') || '1') > 1;

  constructor(
    private questionService: QuestionnaireService,
  ) { }

  ngOnInit(): void {
    this.questionService.backButtonVisibility.subscribe(_ => {
      this.isButtonVisible =
        parseInt(localStorage.getItem('questionId') || '1') > 1;
    });
  }

  /**
   * Emits event to show previous question
   */
  previous() {
    this.questionService.backButtonClick.next();
  }
}
