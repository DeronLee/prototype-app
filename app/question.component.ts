import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {IQuestion} from './all.interface';
import {ProgressService} from './services/progress.service';
import {SoundPlayer} from './services/sound-player.service';

@Component({
  selector: 'question',
  template: `
  <div class="row question-header">
    <div class="col-md-5">
      <span class="question-name">Question {{question.position}}</span>
      <a class="btn btn-default btn-sm"><i class="fa fa-play" (click)='playSound()'></i></a>
    </div>
    <div class="col-md-7">
      <div class="navigation-buttons pull-right">
        <a class="btn btn-default" (click)="previousQuestion()"><i class="fa fa-caret-left"></i></a>
        <a class="btn btn-default" (click)="nextQuestion()"><i class="fa fa-caret-right"></i></a>
      </div>
    </div>
  </div>

  <div class="row question-content">
    <div class="col-md-12">
      <p>{{ question.question }}</p>
    </div>
  </div>
  `,
  styles: [`
  .question-name {
    font-size: 1.5em;
    font-weight: bold;
  }

  .question-header {
    margin-bottom: 0.5em;
  }

  .question-content {
    margin-bottom: 2em;
  }
  `]
})
export class QuestionComponent implements OnChanges{
  @Input('question') question: IQuestion;
  private _audio: any;
  constructor(private dataService: ProgressService,
              private soundPlayer: SoundPlayer) {

  }

  playSound() {
    if (!this.question) return;
    this.soundPlayer.play(this.question.audioFile);
  }

  nextQuestion() {
    this.dataService.nextQuestion();
  }

  previousQuestion() {
    this.dataService.previousQuestion();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (changes['question'] != null) {
      setTimeout(() => {
        this.playSound();
      }, 500);
    }
  }

}