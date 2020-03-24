import { Component, Inject, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addition-component',
  templateUrl: './addition.component.html'
})
export class AdditionComponent {
  public questionaires: Questionaire[];
  public totalCorrectAnswerCount: number = 0;
  public startTime: Date;
  public endTime: Date;
  public totalTime: number;
  public totalProgressPercentage: number = 0;
  public http: HttpClient;
  public baseUrl: string;
  public totalItems: number;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  onDifficultyChanged(difficulty) {
    this.startTime = new Date();

    this.http.get<Questionaire[]>(this.baseUrl + 'api/Questionaire/Addition/' + difficulty + '/' + this.totalItems).subscribe(result => {
      this.questionaires = result;
    }, error => console.error(error));
  }

  tallyCorrectAnswers(counter) {
    this.totalCorrectAnswerCount += counter;
    this.totalProgressPercentage = Math.ceil((this.totalCorrectAnswerCount * 100) / this.questionaires.length);
    if (this.totalCorrectAnswerCount >= this.questionaires.length) {
      this.endTime = new Date();
      this.totalTime = Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 60000);
    }
  }
}

interface Questionaire {
  id: number;
  operand: string;
  upperValue: number;
  lowerValue: number;
  answerValue: number;
}