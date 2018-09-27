import { Choice } from "./choice";
import { FormGroup } from "@angular/forms"

export interface IQuestion {
    QuestionFG: FormGroup,
    QuestionModel: Question,
    OnSubmit()
}

export class QuestionSet {
    public id: number;
    public questionSet: string;
    public timeOut: number;
}

export class QuestionSetModel {
    public questionSetId: number;
    public questionSet: string;
    public timeOut: number;
    public questionList: QuestionListModel[]
}

export class Question {
    public id: number;
    public questionSetId: number;
    public questionSet: string;
    public timeOut: number;
    public question: string;
    public img: any;
    public imgName: string;
    public isActive: number;
    public chioce: Choice[];
    public answer: string;
}

export class QuestionListModel {
    public id: number;
    public question: string;
    public imgName: string;
    public isActive: number;
}