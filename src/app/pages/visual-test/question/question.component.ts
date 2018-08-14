import { Component, OnInit } from '@angular/core';
import { Question } from '../models/question';
import { Choice } from '../models/choice';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    constructor(private fb: FormBuilder, private router: Router) { }

    questionModel: Question[] = [
        {
            id: 1, question: 'Question1', img: null,
            chioce: [
                { id: 1, choice: 'choice1', img: null, isSelect: false },
                { id: 1, choice: 'choice2', img: null, isSelect: false },
                { id: 1, choice: 'choice3', img: null, isSelect: false },
                { id: 1, choice: 'choice4', img: null, isSelect: false },
                { id: 1, choice: 'choice5', img: null, isSelect: false }
            ]
        },
        {
            id: 1, question: 'Question2', img: null,
            chioce: [
                { id: 1, choice: 'choice1', img: null, isSelect: false },
                { id: 1, choice: 'choice2', img: null, isSelect: false },
                { id: 1, choice: 'choice3', img: null, isSelect: false },
                { id: 1, choice: 'choice4', img: null, isSelect: false },
                { id: 1, choice: 'choice5', img: null, isSelect: false }
            ]
        },
        {
            id: 1, question: 'Question3', img: null,
            chioce: [
                { id: 1, choice: 'choice1', img: null, isSelect: false },
                { id: 1, choice: 'choice2', img: null, isSelect: false },
                { id: 1, choice: 'choice3', img: null, isSelect: false },
                { id: 1, choice: 'choice4', img: null, isSelect: false },
                { id: 1, choice: 'choice5', img: null, isSelect: false }
            ]
        }
    ]

    _choiceArr: FormGroup = this.fb.group({
        choice: new FormControl(null),
        img: new FormControl(null),
        isSelect: new FormControl(null)
    })

    _questionArr: FormGroup = this.fb.group({
        question: new FormControl(null),
        img: new FormControl(null),
        ChoiceArr: this.fb.array([this._choiceArr])
    })

    QuestionFG: FormGroup = this.fb.group({
        QuestionArr: this.fb.array([this._questionArr])
    });

    get QuestionArr(): FormArray {
        return this.QuestionFG.get('QuestionArr') as FormArray;
    }

    get ChoiceArr(): FormArray {
        return this.QuestionArr.get('ChoiceArr') as FormArray;
    }

    getQuestionArr(form: any) {
        return form.controls.QuestionArr.controls;
    }

    getChoiceArr(form: any) {
        return form.controls.ChoiceArr.controls;
    }

    ngOnInit() {
        this.QuestionFG = this.fb.group({
            QuestionArr: this.setQuestions()
        })
    }

    private setQuestions() {
        let QuestionArr = new FormArray([]);
        this.questionModel.map(x => {
            QuestionArr.push(this.fb.group({
                question: x.question,
                img: x.img,
                ChoiceArr: this.setChoices(x)
            }))
        })
        return QuestionArr;
    }

    private setChoices(x) {

        let ChoiceArr = new FormArray([]);
        x.chioce.map(y => {
            ChoiceArr.push(this.fb.group({
                choice: y.choice,
                img: y.img,
                isSelect: y.isSelect
            }))
        })

        return ChoiceArr;
    }

    setIsSelected(i: number, questions: any) {
        let choiceArr = questions.controls.ChoiceArr
        choiceArr.value.map((item, index) => {
            item.isSelect = i == index ? true : false;
        })

        console.log(choiceArr);

    }

    onSubmit() {
        this.router.navigate(['/career/visual-test/verify'])
    }
}
