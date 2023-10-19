export class QuizScore {
  //   constructor({ correct = 0, incorrect = 0, score = 0 } = {}) {
  //     this.correct = correct;
  //     this.incorrect = incorrect;
  //     this.score = score;
  //   }

  constructor(initialScore = { correct: 0, incorrect: 0, score: 0 }) {
    this.correct = initialScore.correct;
    this.incorrect = initialScore.incorrect;
    this.score = initialScore.score;
  }

  update(isCorrect) {
    if (isCorrect) {
      this.correct += 1;
    } else {
      this.incorrect += 1;
    }
  }

  // Method to get an object representation of the class
  toObject() {
    return {
      correct: this.correct,
      incorrect: this.incorrect,
      score: this.score,
    };
  }
}
