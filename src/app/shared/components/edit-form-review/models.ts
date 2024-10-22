export class Survey {
  constructor(
    public title: string,
    public code: string,
    public question: Question[],
    public startDate: Date,
    public expireDate: Date,
  ) {}
}

export class Question {
  constructor(
    public Code: string,
    public Title: string,
    public Answers: Option[],
    public Type: string
  ) {}
}

export class Option {
  constructor(public OptionText: string) {}
}
