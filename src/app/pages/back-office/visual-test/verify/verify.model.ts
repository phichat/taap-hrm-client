export class VerifyModel {
    public id: number;
    public questionSetId: number;
    public questionSet: string;
    public timeOut: number;
    public timeUse: number;
    public userId: number;
    public fullName: string;
    public pass: number;
    public fail: number;
    public total: number;
    public isActive: number;
    public resultDetail: Array<ResultDetail>
}

export class ResultDetail {
    public id: number;
    public testResultId: number;
    public questionId: number;
    public testedQuestion: string;
    public testedAnswer: string;
    public answer: string;
    public result: boolean;
}