import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";

export enum QuestionType {
  multichoice = "MULTICHOICE",
  paragraph = "PARAGRAPH"
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {

  @ViewChild('btnCloseQuestionModal', {static: true}) btnCloseQuestionModal!: ElementRef;

  questionForm!: FormGroup

  listForm: FormGroup

  questionType = QuestionType;

  constructor(private fb: FormBuilder, private router: Router) {
    this.listForm = fb.group({
      questions: fb.array([])
    })
    this.initFormQuestion();
  }

  ngOnInit(): void {
  }

  initFormQuestion() {
    this.questionForm = this.fb.group({
      questionType: [QuestionType.multichoice],
      paragraph: [''],
      title: ['', Validators.required],
      answers: this.fb.array([
        this.fb.group({
          label: [''],
          isSelected: [false]
        }),
        this.fb.group({
          label: [''],
          isSelected: [false]
        })
      ]),
      isRequired: [false]
    }, {
      validators: this.formValidator
    })
  }

  get answers() {
    return this.questionForm.controls['answers'] as FormArray;
  }

  listAnswers(i: number) {
    return this.questions.at(i).get('answers') as FormArray
  }

  get questions() {
    return this.listForm.controls['questions'] as FormArray;
  }

  addNewAnswer(): void {
    this.answers.push(this.fb.group({
      label: ['', Validators.required],
      isSelected: [false]
    }));
  }

  addNewQuestion(): void {
    const val = this.questionForm.value;
    const answers = new FormArray([])
    for (let ans of val.answers) {
      answers.push(this.fb.group({
        label: [ans.label],
        isSelected: [ans.isSelected],
        other: [''],
      }))
    }
    this.questions.push(this.fb.group({
      ...val,
      answers
    }, {validators: this.requireValidator}));
  }

  removeAnswer(i: number): void {
    this.answers.removeAt(i);
  }

  submitQuestion(): void {
    this.addNewQuestion();
    this.initFormQuestion()
    this.btnCloseQuestionModal.nativeElement.click();
  }

  reviewAnswer(): void {
    this.router.navigate(['form/answer', {questions: JSON.stringify(this.listForm.value.questions)}])
  }

  formValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value.questionType === QuestionType.paragraph) return null;
    const label = control.value.answers.map((x: any) => x.label);
    if (!label.length) return {anwIsNotEmpty: true};
    return new Set(label).size !== label.length ? {duplicated: true} : null;
  }

  requireValidator(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (val.isRequired) {
      if (val.questionType === QuestionType.paragraph) {
        return val.paragraph ? null : {required: true}
      } else {
        return val.answers.filter((x: any) => x.isSelected).length ? null : {required: true}
      }
    }
    return null
  }

}
