import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-subtraction-component',
  templateUrl: './subtraction.component.html'
})
export class SubtractionComponent {
  public questionaires: Questionaire[];
  public totalCorrectAnswerCount: number = 0;
  public startTime: Date;
  public endTime: Date;
  public totalTime: number;
  public totalProgressPercentage: number = 0;
  public http: HttpClient;
  public baseUrl: string;
  public totalItems: number;
  public isQuizCompleted: boolean = false;
  public resultsArray: Array<any>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, public db: AngularFirestore) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  onDifficultyChanged(difficulty) {
    this.startTime = new Date();

    this.http.get<Questionaire[]>(this.baseUrl + 'api/Questionaire/Subtraction/' + difficulty + '/' + this.totalItems).subscribe(result => {
      this.isQuizCompleted = false;
      this.totalCorrectAnswerCount = 0;
      this.totalProgressPercentage = 0;
      this.questionaires = result;
      this.resultsArray = [];
    }, error => console.error(error));
  }

  tallyCorrectAnswers(answerObj) {
    this.totalCorrectAnswerCount += answerObj.points;
    this.totalProgressPercentage = Math.round((this.totalCorrectAnswerCount * 100) / this.questionaires.length);
    this.resultsArray.push(answerObj);
    if (this.totalCorrectAnswerCount == this.questionaires.length) {
      this.endTime = new Date();
      this.totalTime = Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 60000);
      this.isQuizCompleted = true;
    }
  }

  onSave() {
    for (let result in this.resultsArray) {
      this.db.collection('subtraction-results').add(this.resultsArray[result]);
    }
    this.isQuizCompleted = false;
  }
}

interface Questionaire {
  id: number;
  operand: string;
  upperValue: number;
  lowerValue: number;
  answerValue: number;
}

