import { FormControl } from "@angular/forms";

export interface IChoice {
}

export class Choice {
    id: number;
    questionId: number;
    choice: string;
    img: any;
    imgName: string;
    isSelect: boolean;
}