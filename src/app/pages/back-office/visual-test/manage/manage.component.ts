import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Choice } from '../models/choice';
import { ManageService } from './manage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionListModel, Question, QuestionModel } from '../models/question';
import { ToastrService } from 'ngx-toastr';
import * as fromPubService from 'src/app/services';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';

class answerModel {
	value: string;
	text: string;
}

// const updateUserPosi = 1;


@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

	isNewQeustion: boolean = false;
	isModified: string;
	QuestionList = new Array<QuestionListModel>();
	dataTable: any;
	updateUserPosi = 1;

	@ViewChild('questionInput') questionInput: ElementRef;

	constructor(
		private fb: FormBuilder,
		private activeRoute: ActivatedRoute,
		private router: Router,
		private manageService: ManageService,
		private toastr: ToastrService,
		private s_users: fromPubService.UsersService,
		private chRef: ChangeDetectorRef
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
		// this.s_users.currentData.subscribe(x => {
		// 	this.updateUserPosi = x.vtId;
		// 	console.log(x);
		// });
	}

	onActiveRoute() {
		this.activeRoute.params.subscribe(x => {
			this.QuestionList = [];
			this.resetQuestionSetForm();
			this.mode = x['mode'];
			if (this.mode == 'R') {
				this.manageService.getQuestionSet(x['id']).subscribe(res => {
					const x = res.json();
					this.QuestionList = x.questionList;
					this.onDetectDataTable();
					this.QuestionFG.patchValue({
						id: x.id,
						questionSet: x.questionSet,
						timeOut: x.timeOut
					})
				});
			}
		})
	}

	onDetectDataTable() {

		const table: any = $('table');

		if ($.fn.DataTable.isDataTable('table')) {
			this.dataTable = table.DataTable();
			this.dataTable.destroy();
		}
		this.chRef.detectChanges();

		this.dataTable = $('table').DataTable({
			'scrollY': true
		});
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
			updateUserPosi: new FormControl(this.updateUserPosi, Validators.required),
			question: this.createQuestionFrom()
		})
	}

	createQuestionFrom(): FormGroup {
		return this.fb.group({
			id: new FormControl(0),
			// questionSetId: new FormControl(0, Validators.required),
			question: new FormControl(null, Validators.required),
			img: new FormControl(null),
			imgName: new FormControl(null),
			isActive: new FormControl(null),
			answer: new FormControl(null, Validators.required),
			choice: this.fb.array([this.createChoice()]),
			updateUserPosi: new FormControl(this.updateUserPosi)
		})
	}

	createChoice(): FormGroup {
		return this.fb.group({
			id: new FormControl(0),
			// questionId: new FormControl(0),
			choice: new FormControl(null, Validators.required),
			answerChoice: new FormControl(1, Validators.required),
			img: new FormControl(null),
			imgName: new FormControl(null),
			updateUserPosi: new FormControl(this.updateUserPosi)
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

		this.manageService.getQuestion(questionId.toString()).subscribe(x => {
			const res = x.json();
			this.setItemFormArray(res.choice, 'choice');
			this.addAnswer(res.choice);
			this.Question = this.question;
			this.Question.reset(res);
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
			updateUserPosi: this.updateUserPosi
		}

		this.manageService.updateActiveQuestion(from).subscribe(() => {
			this.QuestionList
				.filter((x, index) => index == i)
				.map(x => x.isActive = isActive);

			this.toastr.success(`${msg} complete!`, msg);

		}, (err: Response) => {
			event.target.checked = (e == 1 ? true : false);
			this.toastr.error(err.statusText, msg);
		})
	}

	onDelChoice(index: number) {
		if (this.choice.value.length == 1) return;

		let c = this.choice.at(index).value;
		if (this.isModified == 'R' && c.id != 0) {
			if (confirm(`ต้องการลบรายการ ตัวเลือกที่ ${c.answerChoice} หรือไม่ ?`)) {
				this.manageService.deleteChoice(c.id).then(x => {
					this.toastr.success(`ลบตัวเลือกที่ ${c.answerChoice} สำเร็จ!`);

				}, (err: Response) => {
					this.toastr.error(err.statusText, `ลบรายการไม่สำเร็จ!`);
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
			this.manageService.createQuestion(this.QuestionFG.value).subscribe(res => {
				const x: QuestionModel = res.json();
				this.toastr.success('บันทึกสำเร็จ!');
				this.onComplete();

				if (this.mode == 'C') {
					this.router.navigate(['/back-office/visual-test/manage', 'R', x.questionSetId])
				} else {
					this.QuestionList.push(x);
					this.onDetectDataTable();
				}

			}, (err: Response) => {
				this.toastr.error(err.statusText)
			});

		} else if (this.isModified == 'R') {
			this.manageService.updateQuestion(this.QuestionFG.value).subscribe(() => {
				this.toastr.success('อัพเดทข้อมูลสำเร็จ!');
				let q: Question = this.QuestionFG.get('question').value;
				this.QuestionList
					.filter(x => x.id == q.id)
					.map(x => {
						x.question = q.question;
						x.imgName = q.imgName;
					});
				this.onComplete();
			}, (err: Response) => {
				this.toastr.error(err.statusText)
			});
		}
	}

	onUpdateQuestionSet() {
		console.log(this.QuestionFG);
		
		// const fg = this.QuestionFG.value;
		// const from = {
		// 	id: fg.id,
		// 	questionSet: fg.questionSet,
		// 	timeOut: fg.timeOut,
		// 	updateUserPosi: this.updateUserPosi
		// }
		// this.manageService.updateQuestionSet(from).subscribe(() => {
		// 	this.toastr.success('อัพเดทข้อมูลสำเร็จ!');
		// }, (err: Response) => {
		// 	this.toastr.error(err.statusText);
		// });
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
		this.Question = this.question;
		this.Question.reset(this.createQuestionFrom());
		this.Choices = this.choice;
		while (this.Choices.length !== 0) {
			this.Choices.removeAt(0)
		}
		this.Choices.push(this.createChoice())
		this.Answer = new Array<answerModel>();
	}
}
