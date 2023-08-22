export default class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: "QuizScene" });
  }

  preload() {}

  create() {
    // Load questions and answers from a data source (not shown here)
    this.questions = [
      {
        id: 1,
        category: "Math",
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctOptionIndex: 1,
      },
      {
        id: 2,
        category: "Science",
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctOptionIndex: 0,
      },
      {
        id: 3,
        category: "Math",
        question: "4 * 9 = ?",
        options: [32, 36, 34, 35],
        correctOptionIndex: 1,
      },
      // More questions...
    ]; // An array of question objects

    this.currentQuestionIndex = 0;
    this.score = 0;

    // Remaining time in seconds for each question
    this.remainingTime = 5;

    // Display remaining time
    this.addTimerDisplay();

    // Start the timer
    this.startTimer();

    this.displayQuestion();
    this.displayScoreBoard();
  }

  startTimer() {
    // Create a timer event to update the remaining time every second
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.handleTick,
      callbackScope: this,
      loop: true,
    });
  }

  handleTick() {
    this.remainingTime -= 1;
    console.log(this.remainingTime);

    if (this.remainingTime == 0) {
      // ... (handle time's up)
      this.checkAnswer(-1); // Call a special checkAnswer with -1 to indicate time's up
    }
    this.updateTimerDisplay();
  }

  addTimerDisplay() {
    this.timerText = this.add.text(700, 20, `Time: ${this.remainingTime}`, {
      fontSize: "18px",
      fill: "#FF1493",
    });
  }

  updateTimerDisplay() {
    this.timerText.setText(`Time: ${this.remainingTime}`);
  }

  displayScoreBoard() {
    this.scoreBoard = this.add.text(500, 10, `Score: ${this.score}`);
  }

  displayQuestion() {
    if (this.currentQuestionContainer) {
      this.currentQuestionContainer.destroy(); // Remove previous question container
    }

    this.remainingTime = 5;

    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.currentQuestionContainer = this.add.container(10, 100);

    const questionText = this.add.text(0, -50, currentQuestion.question, {
      fontSize: "24px",
      fill: "#fff",
    });
    this.currentQuestionContainer.add(questionText);

    currentQuestion.options.forEach((option, index) => {
      const button = this.add
        .text(0, index * 50, option, { fontSize: "18px", fill: "#fff" })
        .setInteractive()
        .on("pointerdown", () => {
          this.checkAnswer(index);
        });
      this.currentQuestionContainer.add(button);
    });
  }

  checkAnswer(selectedIndex) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctOptionIndex) {
      this.score++;
      this.scoreBoard.text = `Score: ${this.score}`;
    }

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      // Display the next question
      this.displayQuestion();
    } else {
      // All questions answered, go to results screen
      this.scene.start("ResultsScene", { score: this.score });
    }
  }
}
