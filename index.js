// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
 */
function processFirstItem(stringList, callback) {
    return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *  counter1 uses a fn to create a counter fn and 2 does not,
 * 2. Which of the two uses a closure? How can you tell?
 *  counter1 because it has to look outside of it's function/block scope to find counter definition
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 * when you need to associate data with the fn that uses the data or limit access to that variables data; when the variable needs to be used outside of the fn

 */

// counter1 code
function counterMaker() {
    let count = 0;
    return function counter() {
        count++;
    }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
    return count++;
}


/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */

function inning() {
    return Math.round(Math.random() * 2);
}

// console.log(inning());
/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/
/*
  finalScore takes params callback fn inning and # of innings
  for each inning number generate a score for each team
  add scores per inning up
  returns final score for each team object
*/

function finalScore(callback, inns) {
    const runsHome = [];
    const runsAway = [];
    for (let i = 0; i < inns; i++) {
        runsHome.push(callback());
        runsAway.push(callback());
    }
    const red = (acc, i) => acc + i;
    return {
        'home': runsHome.reduce(red, 0),
        'away': runsAway.reduce(red, 0)
    }
}

// console.log(finalScore(inning, 3));

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

// getInningScore fn
/*
  fn takes params inning and number for inning choice
  fill array with aggregated score for each inning
  get index of inning number in params 
  returns object of inning scores for home and away
*/

// function getInningScore(callback, inn, inns) {
//     const scorePerInnH = [0];
//     const scorePerInnA = [0];
//     for (let i = 0; i < inns; i++) {
//         scorePerInnH.push(scorePerInnH[i] + callback());
//         scorePerInnA.push(scorePerInnA[i] + callback());
//     }
//     return {
//         'home': scorePerInnH[inn],
//         'away': scorePerInnA[inn],
//         // 'score4chk': [
//         //     scorePerInnH,
//         //     scorePerInnA
//         // ]
//     }
// }
// console.log(getInningScore(inning, 2, 3));
/*
  scoreboard takes params two callbacks, inning and getInningScore, and number of innings
  create array of inning scores for home and away
  run callback(getInningScore) for each inning and 
  return obj of inning progression
*/

// function getInningScore(arr, inn) {
//     return [arr[inn].home, arr[inn].away]
// }

// function scoreboard(callbackA, callbackB, inns) {
//     const scoreBoard = {};
//     const scores = [{ 'inning': 0, 'home': 0, 'away': 0 }];
//     for (let i = 1; i <= inns; i++) {
//         scores.push({
//             'inning': i,
//             'home': scores[i - 1]['home'] + callbackA(),
//             'away': scores[i - 1]['away'] + callbackA()
//         });
//     }
//     scores.shift();
//     for (let i = 0; i < scores.length; i++) {
//         scoreBoard['inning' + (i + 1)] = callbackB(scores, i);
//     }
//     const fin = [];
//     for (let i = 0; i < scores.length; i++) {
//         fin.push(`Inning ${i + 1}: Home ${scoreBoard['inning' + (i + 1)][0]} - Away ${scoreBoard['inning' + (i + 1)][1]}`)
//     }
//     // console.log(scoreBoard);
//     return fin;
// }

// console.log(scoreboard(inning, getInningScore, 3));
// scoreboard(inning, getInningScore, 3);

function scoreboard2(callback, inns) {
    const fin = [{ 'inning': 0, 'home': 0, 'away': 0 }];
    for (let i = 0; i < inns; i++) {
        fin.push({
            'inning': i + 1,
            'home': fin[i].home + callback(),
            'away': fin[i].away + callback()
        })
    }
    fin.shift();
    return fin;
}
// scoreboard2(inning, 9);
// function getInningScore2(array, inn) {
//     return {
//         'home': scorePerInnH[inn],
//         'away': scorePerInnA[inn],
//     }
// }

// function scoreboard3(callbackA, callbackB, inns) {
//     const scorePerInnH = [0];
//     const scorePerInnA = [0];
//     for (let i = 0; i < inns; i++) {
//         scorePerInnH.push(scorePerInnH[i] + callbackA());
//         scorePerInnA.push(scorePerInnA[i] + callbackA());
//     }


// }
// // console.log(scoreboard3(inning, getInningScore2, 9));
// scoreboard3(inning, getInningScore2, 9)
// function innings3() {

// }

function getInningScore(callbackA, inns) {
    const outcomes = [{ 'inning': 0, 'home': 0, 'away': 0 }];
    for (let i = 1; i <= inns; i++) {
        outcomes.push({
            'inning': i,
            'home': outcomes[i - 1].home + callbackA(),
            'away': outcomes[i - 1].away + callbackA()
        })
    }
    outcomes.shift();
    return outcomes;
}

function scoreboard(callbackA, callbackB, inns) {
    const outcomes = callbackB(callbackA, inns);
    return outcomes.map(inning => {
        const innArr = inning.inning.toString(10).split('').map(Number);
        if (inning.inning === 1 | (inning.inning > 20 && innArr[innArr.length - 1] === 1)) {
            return inning.inning + 'st' + ' inning: ' + inning.home + ' - ' + inning.away;
        } else if (inning.inning === 2 | (inning.inning > 20 && innArr[innArr.length - 1] === 2)) {
            return inning.inning + 'nd' + ' inning: ' + inning.home + ' - ' + inning.away;
        } else if (inning.inning === 3 | (inning.inning > 20 && innArr[innArr.length - 1] === 3)) {
            return inning.inning + 'rd' + ' inning: ' + inning.home + ' - ' + inning.away;
        } else {
            return inning.inning + 'th' + ' inning: ' + inning.home + ' - ' + inning.away;
        }
    })
}

console.log(scoreboard(inning, getInningScore, 25))
    // scoreboard(innings3, getInningScore3, 9)