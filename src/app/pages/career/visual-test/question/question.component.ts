import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from './question.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CountdownComponent } from 'ngx-countdown';
import { Question, QuestionSetRandom } from '../../../back-office/visual-test/models/question';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private questionService: QuestionService
    ) { }

    @ViewChild('stepsContent') stepsContent: ElementRef;
    @ViewChild('btnSubmit') btnSubmit: ElementRef;
    @ViewChild(CountdownComponent) counterTimeOut: CountdownComponent;

    showNextButton: boolean = true;
    showPreviousButton: boolean = false;

    choiceYourChoose: number = 0;
    timeOutMinutes: any;
    isFinished: boolean = false;

    private getRandomSubscrip: Subscription;

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

            this.getRandomSubscrip = this.questionService
                .getQuestionRandom(x['questionSetId'])
                .subscribe((res: any) => {
                    const x: QuestionSetRandom = res.json();

                    this.questionModel = x.question;

                    this.timeOutMinutes = x.timeOut * 60; // หน่วยเป็น Seconds
                    const timeOutMilliseconds = (x.timeOut * 60000) // หน่วยเป็น Milliseconds เพิ่มให้ delay 30 วินาที
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
                    }, timeOutMilliseconds);
                });

        });
    }

    ngOnDestroy() {
        this.getRandomSubscrip.unsubscribe();
        clearTimeout(this.myTimeout);
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
                answerChoice: y.answerChoice,
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
        if (this.choiceYourChoose == this.getQuestionArr(this.QuestionFG).length) {
            setTimeout(() => {
                this.btnSubmit.nativeElement.focus();
            }, 100);
        }
        this.onNextStep();
    }


    setAnswer() {
        clearTimeout(this.myTimeout);
        this.counterTimeOut.stop();

        const q = this.QuestionFG.value;
        let f: any[] = [];
        q.QuestionArr.map(x => {
            const choice = x.ChoiceArr.filter(f1 => f1.isSelect == true)[0] || null;
            f.push({
                questionId: x.id,
                answer: choice != null ? choice.answerChoice : 0
            });
        });

        const sTime = new Date(this.startTime);
        const eTime = this.endTime ? new Date(this.endTime) : new Date();
        const timeUse = this.diff_minutes(sTime, eTime);

        let form: any = {
            timeUse: timeUse,
            questionSetId: this.questionSetId,
            userId: this.userId,
            timeOut: q.timeOut,
            questions: f
        }

        this.questionService.verifyQuestion(form).subscribe((x) => {
            this.isFinished = true;
        }, (err: Response) => {
            alert(err.statusText);
        });
    }

    private diff_minutes(dt2, dt1) {
        let diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    }

    onSubmit() {
        if (confirm('ต้องการยืนยันการส่งแบบทดสอบหรือไม่ ?')) {
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
