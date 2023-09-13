import Card from "../components/Card.js";
import ProgressBar from "../components/ProgressBar.js";
import GameTimer from "../components/GameTimer.js";
export default class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: "QuizScene" });
  }

  preload() {}

  create() {
    this.gameOver = false;

    // Configuration parameter that represents the duration (or time limit) for each question
    this.questionTimeLimit = 5;
    this.questionTimeLeft = this.questionTimeLimit;

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

    this.createOptionsContainer();

    // Display remaining time
    this.progressbar = new ProgressBar(
      this,
      680,
      60,
      this.questionTimeLeft,
      this.questionTimeLimit
    );

    this.initTimer();

    this.displayQuestion();
    // this.gameLoop();

    this.displayScoreBoard();
  }

  initTimer() {
    console.log("Create timer and start listening on it for a timeout event.");
    this.gameTimer = new GameTimer(this, 680, 60, this.questionTimeLimit);

    this.gameTimer.on("TIMEOUT", () => {
      console.log("Time is up for the question.");
      this.checkAndProceed(-1); // Call a special checkAnswer with -1 to indicate time's up
    });
  }

  displayScoreBoard() {
    this.scoreBoard = this.add.text(500, 10, `Score: ${this.score}`);
  }

  displayQuestion() {
    // Reset the timer
    this.gameTimer.reset();

    const currentQuestion = this.questions[this.currentQuestionIndex];

    // A Card for Question Text
    this.card && this.card.destroy();
    this.card = new Card(this, 100, 300, currentQuestion.question);

    // A Card for each option
    // Removes all Game Objects from this Container, optionally call destroy on each Game Object
    this.optionsContainer.removeAll(true);

    currentQuestion.options.forEach((option, index) => {
      const card = new Card(this, 100, 110 * (index + 1), option);
      this.tweens.add({
        targets: card,
        duration: 5000,
        // x: { randInt: [50, 300] },
        x: 50,
      });
      card.on(
        "pointerdown",
        () => {
          this.checkAndProceed(index); //here "this" refers to scene
        },
        this
      );

      this.addCardToOptionsContainer(card);
    });
  }

  createOptionsContainer() {
    this.optionsContainer = this.add.container(300, 0);
  }

  addCardToOptionsContainer(card) {
    console.log("adding to optionsContainer ");
    this.optionsContainer.add(card);
  }

  hasNextQuestion() {
    return ++this.currentQuestionIndex < this.questions.length;
  }

  isCorrect(selectedIndex) {
    return (
      selectedIndex ===
      this.questions[this.currentQuestionIndex].correctOptionIndex
    );
  }
  checkAndProceed(selectedIndex) {
    if (this.isCorrect(selectedIndex)) {
      this.score++;
      this.scoreBoard.text = `Score: ${this.score}`;
    }

    // Prepare the next question:

    if (this.hasNextQuestion()) {
      // Display the next question
      this.displayQuestion();
    } else {
      // All questions answered, go to results screen
      // console.log("THE END.");
      this.scene.start("ResultsScene", { score: this.score });
    }
  }
}
