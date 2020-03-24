import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'computation-tile',
  templateUrl: './computation-tile.component.html',
  styleUrls: ['./computation-tile.component.css']
})

export class ComputationTileComponent {
  @Input() questionaireKey: number;
  @Input() upperNumber: number;
  @Input() lowerNumber: number;
  @Input() operand: string;
  @Input() answerNumber: number;
  studentAnswer: number;
  @Output() hasAnsweredCorrectlySaved: EventEmitter<any> = new EventEmitter();

  onAnswerSaved(event) {
    if (this.answerNumber == this.studentAnswer) {
      event.target.style = "border:2px #008000 solid";
      event.target.disabled = true;
      this.hasAnsweredCorrectlySaved.emit(1);
    }
    else
      event.target.style = "border:2px #ff1a1a solid"
  }

  onAnswerChanged(event) {
    event.target.disabled = false;
  }
}
