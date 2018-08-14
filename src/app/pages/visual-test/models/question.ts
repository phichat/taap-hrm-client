import { Choice } from "./choice";
import { FormGroup } from "@angular/forms"

export interface IQuestion {
    QuestionFG: FormGroup,
    QuestionModel: Question,
    OnSubmit()
}

export class Question {
    id: number;
    question: string;
    img: string;
    chioce: Choice[]
}

