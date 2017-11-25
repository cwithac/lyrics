
//======================================================================//
//Window Onload Function START
$(function() {
//======================================================================//

//======================================================================//
// JQUERY GLOBAL VARIABLES
//======================================================================//

//HEADER
  $player1Score = $('#score1'); // Score paragraph for player 1
  $player1Name = $('#p1Name'); // Name placeholder for player 1
  $player1Input = $('#inputP1'); // Name input for player 1
  $submitButtonP1 = $('#checkP1'); // Submit Button for player 1
  $player2Score = $('#score2'); // Score paragraph for player 2
  $player2Name = $('#p2Name'); // Name placeholder for player 2
  $player2Input = $('#inputP2'); // Name input for player 1
  $submitButtonP2 = $('#checkP2'); // Submit Button for player 2

//MAIN BODY
  $questionsContainer = $('#container'); // Container section for both P1 and P2 questions
  $mainLogo = $('#main-logo') // Central image of logo
  $player1Question = $('#p1-questions') // P1 question
  $player2Question = $('#p2-questions') // P2 question

    //LEVELS CONTENT
      $star1 = $('#star1')
      $star2 = $('#star2')
      $star3 = $('#star3')
      $star4 = $('#star4')
      $star5 = $('#star5')
      $levelStars = $('#levels')

//FOOTER NAV
  $startGame = $('#start-game'); // Start Game
  $howToPlay = $('#how-to-play'); // How to Play
  $resetGame = $('#reset-game'); // Reset Game
  $turns = $('#turns'); // Turn Counter Div

    //HOW TO PLAY CONTENT
      $howToPlayBox = $('<div>').attr('id', 'howTo');
      $howToPlayHeader = $('<h4>').text("Finish the Hamilton Lyric...");
      $howToPlayText = $('<p>').text("Select the next lyric in the song from the choices available.  Each correct answer will earn one point, each round consisting of a turn for both players.  The winner is determined by the highest score at the end of the game.");
      $levelsDefinedText = $('<p>').text("Choose a \u2605 to select a number of rounds, from \u2605 three rounds up to \u2605 \u2605 \u2605 \u2605 \u2605 twenty.  There will be six rounds if no selection is made.");
      $closeButton = $('<div>').attr('id', 'close').text("close");

//======================================================================//
// GLOBAL PLAYER AND GAME VARIABLES EXCLUSIVE TO QUESTIONS
//======================================================================//

//Player Variables
  var scorePlayer1 = 0; // Base score P1
  var scorePlayer2 = 0; // Base score P2

//Game Variables
  var rounds = 0; // P1 + P2 turn = 1R
  var levelChosen = 12; // Default if no level chosen

//======================================================================//
// QUESTIONS DATABASE
//   - Questions Array
//   - Random Number Generator
//======================================================================//

//Questions (total 46)
//See ReadMe for resources for lyrics (some choices are not valid lyrics)
//ORGANIZATION : //question - Opening Lyric //choices - Array of possible secondary lyrics //correctAnswer - Content of correct answer //fromSong - Track listing of song title.
var questions = [
  { question: "The world's gonna know your name. What’s your name, man?",
    choices: ["Alexander Hamilton.  My name is Alexander Hamilton.", "Aaron Burr.  My name is Aaron Burr.", "George Washington.  My name is George Washington."],
    correctAnswer: "Alexander Hamilton.  My name is Alexander Hamilton.",
    fromSong: "Alexander Hamilton"
  },
  { question: "Show time! Show time! Yo!",
    choices: ["Oui oui, mon ami, je m’appelle Lafayette!", "Brrrah brraaah! I am Hercules Mulligan", "I’m John Laurens in the place to be!"],
    correctAnswer: "I’m John Laurens in the place to be!",
    fromSong: "Aaron Burr, Sir"
  },
  { question: "Hey yo, I’m just like my country...",
    choices: ["I am not throwing away my shot!", "It’s time to take a shot!", "I’m young, scrappy and hungry..."],
    correctAnswer: "I’m young, scrappy and hungry...",
    fromSong: "My Shot"
  },
  { question: "Raise a glass to freedom...",
    choices: ["No matter what they tell you.", "Something they can never take away.", "Raise a glass to the four of us."],
    correctAnswer: "Something they can never take away.",
    fromSong: "The Story of Tonight"
  },
  { question: "Angelica!  Eliza!",
    choices: ["And Peggy!", "And Maria!", "And Theodosia!"],
    correctAnswer: "And Peggy!",
    fromSong: "The Schuyler Sisters"
  },
  { question: "Chaos and bloodshed are not a solution...",
    choices: ["They’re playing a dangerous game.", "Don’t let them lead you astray.", "They have not your interests at heart."],
    correctAnswer: "Don’t let them lead you astray.",
    fromSong: "Farmer Refuted"
  },
  { question: "You say, the price of my love’s not a price that you’re willing to pay.",
    choices: ["You cry, in your tea which you hurl in the sea when you see me go by.", "You say our love is draining and you can’t go on.", "Remember we made an arrangement when you went away"],
    correctAnswer: "You cry, in your tea which you hurl in the sea when you see me go by.",
    fromSong: "You'll Be Back"
  },
  { question: "Head full of fantasies of dyin’ like a martyr?",
    choices: ["I was just like you when I was younger.", "It’s alright, you want to fight, you’ve got a hunger.", "Dying is easy, young man. Living is harder."],
    correctAnswer: "Dying is easy, young man. Living is harder.",
    fromSong: "Right Hand Man"
  },
  { question: "Martha Washington named her feral tomcat after him!",
    choices: ["That’s false!", "That’s true!", "What do you mean?"],
    correctAnswer: "That’s true!",
    fromSong: "A Winter's Ball"
  },
  { question: "Laughin’ at my sister as she’s dazzling the room...",
    choices: ["Then you walked in and my heart went BOOM!", "If it takes fighting a war for us to meet, it will have been worth it.", "I’m just sayin’, if you really loved me, you would share him."],
    correctAnswer: "Then you walked in and my heart went BOOM!",
    fromSong: "Helpless"
  },
  { question: "The feeling of freedom, of seein’ the light...",
    choices: ["He’s penniless, he’s flying by the seat of his pants.", "So I’m the oldest and the wittiest and the gossip in New York City is insidious.", "It’s Ben Franklin with a key and a kite! You see it, right?"],
    correctAnswer: "It’s Ben Franklin with a key and a kite! You see it, right?",
    fromSong: "Satisfied"
  },
  { question: "If you love this woman, go get her! What are you waiting for?",
    choices: ["Congrats again, Alexander. Smile more.", "I’ll see you on the other side of the war.", "She’s married to a British officer?"],
    correctAnswer: "I’ll see you on the other side of the war.",
    fromSong: "The Story of Tonight (Reprise)"
  },
  { question: "Love doesn't discriminate...",
    choices: ["Between the sinners and the saints...", "And we make our mistakes.", "I’m willing to wait for it."],
    correctAnswer: "Between the sinners and the saints...",
    fromSong: "Wait For It"
  },
  { question: "We pick and choose our battles and places to take a stand, And ev’ry day...",
    choices: ["We write essays against slavery.", "Sir, entrust me with a command.", "Stay alive ‘til this horror show is past."],
    correctAnswer: "Sir, entrust me with a command.",
    fromSong: "Stay Alive"
  },
  { question: "This is commonplace, ‘specially ‘tween recruits...",
    choices: ["Number eight!", "Confess your sins. Ready for the moment.", "Most disputes die, and no one shoots."],
    correctAnswer: "Most disputes die, and no one shoots.",
    fromSong: "Ten Duel Commandments"
  },
  { question: "Go home, Alexander.",
    choices: ["My name’s been through a lot, I can take it.", "Or you could die and we need you alive.", "That’s an order from your commander."],
    correctAnswer: "That’s an order from your commander.",
    fromSong: "Meet Me Inside"
  },
  { question: "And if this child...",
    choices: ["But I’m not afraid...", "Shares a fraction of your smile...", "In the story they will write someday..."],
    correctAnswer: "Shares a fraction of your smile...",
    fromSong: "That Would Be Enough"
  },
  { question: "Ev’ryone give it up for America’s favorite fighting Frenchman!",
    choices: ["Lafayette!", "Hamilton!", "Madison!"],
    correctAnswer: "Lafayette!",
    fromSong: "Guns and Ships"
  },
  { question: "I was younger than you are now...",
    choices: ["When I was given my first command.", "I made every mistake...", "When I was young and dreamed of glory."],
    correctAnswer: "When I was given my first command.",
    fromSong: "History Has Its Eyes On You"
  },
  { question: "To my brother's revolutionary covenant...",
    choices: ["Hercules Mulligan, I need no introduction.", "I’m runnin’ with the Sons of Liberty and I am lovin’ it!", "I take their measurements, information and then I smuggle it."],
    correctAnswer: "I’m runnin’ with the Sons of Liberty and I am lovin’ it!",
    fromSong: "Yorktown (The World Turned Upside Down)"
  },
  { question: "What comes next?",
    choices: ["Awesome. Wow.", "You’re on your own.", "You’ve been freed."],
    correctAnswer: "You’ve been freed.",
    fromSong: "What Comes Next?"
  },
  { question: "We’ll bleed and fight for you, we’ll make it right for you...",
    choices: ["Yeah, you’ll blow us all away.", "When you smile, I fall apart.", "If we lay a strong enough foundation..."],
    correctAnswer: "If we lay a strong enough foundation...",
    fromSong: "Dear Theodosia"
  },
  { question: "Why do you write like you’re running out of time?",
    choices: ["Write day and night like you’re running out of time?", "Keep on fighting in the meantime.", "Why do you assume you’re the smartest in the room?"],
    correctAnswer: "Write day and night like you’re running out of time?",
    fromSong: "Non-Stop"
  },
  { question: "There’s a letter on my desk from the President...",
    choices: ["Headin’ to New York!", "Haven’t even put my bags down yet.", "Thomas Jefferson’s coming home!"],
    correctAnswer: "Haven’t even put my bags down yet.",
    fromSong: "What'd I Miss"
  },
  { question: "Thomas, that was a real nice declaration...",
    choices: ["Welcome to the present, we’re running a real nation.", "Don’t tax the South cuz we got it made in the shade.", "Are you ready for a cabinet meeting?"],
    correctAnswer: "Welcome to the present, we’re running a real nation.",
    fromSong: "Cabinet Battle #1"
  },
  { question: "Your favorite older sister Angelica reminds you...",
    choices: ["I know your work’s important but I’m crossing the ocean and I just can’t wait.", "Tell my wife John Adams doesn’t have a real job anyway.", "There’s someone in your corner all the way across the sea."],
    correctAnswer: "There’s someone in your corner all the way across the sea.",
    fromSong: "Take A Break"
  },
  { question: "I know you are a man of honor...",
    choices: ["I don’t know how to say no to this.", "I’m so sorry to bother you at home.", "I hope this letter finds you in good health."],
    correctAnswer: "I’m so sorry to bother you at home.",
    fromSong: "Say No To This"
  },
  { question: "And here’s the pièce de résistance:",
    choices: ["No one else was in the room where it happened.", "Madison is grappling with the fact that not ev’ry issue can be settled by committee.", "Click-boom then it happened."],
    correctAnswer: "No one else was in the room where it happened.",
    fromSong: "The Room Where It Happens"
  },
  { question: "Look! Grandpa’s in the paper!",
    choices: ["Daddy’s gonna find out any minute.", "No one knows who you are or what you do.", "War hero Philip Schuyler loses senate seat to young upstart Aaron Burr."],
    correctAnswer: "War hero Philip Schuyler loses senate seat to young upstart Aaron Burr.",
    fromSong: "Schuyler Defeated"
  },
  { question: "He knows nothing of loyalty...",
    choices: ["A game of chess, where France is Queen and Kingless.", "Smells like new money, dresses like fake royalty.", "If we try to fight in every revolution in the world, we never stop."],
    correctAnswer: "Smells like new money, dresses like fake royalty.",
    fromSong: "Cabinet Battle #2"
  },
  { question: "It must be nice, it must be nice...",
    choices: ["The ink hasn’t dried.", "To have Washington on your side.", "Look in his eyes!"],
    correctAnswer: "To have Washington on your side.",
    fromSong: "Washington On Your Side"
  },
  { question: "Let’s take a break tonight...",
    choices: ["And then we’ll teach them how to say goodbye.", "I wanna talk about what I have learned.", "Mr. President, they will say you’re weak."],
    correctAnswer: "And then we’ll teach them how to say goodbye.",
    fromSong: "One Last Time"
  },
  { question: "What was it, eighty-five?",
    choices: ["Oceans rise, empires fall...", "They will tear each other into pieces.", "That poor man, they’re gonna eat him alive!"],
    correctAnswer: "That poor man, they’re gonna eat him alive!",
    fromSong: "I Know Him"
  },
  { question: "Jefferson’s the runner-up...",
    choices: ["Destroy his reputation?", "Which makes him the Vice President.", "Let’s let him know what we know."],
    correctAnswer: "Which makes him the Vice President.",
    fromSong: "The Adams Administration"
  },
  { question: "If I can prove that I never broke the law...",
    choices: ["Do you promise not to tell another soul what you saw?", "But my papers are orderly!", "That’s when Reynolds extorted me."],
    correctAnswer: "Do you promise not to tell another soul what you saw?",
    fromSong: "We Know"
  },
  { question: "For just a moment...",
    choices: ["A yellow sky.", "Wait for it, wait for it...", "I wrote my way to revolution."],
    correctAnswer: "A yellow sky.",
    fromSong: "Hurricane"
  },
  { question: "Well, he’s never gon’ be President now...",
    choices: ["Never gon’ be President now.", "Highlights!", "You ever see somebody ruin their own life?"],
    correctAnswer: "Never gon’ be President now.",
    fromSong: "The Reynolds Pamphlet"
  },
  { question: "Do you know what Angelica said when she read what you’d done?",
    choices: ["She said you have married an Icarus. He has flown too close to the sun.", "You built me palaces out of paragraphs.", "She said be careful with that one, love he will do what it takes to survive."],
    correctAnswer: "She said you have married an Icarus. He has flown too close to the sun.",
    fromSong: "Burn"
  },
  { question: "This is my very first duel...",
    choices: ["Where is this happening?", "Philip, your mother can’t take another heartbreak.", "They don’t exactly cover this subject in boarding school."],
    correctAnswer: "They don’t exactly cover this subject in boarding school.",
    fromSong: "Blow Us All Away"
  },
  { question: "Un deux trois quatre...",
    choices: ["Cinq six sept huit neuf.", "I would always change the line.", "Stay alive..."],
    correctAnswer: "Cinq six sept huit neuf.",
    fromSong: "Stay Alive (Reprise)"
  },
  { question: "If you see him in the street, walking by her side, talking by her side, have pity.",
    choices: ["They are going through the unimaginable.", "That would be enough.", "Forgiveness. Can you imagine?"],
    correctAnswer: "They are going through the unimaginable.",
    fromSong: "It's Quiet Uptown"
  },
  { question: "Why?",
    choices: ["Hamilton’s on your side.", "Because I’m the President.", "Jefferson has my vote."],
    correctAnswer: "Because I’m the President.",
    fromSong: "The Election of 1800"
  },
  { question: "Careful how you proceed, good man...",
    choices: ["Intemperate indeed, good man.", "Burr, your grievance is legitimate.", "I have the honor to be Your Obedient Servant."],
    correctAnswer: "Intemperate indeed, good man.",
    fromSong: "Your Obedient Servant"
  },
  { question: "Come back to sleep.",
    choices: ["This meeting’s at dawn.", "I have an early meeting out of town.", " I just need to write something down."],
    correctAnswer: "This meeting’s at dawn.",
    fromSong: "Best of Wives and Best of Women"
  },
  { question: "I imagine death so much it feels more like a memory.",
    choices: ["If I throw away my shot, is this how you’ll remember me?", "Is this where it gets me, on my feet, several feet ahead of me?", "What if this bullet is my legacy?"],
    correctAnswer: "Is this where it gets me, on my feet, several feet ahead of me?",
    fromSong: "The World Was Wide Enough"
  },
  { question: "Can I show you what I’m proudest of?",
    choices: ["I raise funds in D.C. for the Washington Monument.", "I speak out against slavery.", "The orphanage."],
    correctAnswer: "The orphanage.",
    fromSong: "Who Lives, Who Dies, Who Tells Your Story"
  }
];

//Question Trackers
        var questionCounter = []; //Array of correct answers available (not chosen by player) as a choice is made.
        var randomCounter = []; //End content after shuffleRandomArray();

//Random Questions
    //*Shuffle Functionality - 'Sorting an Array in Random Order': https://www.w3schools.com/js/js_array_sort.asp
    //Creates an array of numbers 0-45 and shuffles them upon click of 'start' to create 'random'
    var shuffleRandomArray = function() {
      for (var i = 0; i < questions.length; i++) {
        randomCounter.push(i);
      } randomCounter.sort(function(a, b){return 0.5 - Math.random()});
    };
    //As each question appears, removes the first number from randomCounter and applies its index.
    var shiftArray = function() {
      randNum = randomCounter.shift();
    };

//======================================================================//
//PLAYER TURN FUNCTIONS
//======================================================================//

//Player 1
//Generates random question and associated answers and appends to P1's side of the section.
var playerOneTurn = function() {
    // console.log("playerOneTurn function has been called."); //confirms function has been initalized
  $player1Question.removeClass('hidden')
  $player1Question.empty();
  $player2Question.removeClass('hidden')
  $player1Question.empty();
  shiftArray();
  var randomQuestionP1 = questions[randNum].question;
  var randomChoicesP1 = questions[randNum].choices;
  var randomFromSongP1 = questions[randNum].fromSong;
    $songTitle = $('<p>').text("Track: " + randomFromSongP1).attr('class', 'track'); //Song Title
      $player1Question.append($songTitle);
    $questionAsked = $('<h2>').text(randomQuestionP1).attr('class', 'question'); //Question Asked
      $player1Question.append($questionAsked);
    $answerUL = $('<ul>')
    $answerIndex0 = $('<li>').text(randomChoicesP1[0]).attr('class', 'answer'); // Answer 1
    $answerIndex1 = $('<li>').text(randomChoicesP1[1]).attr('class', 'answer'); // Answer 2
    $answerIndex2 = $('<li>').text(randomChoicesP1[2]).attr('class', 'answer'); // Answer 3
      $player1Question.append($answerUL)
      $answerUL.append($answerIndex0);
      $answerUL.append($answerIndex1);
      $answerUL.append($answerIndex2);
      $answerIndex0.on('click', checkForCorrectP1);
      $answerIndex1.on('click', checkForCorrectP1);
      $answerIndex2.on('click', checkForCorrectP1);
  };

//Player 2
//Generates random question and associated answers and appends to P1's side of the section.
var playerTwoTurn = function() {
  // console.log("playerTwoTurn function has been called."); //confirms function has been initalized
  $resetGame.on('click', resetGame);
  shiftArray();
  var randomQuestionP2 = questions[randNum].question;
  var randomChoicesP2 = questions[randNum].choices;
  var randomFromSongP2 = questions[randNum].fromSong;
    $songTitle = $('<p>').text("Track: " + randomFromSongP2).attr('class', 'track'); //Song Title
      $player2Question.append($songTitle);
    $questionAsked = $('<h2>').text(randomQuestionP2).attr('class', 'question'); //Question Asked
      $player2Question.append($questionAsked);
    $answerUL = $('<ul>')
    $answerIndex0 = $('<li>').text(randomChoicesP2[0]).attr('class', 'answer'); // Answer 1
    $answerIndex1 = $('<li>').text(randomChoicesP2[1]).attr('class', 'answer'); // Answer 2
    $answerIndex2 = $('<li>').text(randomChoicesP2[2]).attr('class', 'answer'); // Answer 3
      $player2Question.append($answerUL)
      $answerUL.append($answerIndex0);
      $answerUL.append($answerIndex1);
      $answerUL.append($answerIndex2);
      $answerIndex0.on('click', checkForCorrectP2);
      $answerIndex1.on('click', checkForCorrectP2);
      $answerIndex2.on('click', checkForCorrectP2);
  };

//======================================================================//
//PLAYER 1 AND 2 ACTION FUNCTIONS
// - Check for Correct, - Input Name, - Select Level
//======================================================================//

//Validates if P1's answer is correct and applies changes to gameboard.
//off('click') eliminates ability to select more than one answer.
var checkForCorrectP1 = function() {
  // console.log("checkForCorrectP1 function has been called.");
  var randomCorrectAnswerP1 = questions[randNum].correctAnswer;
    if (($(this).text()) === randomCorrectAnswerP1) { //Correct Answer
        questionCounter.push(randomCorrectAnswerP1);
        scorePlayer1++
        $player1Score.text(scorePlayer1)
        $theCorrectAnswerIs = $('<div>').attr('id', 'answers').text("Correct!");
    } else { //Incorrect Answer
        questionCounter.push(randomCorrectAnswerP1);
        $theCorrectAnswerIs = $('<div>').attr('id', 'answers').text("Incorrect!  The correct answer is: ");
  }
    //Actions regardless of answer's validity
    $player1Question.append($theCorrectAnswerIs);
    $theCorrectAnswerIs.append($('<h3>').attr('class', 'correctP1').text(randomCorrectAnswerP1));
    $answerIndex0.off('click', checkForCorrectP1);
    $answerIndex1.off('click', checkForCorrectP1);
    $answerIndex2.off('click', checkForCorrectP1);
    $resetGame.off('click', resetGame);
    var delayPlayerTwo = function() { //3 Second Delay to show correct answer before switching to Player 2.
      $player1Question.empty();
      playerTwoTurn();
    };
    setTimeout(delayPlayerTwo, 3000);
};

//Validates if P2's answer is correct and applies changes to gameboard.
//off('click') eliminates ability to select more than one answer.
var checkForCorrectP2 = function() {
  // console.log("checkForCorrectP2 function has been called.");
  var randomCorrectAnswerP2 = questions[randNum].correctAnswer;
    if (($(this).text()) === randomCorrectAnswerP2) { //Correct Answer
        questionCounter.push(randomCorrectAnswerP2);
        scorePlayer2++
        $player2Score.text(scorePlayer2);
        $theCorrectAnswerIs = $('<div>').attr('id', 'answersP2').text("Correct!");
    } else { //Incorrect Answer
        questionCounter.push(randomCorrectAnswerP2);
        $theCorrectAnswerIs = $('<div>').attr('id', 'answersP2').text("Incorrect!  The correct answer is: ");
  }
    //Actions regardless of answer's validity
    rounds++; // Rounds only increase after player 2
    $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
    $player2Question.append($theCorrectAnswerIs);
    $theCorrectAnswerIs.append($('<h3>').attr('class', 'correctP2').text(randomCorrectAnswerP2));
    $answerIndex0.off('click', checkForCorrectP2);
    $answerIndex1.off('click', checkForCorrectP2);
    $answerIndex2.off('click', checkForCorrectP2);
    $resetGame.off('click', resetGame);
    var delayPlayerOne = function() { //3 Second Delay to show correct answer before sending to evalWinner
      $player2Question.empty();
      evalWinner();
    };
    setTimeout(delayPlayerOne, 2000);
};

    //======================================================================//
    //NAME INPUT (Player 1 and Player 2 are default)
    //======================================================================//
    //P1
    $submitButtonP1.on('click', function() {
      var $p1Name = $player1Input.val();
      console.log($p1Name);
      $player1Name.html($p1Name + "'s Score");
    });
    //P2
    $submitButtonP2.on('click', function() {
      var $p2Name = $player2Input.val();
      console.log($p2Name);
      $player2Name.html($p2Name + "'s Score");
    });
    //======================================================================//
    //SELECT LEVEL (Level 2 is default)
    //======================================================================//
      //Hover Levels allow for update of content without selection, sets to levelDefault with mouse off.
      var levelDefault = function() { //Default Level (for mouse off)
        $star1.removeClass('starsEnd');
        $star2.removeClass('starsEnd');
        $star3.removeClass('starsEnd');
        $star4.removeClass('starsEnd');
        $star5.removeClass('starsEnd');
        $star1.attr('class', 'stars');
        $star2.attr('class', 'stars');
        $star3.attr('class', 'stars');
        $star4.attr('class', 'stars');
        $star5.attr('class', 'stars');
        levelChosen = 12;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
      }
      var levelOne = function() { //Level One - 1 Star
        $star1.attr('class', 'starsEnd');
        $star2.removeClass('starsEnd');
        $star3.removeClass('starsEnd');
        $star4.removeClass('starsEnd');
        $star5.removeClass('starsEnd');
        $star2.addClass('stars');
        $star3.addClass('stars');
        $star4.addClass('stars');
        $star5.addClass('stars');
        levelChosen = 6;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
        $star1.off('mouseleave', levelDefault)
        $star2.off('mouseleave', levelDefault)
        $star3.off('mouseleave', levelDefault)
        $star4.off('mouseleave', levelDefault)
        $star5.off('mouseleave', levelDefault)
      }
      var levelOneHover = function() {
        $star1.attr('class', 'starsEnd');
        levelChosen = 6;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
      }
      var levelTwo = function() { //Level Two - 2 Stars
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        $star3.removeClass('starsEnd');
        $star4.removeClass('starsEnd');
        $star5.removeClass('starsEnd');
        $star3.addClass('stars');
        $star4.addClass('stars');
        $star5.addClass('stars');
        levelChosen = 12;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
        $star1.off('mouseleave', levelDefault)
        $star2.off('mouseleave', levelDefault)
        $star3.off('mouseleave', levelDefault)
        $star4.off('mouseleave', levelDefault)
        $star5.off('mouseleave', levelDefault)
      }
      var levelTwoHover = function() {
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        levelChosen = 12;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
      }
      var levelThree = function() { //Level Three - 3 Stars
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        $star3.attr('class', 'starsEnd');
        $star4.removeClass('starsEnd');
        $star5.removeClass('starsEnd');
        $star4.addClass('stars');
        $star5.addClass('stars');
        levelChosen = 20;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
        $star1.off('mouseleave', levelDefault)
        $star2.off('mouseleave', levelDefault)
        $star3.off('mouseleave', levelDefault)
        $star4.off('mouseleave', levelDefault)
        $star5.off('mouseleave', levelDefault)
      }
      var levelThreeHover = function() {
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        $star3.attr('class', 'starsEnd');
        levelChosen = 20;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
      }
      var levelFour = function() { //Level Four - 4 Stars
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        $star3.attr('class', 'starsEnd');
        $star4.attr('class', 'starsEnd');
        $star5.removeClass('starsEnd');
        $star5.addClass('stars');
        levelChosen = 30;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
        $star1.off('mouseleave', levelDefault)
        $star2.off('mouseleave', levelDefault)
        $star3.off('mouseleave', levelDefault)
        $star4.off('mouseleave', levelDefault)
        $star5.off('mouseleave', levelDefault)
      }
      var levelFourHover = function() {
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        $star3.attr('class', 'starsEnd');
        $star4.attr('class', 'starsEnd');
        levelChosen = 30;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
      }
      var levelFive = function() { //Level Five - 5 Stars
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        $star3.attr('class', 'starsEnd');
        $star4.attr('class', 'starsEnd');
        $star5.attr('class', 'starsEnd');
        levelChosen = 40;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
        $star1.off('mouseleave', levelDefault)
        $star2.off('mouseleave', levelDefault)
        $star3.off('mouseleave', levelDefault)
        $star4.off('mouseleave', levelDefault)
        $star5.off('mouseleave', levelDefault)
      }
      var levelFiveHover = function() {
        $star1.attr('class', 'starsEnd');
        $star2.attr('class', 'starsEnd');
        $star3.attr('class', 'starsEnd');
        $star4.attr('class', 'starsEnd');
        $star5.attr('class', 'starsEnd');
        levelChosen = 40;
        $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
      }
      var starFunctions = function() { // Allows scrolling stars prior to selection
        $star1.on('click', levelOne)
        $star1.on('mouseover', levelOneHover)
        $star1.on('mouseleave', levelDefault)
        $star2.on('click', levelTwo)
        $star2.on('mouseover', levelTwoHover)
        $star2.on('mouseleave', levelDefault)
        $star3.on('click', levelThree)
        $star3.on('mouseover', levelThreeHover)
        $star3.on('mouseleave', levelDefault)
        $star4.on('click', levelFour)
        $star4.on('mouseover', levelFourHover)
        $star4.on('mouseleave', levelDefault)
        $star5.on('click', levelFive)
        $star5.on('mouseover', levelFiveHover)
        $star5.on('mouseleave', levelDefault)
      }
        starFunctions(); // Turns on starFunctions function

//======================================================================//
//GAME EVAL AND WINNER FUNCTIONS
  // - evalWinner, - checkWinner
//======================================================================//

//Evaluates if a winner can be found or if the game needs to continue
var evalWinner = function() {
  // console.log("evalWinner function has been called.");
  if (questionCounter.length < levelChosen) { // If all rounds have not been completed
    playerOneTurn();
  } else { // If level rounds have been completed
    checkWinner();
  }
};
//Determins and announces winner
var checkWinner = function() {
  // console.log("checkWinner function has been called.");
  var $p1Name = $player1Input.val();
  var $p2Name = $player2Input.val();
    if (($p1Name.length > 0) || ($p2Name.length > 0)) { //If a name has been input, use name.
        $resetGame.on('click', resetGame);
        if (scorePlayer1 > scorePlayer2){
          $endGameNotif = $('<h3>').text($p1Name + " has won the game!")
          $questionsContainer.after($endGameNotif);
        } else if (scorePlayer2 > scorePlayer1) {
          $endGameNotif = $('<h3>').text($p2Name + " has won the game!")
          $questionsContainer.after($endGameNotif);
        } else if (scorePlayer1 === scorePlayer2) {
          $endGameNotif = $('<h3>').text("The game is a tie!")
          $questionsContainer.after($endGameNotif);
        } else {
          console.log("Something is wrong with this function.");
        }  $startGame.on('click', startGame);
    } else { //If no name input, default P1 and P2
        $resetGame.on('click', resetGame);
        if (scorePlayer1 > scorePlayer2){
          $endGameNotif = $('<h3>').text("Player 1 has won the game!")
          $questionsContainer.after($endGameNotif);
        } else if (scorePlayer2 > scorePlayer1) {
          $endGameNotif = $('<h3>').text("Player 2 has won the game!")
          $questionsContainer.after($endGameNotif);
        } else if (scorePlayer1 === scorePlayer2) {
          $endGameNotif = $('<h3>').text("The game is a tie!")
          $questionsContainer.after($endGameNotif);
        } else {
          console.log("Something is wrong with this function.");
        }  $startGame.on('click', startGame);
      }
};

//======================================================================//
//RESET GAME
//======================================================================//

//Resets Game, clears all data without refresh.
//Not available during setTimeout between turns
var resetGame = function() {
  // console.log("resetGame function has been called.");
  if (questionCounter.length < (levelChosen/2)) { //If no one has won...
        $player1Question.empty();
        $player2Question.empty();
  } else { //If the game is over and winner has been announced...
    $endGameNotif.remove();
  }
  //Actions regardless of game status
  randomCounter = [];
  questionCounter = [];
  console.log(randomCounter);
  levelChosen = 12;
  rounds = 0;
  $turns.text("Total Rounds: " + rounds + " / " + (levelChosen/2));
  scorePlayer1 = 0;
  $player1Score.text(scorePlayer1)
  scorePlayer2 = 0;
  $player2Score.text(scorePlayer2);
  $player1Question.addClass('hidden').empty();
  $player2Question.addClass('hidden').empty();
  $mainLogo.removeClass('hidden');
  $howToPlayBox.addClass('hidden')
  var $p1Name = $player1Input.val();
  $('form').trigger('reset')
  $player1Input.removeClass('hidden')
  $player2Input.removeClass('hidden')
  $submitButtonP1.removeClass('hidden')
  $submitButtonP2.removeClass('hidden')
  $player1Name.html("Player 1's Score");
  $player2Name.html("Player 2's Score");
  $startGame.on('click', startGame);
  $levelStars.remove();
  $levelStars.insertAfter('#nav');
  $star1.removeClass('starsEnd');
  $star2.removeClass('starsEnd');
  $star3.removeClass('starsEnd');
  $star4.removeClass('starsEnd');
  $star5.removeClass('starsEnd');
  $star1.addClass('stars');
  $star2.addClass('stars');
  $star3.addClass('stars');
  $star4.addClass('stars');
  $star5.addClass('stars');
  starFunctions();
};

//Listener for resetGame Function
$resetGame.on('click', resetGame);

//======================================================================//
//HOW TO PLAY
//======================================================================//

//Reveals HowToPlay content
var howToPlayGame = function() {
  // console.log("howToPlayGame has been called.");
  $howToPlayBox.removeClass('hidden')
  $questionsContainer.append($howToPlayBox);
  $howToPlayBox.append($howToPlayHeader);
  $howToPlayBox.append($howToPlayText);
  $howToPlayBox.append($levelsDefinedText);
  $howToPlayBox.append($closeButton);
  var closeHowTo = function() {
    $howToPlayBox.addClass('hidden');
  };
  $closeButton.on('click', closeHowTo);
};

//Listener for howToPlayGame Function
$howToPlay.on('click', howToPlayGame);

//======================================================================//
//START GAME
//======================================================================//

//StartGame
var startGame = function() {
  // console.log("startGame function has been called.");
  $startGame.off('click', startGame);
  $mainLogo.addClass('hidden');
  $howToPlayBox.addClass('hidden')
  $player1Input.addClass('hidden')
  $player2Input.addClass('hidden')
  $submitButtonP1.addClass('hidden')
  $submitButtonP2.addClass('hidden')
  $levelStars.remove();
  shuffleRandomArray();
  playerOneTurn();
};

//START GAME INITALIZER
//Listener for startGame function
$startGame.on('click', startGame);


//======================================================================//
//Window Onload Function END
});
//======================================================================//
