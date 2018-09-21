import { Choice } from "./choice";
import { FormGroup } from "@angular/forms"

export interface IQuestion {
    QuestionFG: FormGroup,
    QuestionModel: Question,
    OnSubmit()
}

export class Question {
   public id: number;
   public questionType: string;
   public question: string;
   public img: any;
   public imgName: string;
   public chioce: Choice[];
   public answer: string;
}

