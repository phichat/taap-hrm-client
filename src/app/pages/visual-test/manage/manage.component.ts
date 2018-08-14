import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
	selector: 'app-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

	Answer: any[] = [];

	constructor(private fb: FormBuilder) { }

	_choiceFG: FormGroup = this.fb.group({
		id: new FormControl(null),
		choice: new FormControl(null),
		img: new FormControl(null),
		isSelect: new FormControl(null)
	})

	QuestionFG: FormGroup = this.fb.group({
		question: new FormControl(null),
		img: new FormControl(null),
		ChoiceArr: this.fb.array([this._choiceFG])
	})

	get ChoiceArr(): FormArray {
		return this.QuestionFG.get('ChoiceArr') as FormArray;
	}

	ngOnInit() {
		this.ChoiceArr.value.map((item, index) => {
			this.Answer.push({
				value: item.id == null ? 1 : item.id,
				text: item.choice
			})
		});
	}

	addNewChoice() {
		if ((this.ChoiceArr.length + 1) <= 5) {
			this.ChoiceArr.push(this._choiceFG)
		}
	}

	removeChoice(index: number) {
		this.ChoiceArr.removeAt(index)
	}

}
