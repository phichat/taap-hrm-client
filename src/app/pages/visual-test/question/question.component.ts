import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Question } from '../models/question';
import { Choice } from '../models/choice';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from './question.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private questionService: QuestionService
    ) { }

    @ViewChild('stepsContent') stepsContent: ElementRef;

    showNextButton: boolean = true;
    showPreviousButton: boolean = false;

    choiceYourChoose: number = 0;

    private myTimeout: any;
    private startTime: Date;
    private endTime: Date;

    private userId: number;
    private questionSetId: number;
    questionModel: Question[]

    _choiceArr: FormGroup = this.fb.group({
        id: new FormControl(null),
        choice: new FormControl(null),
        img: new FormControl(null),
        isSelect: new FormControl(null)
    })

    _questionArr: FormGroup = this.fb.group({
        id: new FormControl(null),
        question: new FormControl(null),
        img: new FormControl(null),
        ChoiceArr: this.fb.array([this._choiceArr])
    })

    QuestionFG: FormGroup = this.fb.group({
        questionSet: new FormControl(null),
        timeOut: new FormControl(null),
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
        this.activeRoute.params.subscribe(x => {
            this.questionSetId = x['questionSetId'];
            this.userId = x['userId'];

            this.questionService.getQuestionRandom(x['questionSetId']).then(x => {
                this.questionModel = x.question;
                this.myTimeout = x.timeOut;
                this.QuestionFG = this.fb.group({
                    questionSet: x.questionSet,
                    timeOut: x.timeOut,
                    QuestionArr: this.setQuestions()
                });

                this.startTime = new Date();

                this.myTimeout = setTimeout(() => {
                    const hours = (new Date()).getHours();
                    const min = (new Date()).getUTCMinutes();
                    this.endTime = new Date();
                    alert(`Testing time out! ${hours}:${min}`);
                    this.setAnswer();
                }, x.timeOut * 60000);
                // Minutes to Milliseconds
            });
        });
    }

    private setQuestions() {
        let QuestionArr = new FormArray([]);

        this.questionModel.map(x => {
            QuestionArr.push(this.fb.group({
                id: x.id,
                question: x.question,
                img: x.img,
                ChoiceArr: this.setChoices(x)
            }))
        })
        return QuestionArr;
    }

    private setChoices(x) {
        let ChoiceArr = new FormArray([]);
        x.choice.map(y => {
            ChoiceArr.push(this.fb.group({
                id: y.id,
                choice: y.choice,
                img: y.img,
                isSelect: false
            }))
        })
        return ChoiceArr;
    }

    setIsSelected(i: number, questions: any) {
        let choiceArr = questions.controls.ChoiceArr
        choiceArr.value.map((item, index) => {
            item.isSelect = i == index ? true : false;
        })

        const q = this.QuestionFG.value.QuestionArr;
        let f: any[] = [];
        q.map(x => {
            const choice = x.ChoiceArr.filter(f1 => f1.isSelect == true)[0] || null;
            if (choice) {
                f.push({ questionId: x.id, answer: choice.id });
            }
        });

        this.choiceYourChoose = f.length;

        this.onNextStep();
    }

    setAnswer() {

        clearTimeout(this.myTimeout);

        const q = this.QuestionFG.value.QuestionArr;
        let f: any[] = [];
        q.map(x => {
            const choice = x.ChoiceArr.filter(f1 => f1.isSelect == true)[0] || null;
            f.push({
                questionId: x.id,
                answer: choice != null ? choice.id : null
            });
        });

        const sTime = new Date(this.startTime);
        const eTime = this.endTime ? new Date(this.endTime) : new Date();

        let form: any = {
            timeUse: this.diff_minutes(sTime, eTime),
            questionSetId: this.questionSetId,
            userId: this.userId,
            timeOut: this.myTimeout,
            questions: f
        }

        this.questionService.verifyQuestion(form).then(x => {
            this.router.navigate(['/career/visual-test/verify', this.questionSetId, this.userId])
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    diff_minutes(dt2, dt1) {
        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    }

    onSubmit() {
        if (confirm('Confirm submit visula test ?')) {
            this.setAnswer();
        }

    }

    onPreviousStep() {
        const steps = this.stepsContent.nativeElement;
        let content = steps.children;
        this.showNextButton = true;

        for (let i = 0; i < content.length; i++) {
            let previousIndex = i - 1;

            if (content[i].classList.contains('is-active')) {
                i > 0 && content[i].classList.remove('is-active');
                i > 0 && content[previousIndex].classList.add('is-active');
                this.showPreviousButton = (i == 1 ? false : true);
                return;
            }
        }
    }

    onNextStep() {
        const steps = this.stepsContent.nativeElement;
        let content = steps.children;
        this.showPreviousButton = true;

        for (let i = 0; i < content.length; i++) {
            let nextIndex = i + 1;
            if (nextIndex == content.length) return;

            if (content[i].classList.contains('is-active')) {
                content[i].classList.remove('is-active');
                content[nextIndex].classList.add('is-active');
                this.showNextButton = nextIndex == content.length - 1 ? false : true;
                return;
            }
        }
    }
}
