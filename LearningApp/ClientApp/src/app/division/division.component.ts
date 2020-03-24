import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-division-component',
  templateUrl: './division.component.html'
})
export class DivisionComponent {
  public questionaires: Questionaire[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Questionaire[]>(baseUrl + 'api/Questionaire/Addition').subscribe(result => {
      this.questionaires = result;
    }, error => console.error(error));
  }
}

interface Questionaire {
  operand: string;
  upperValue: number;
  lowerValue: number;
  answerValue: number;
}
