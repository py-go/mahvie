import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from '@services/questionnaire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // isButtonVisible = Number(localStorage.getItem('questionId')) > 1;

  constructor(
    private questionService: QuestionnaireService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.questionService.backButtonVisibility.subscribe(_ => {
    //   this.isButtonVisible = Number(localStorage.getItem('questionId')) > 1;
    // });
  }

  /**
   * Emits event to show previous question
   */
  previous(): void {
    this.questionService.backButtonClick.next();
  }

  menuFunction(){
    let x:any = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  logoClick(): void{
    this.router.navigate(['']);
  }
}
