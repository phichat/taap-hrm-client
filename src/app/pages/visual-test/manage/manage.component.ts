import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Choice } from '../models/choice';
import { ManageService } from './manage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';

class answerModel {
	value: string;
	text: string;
}

@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

	constructor(
		private fb: FormBuilder,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private manageService: ManageService
	) { }

	mode: any;
	questionId: string;
	QuestionFG: FormGroup;
	Choices: FormArray;
	Answer = new Array<answerModel>();

	get choice(): FormArray {
		return this.QuestionFG.get('choice') as FormArray;
	}

	ngOnInit() {

		this.QuestionFG = this.createFrom();

		this.onActiveRoute();
	}

	onActiveRoute() {
		this.activeRoute.params.subscribe(x => {
			this.mode = x['mode'];
			if (this.mode == 'R') {
				this.manageService.getQuestionById(x['id']).then(async res => {
					this.questionId = res.id;
					await this.setItemFormArray(res.choice, 'choice');
					await this.addAnswer();

					await this.QuestionFG.reset(res);
				})
			}
		})
	}

	private setItemFormArray(array: any[], formControl: string) {
		if (array !== undefined && array.length) {
			const itemFGs = array.map(item => this.fb.group(item));
			const itemFormArray = this.fb.array(itemFGs);
			this.QuestionFG.setControl(formControl, itemFormArray);
		}
	}

	createFrom(): FormGroup {
		return this.fb.group({
			id: new FormControl(1),
			questionType: new FormControl(null),
			question: new FormControl(null),
			img: new FormControl(null),
			imgName: new FormControl(null),
			answer: new FormControl(null),
			choice: this.fb.array([this.createChoice()]),
			updateUserPosi: new FormControl(1)
		})
	}

	createChoice(): FormGroup {
		return this.fb.group({
			id: new FormControl(1),
			questionId: new FormControl(1),
			choice: new FormControl(null),
			img: new FormControl(null),
			imgName: new FormControl(null),
			isSelect: new FormControl(null),
			updateUserPosi: new FormControl(1)
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

	onSave() {
		if (this.mode == 'C') {
			this.manageService.createQuestion(this.QuestionFG.value).then(x => {
				alert('Save complete!');
				this.resetForm();
			}, (err: HttpErrorResponse) => {
				alert(err.statusText)
			});

		} else if (this.mode == 'R') {
			this.manageService.updateQuestion(this.questionId, this.QuestionFG.value).then(x => {
				alert('Save complete!');
				this.router.navigate(['/career/visual-test/manage/C/NEW']);
			}, (err: HttpErrorResponse) => {
				alert(err.statusText)
			});
		}
	}

	resetForm() {
		this.QuestionFG = this.createFrom();
		this.addAnswer();
	}
}
