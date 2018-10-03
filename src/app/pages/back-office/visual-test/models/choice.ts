import { FormControl } from "@angular/forms";

export interface IChoice {
}

export class Choice {
    id: number;
    questionId: number;
    choice: string;
    answerChoice: number;
    img: any;
    imgName: string;
    isSelect: boolean;
}