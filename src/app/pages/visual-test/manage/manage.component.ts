import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Choice } from '../models/choice';
import { ManageService } from './manage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionListModel, Question } from '../models/question';
import { ToastrService } from 'ngx-toastr';

class answerModel {
	value: string;
	text: string;
}

const updateUserPosi = 1;

@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

	isNewQeustion: boolean = false;
	isModified: string;
	QuestionList = new Array<QuestionListModel>();

	@ViewChild('questionInput') questionInput: ElementRef;

	constructor(
		private fb: FormBuilder,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private manageService: ManageService,
		private toastr: ToastrService
	) {
	}

	mode: any;
	questionId: string;
	QuestionFG: FormGroup;
	Question: FormGroup;
	Choices: FormArray;
	Answer = new Array<answerModel>();

	get question(): FormGroup {
		return this.QuestionFG.get('question') as FormGroup;
	}

	get choice(): FormArray {
		return this.question.get('choice') as FormArray;
	}

	ngOnInit() {
		this.onActiveRoute();
	}

	onActiveRoute() {
		this.activeRoute.params.subscribe(x => {
			this.QuestionList = [];
			this.resetQuestionSetForm();
			this.mode = x['mode'];
			if (this.mode == 'R') {
				this.manageService.getQuestionSet(x['id']).then(x => {
					this.QuestionList = x.questionList;
					this.QuestionFG.patchValue({
						id: x.id,
						questionSet: x.questionSet,
						timeOut: x.timeOut
					})
				});
			}
		})
	}

	private setItemFormArray(array: any[], formControl: string) {
		if (array !== undefined && array.length) {
			const itemFGs = array.map(item => this.fb.group(item));
			const itemFormArray = this.fb.array(itemFGs);
			this.Question = this.question;
			this.Question.setControl(formControl, itemFormArray);
		}
	}

	createQuestionSetFrom(): FormGroup {
		return this.fb.group({
			id: new FormControl(0, Validators.required),
			questionSet: new FormControl(null, Validators.required),
			timeOut: new FormControl(null, Validators.required),
			updateUserPosi: new FormControl(updateUserPosi, Validators.required),
			question: this.createQuestionFrom()
		})
	}

	createQuestionFrom(): FormGroup {
		return this.fb.group({
			id: new FormControl(0),
			questionSetId: new FormControl(0, Validators.required),
			question: new FormControl(null, Validators.required),
			img: new FormControl(null),
			imgName: new FormControl(null),
			isActive: new FormControl(null),
			answer: new FormControl(null, Validators.required),
			choice: this.fb.array([this.createChoice()]),
			updateUserPosi: new FormControl(updateUserPosi)
		})
	}

	createChoice(): FormGroup {
		return this.fb.group({
			id: new FormControl(0),
			questionId: new FormControl(0),
			choice: new FormControl(null, Validators.required),
			answerChoice: new FormControl(1, Validators.required),
			img: new FormControl(null),
			imgName: new FormControl(null),
			updateUserPosi: new FormControl(updateUserPosi)
		})
	}

	addNewChoice() {
		if ((this.choice.length + 1) <= 5) {
			this.Choices = this.choice;
			let c = this.createChoice();
			let answerChoice = this.Choices.value;
			answerChoice = answerChoice.map(x => x.answerChoice);
			
			c.patchValue({ answerChoice: Math.max(...answerChoice) + 1 })
			this.Choices.push(c);
			const arrChoice: Choice[] = this.Choices.value;
			this.addAnswer(arrChoice);
		}
	}

	addAnswer(c: Choice[]) {
		let a = new Array<answerModel>();
		c.map((item) => {
			a.push({
				value: item.answerChoice.toString(),
				text: `Choice ${item.answerChoice}`
			})
		});
		this.Answer = a;
	}

	changeQuestionImg(e: any) {
		let file = e.target.files[0];
		let isMatch: boolean | false;
		// ImageType.filter(item => file.type == item.type).map(() => isMatch = true);

		// if (!isMatch) {
		// 	alert(Message.checkImageType)
		// 	return
		// }

		let reader = new FileReader();
		reader.onload = () => {
			this.Question = this.question;
			this.Question.patchValue({
				img: reader.result,
				imgName: file.name
			})
		};

		reader.readAsDataURL(file);
	}

	changeChoiceImg(e: any, index: number) {
		let file = e.target.files[0];
		let isMatch: boolean | false;
		// ImageType.filter(item => file.type == item.type).map(() => isMatch = true);

		// if (!isMatch) {
		// 	alert(Message.checkImageType)
		// 	return
		// }
		let reader = new FileReader();
		reader.onload = async () => {
			await this.choice.at(index).patchValue({
				img: reader.result,
				imgName: file.name
			})
		};

		reader.readAsDataURL(file);
	}

	getChoiceByIndex(i: number): Choice {
		return this.choice.at(i).value as Choice;
	}

	onCloseQuestion() {
		this.isNewQeustion = false;
		this.isModified = null;
		this.resetQuestionForm();
	}

	onCreateQuestion() {
		this.isModified = 'C';
		this.isNewQeustion = true;
		setTimeout(() => {
			this.questionInput.nativeElement.focus();
		}, 100);
	}

	onEditQuestion(questionId: number) {
		this.Question = this.question;
		this.Question = this.createQuestionFrom();
		this.Choices = this.choice;
		this.Choices = this.fb.array([this.createChoice()]);

		this.manageService.getQuestion(questionId.toString()).then(async res => {
			await this.setItemFormArray(res.choice, 'choice');
			this.addAnswer(res.choice);
			this.Question = this.question;
			await this.Question.reset(res);
			this.isModified = 'R';
			this.isNewQeustion = true;
		})
	}

	onActiveQuestion(e: any, i: number, id: number, event: any) {
		const isActive = (e == 1 ? 0 : 1);
		const msg = isActive == 1 ? 'Set is Active' : 'Set is Deactive';
		const from = {
			id,
			isActive,
			updateUserPosi
		}

		this.manageService.updateActiveQuestion(from).then(x => {
			this.QuestionList
				.filter((x, index) => index == i)
				.map(x => x.isActive = isActive);

			this.toastr.success(`${msg} complete!`, msg);

		}, (err: HttpErrorResponse) => {
			event.target.checked = (e == 1 ? true : false);
			this.toastr.error(err.message, msg);
		})
	}

	onDelChoice(index: number) {
		if (this.isModified == 'R') {
			let c = this.choice.at(index).value;
			if (confirm(`Confirm delete your choice ${c.answerChoice} ?`)) {
				this.manageService.deleteChoice(c.id).then(x => {
					this.toastr.success('Delete choice complete!');

				}, (err: HttpErrorResponse) => {
					this.toastr.error(err.statusText, 'Delete choice fail!');
					return;
				})
			} else {
				return;
			}
		}

		this.choice.removeAt(index);
		this.Question = this.question;
		this.Question.patchValue({ answer: null });
		const arrChoices: Choice[] = this.choice.value;
		this.addAnswer(arrChoices);
	}

	onSave(f: any) {

		if (this.isModified == 'C') {
			this.manageService.createQuestion(this.QuestionFG.value).then(x => {
				this.toastr.success('Save complete!');
				this.onComplete();

				if (this.mode == 'C') {
					this.router.navigate(['/career/visual-test/manage', 'R', x.questionSetId])
				} else {
					this.QuestionList.push(x);
				}

			}, (err: HttpErrorResponse) => {
				this.toastr.error(err.statusText)
			});

		} else if (this.isModified == 'R') {
			this.manageService.updateQuestion(this.QuestionFG.value).then(() => {
				this.toastr.success('Update complete!');
				let q: Question = this.QuestionFG.get('question').value;
				this.QuestionList
					.filter(x => x.id == q.id)
					.map(x => {
						x.question = q.question;
						x.imgName = q.imgName;
					});
				this.onComplete();
			}, (err: HttpErrorResponse) => {
				this.toastr.error(err.statusText)
			});
		}
	}

	onUpdateQuestionSet() {
		const fg = this.QuestionFG.value;
		const from = {
			id: fg.questionSetId,
			questionSet: fg.questionSet,
			timeOut: fg.timeOut,
			updateUserPosi
		}
		this.manageService.updateQuestionSet(from).then(x => {
			this.toastr.success('Update complete!');
		}, (err: HttpErrorResponse) => {
			this.toastr.error(err.statusText);
		});
	}

	onComplete() {
		this.isNewQeustion = false;
		this.isModified = null;
		this.resetQuestionForm();
	}

	resetQuestionSetForm() {
		this.QuestionFG = this.createQuestionSetFrom();
		this.addAnswer(this.choice.value);
	}

	resetQuestionForm() {
		this.question.reset(this.createQuestionFrom());
		this.Answer = new Array<answerModel>();
		// this.addAnswer();
	}
}
