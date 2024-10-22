export class SurveyAnswers {
  constructor(
    //public creatorId: any,
    public Registrator: Register,
    public Questions: Questions[],
    public formReviews: any,
    public isViewed: boolean,
    public viewBy: any,
  ) {}
}

export class Register {
  constructor(
    public FirstName: string,
    public LastName: string,
    public Email: string,
    public Phone: string
  ) {}
}

export class Questions {
  constructor(
    public Code: string,
    public Title: string,
    public UserAnswers: Options[],
    public SelectedAnswers: Options[],
    public Type: string
  ) {}
}

export class Options {
  constructor(public OptionText: string) {}
}
