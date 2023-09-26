import './App.css'
import { wordList } from './data/data'
import StartScreen from './Pages/StartScreen/startScreen'
import EndScreen from './Pages/EndScreen/endScreen'
import GameScreen from './Pages/GameScrenn/gameScreen'
import { useState, useCallback, useEffect } from 'react'
function App() {

  const stages = [
    { id: 1, name: 'start' },
    { id: 2, name: 'game' },
    { id: 3, name: 'end' },
  ]

  const guessesPoints = 3

  const [pages, setPages] = useState(stages[0].name)
  const [words] = useState(wordList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory =useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return { word, category }
  },[words])
  const startGame =useCallback(() => {
    const { word, category } = pickedWordAndCategory();
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    setPages(stages[1].name);
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    clearStatesAll();
  },[pickedCategory])
  
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearStatesAll = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

useEffect(() => {
  setScore(0);
}, []); 

  useEffect(() => {
    if (guesses <= 0) {
      setPages(stages[2].name)
      clearStatesAll()  
    }
  })
  
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => (actualScore + 100))
      startGame()
    }
  },[guessedLetters])

  const retry = () => {
    setPages(stages[0].name)
    setGuesses(guessesPoints)
    setScore(0) 
  }
  return (
    <div className='App'>
      {pages === "start" && <StartScreen startGame={startGame} />}
      {pages === "game" && <GameScreen verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {pages === "end" && <EndScreen retry={retry} score={score}/>}
    </div>
  )
}

export default App
