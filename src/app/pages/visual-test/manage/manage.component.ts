import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Choice } from '../models/choice';
import { ManageService } from './manage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionListModel } from '../models/question';
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
	Choices: FormArray;
	Answer = new Array<answerModel>();

	get choice(): FormArray {
		return this.QuestionFG.get('choice') as FormArray;
	}

	ngOnInit() {
		this.onActiveRoute();
	}

	onActiveRoute() {
		this.activeRoute.params.subscribe(x => {
			this.QuestionList = [];
			this.resetForm();
			this.mode = x['mode'];
			if (this.mode == 'R') {
				this.manageService.getQuestionSet(x['id']).then(x => {
					this.QuestionList = x.questionList;
					this.QuestionFG.patchValue({
						questionSetId: x.questionSetId,
						questionSet: x.questionSet,
						timeOut: x.timeOut
					})
				});
			}
			// this.addAnswer();
		})
	}

	private setItemFormArray(array: any[], formControl: string) {
		if (array !== undefined && array.length) {
			const itemFGs = array.map(item => this.fb.group(item));
			const itemFormArray = this.fb.array(itemFGs);
			this.QuestionFG.setControl(formControl, itemFormArray);
		}
	}

	createQuestionFrom(): FormGroup {
		return this.fb.group({
			id: new FormControl(0),
			questionSetId: new FormControl(0, Validators.required),
			questionSet: new FormControl(null, Validators.required),
			timeOut: new FormControl(null, Validators.required),
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
			img: new FormControl(null),
			imgName: new FormControl(null),
			updateUserPosi: new FormControl(updateUserPosi)
		})
	}

	addNewChoice() {
		if ((this.choice.length + 1) <= 5) {
			this.Choices = this.choice;
			this.Choices.push(this.createChoice());
			this.addAnswer();
		}
	}

	addAnswer() {
		let a = new Array<answerModel>();
		this.choice.value.map((item, index) => {
			a.push({
				value: index + 1,
				text: `Choice ${index + 1}`
			})
		});

		this.Answer = a;
	}

	removeChoice(index: number) {
		this.choice.removeAt(index)
	}

	changeQuestionImg(e: any, img: any) {
		let file = e.target.files[0];
		let isMatch: boolean | false;
		// ImageType.filter(item => file.type == item.type).map(() => isMatch = true);

		// if (!isMatch) {
		// 	alert(Message.checkImageType)
		// 	return
		// }

		let reader = new FileReader();
		reader.onload = () => {
			img.src = reader.result;
			this.QuestionFG.patchValue({
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
		this.resetForm();
	}

	onCreateQuestion() {
		this.isModified = 'C';
		this.isNewQeustion = true;
	}

	onEditQuestion(questionId: number) {
		this.manageService.getQuestion(questionId.toString()).then(async res => {
			this.questionId = res.id;
			await this.setItemFormArray(res.choice, 'choice');
			this.addAnswer();
			await this.QuestionFG.reset(res);
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

	onDelChoice(id: number) {
		if (id == 0) {
			return;
		}
	}

	onSave(f: any) {

		if (this.isModified == 'C') {
			this.manageService.createQuestion(this.QuestionFG.value).then(x => {
				this.toastr.success('Save complete!');

				if (this.mode == 'C') {
					this.router.navigate(['/career/visual-test/manage', 'R', x.id])
				} else {
					this.onComplete(x);

					f.isActive = 1;
					this.QuestionList.push(f);
				}

			}, (err: HttpErrorResponse) => {
				this.toastr.error(err.statusText)
			});

		} else if (this.isModified == 'R') {
			// this.manageService.updateQuestion(this.QuestionFG.value).then(x => {
			// 	this.toastr.success('Update complete!');
			// 	this.onComplete(x);
			// }, (err: HttpErrorResponse) => {
			// 	this.toastr.error(err.statusText)
			// });
			console.log(this.QuestionFG);
			
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

	onComplete(x) {
		this.isNewQeustion = false;
		this.isModified = null;
		this.resetForm();

		this.QuestionFG.patchValue({
			questionSetId: x.id,
			questionSet: x.questionSet,
			timeOut: x.timeOut
		})
	}

	resetForm() {
		this.QuestionFG = this.createQuestionFrom();
		this.addAnswer();
	}
}
