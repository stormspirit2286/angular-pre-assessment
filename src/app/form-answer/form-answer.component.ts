import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionType } from "../form-builder/form-builder.component";

@Component({
  selector: 'app-form-answer',
  templateUrl: './form-answer.component.html',
  styleUrls: ['./form-answer.component.scss']
})
export class FormAnswerComponent implements OnInit {

  questions: any = [];

  questionType = QuestionType;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.questions = JSON.parse(route.snapshot.paramMap.get('questions') || '[]');
  }

  ngOnInit(): void {
  }

  noAns(ans: any) {
    return !ans.filter((x: any) => x.isSelected).length
  }

  back(): void {
    this.router.navigate(['form/builder'])
  }

}
