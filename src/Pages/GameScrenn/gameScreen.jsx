import { useRef, useState } from 'react'
import './gameScreen.css'

const gameScreen = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score }) => {
    
    const[letter, setLetter] = useState('')
    const letterInputRef = useRef(null)   
    
    const handleSubmit = (e) => {
      e.preventDefault()
      verifyLetter(letter)
      setLetter('')
      letterInputRef.current.focus()
    }


    return (
    <div>
      <div className="game">
        <p className="points">
          <span>Pontos: {score}</span>
        </p>
        <h1>Adivinhe a palavra</h1>
        <h3 className="tip">
          Nível de conhecimento sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você possui {guesses} tentativas</p>
        <div className="wordContainer">
          {letters.map((letter, i) => (
            guessedLetters.includes(letter) ? (
              <span key={i} className='blankSquare'>{letter}</span>
            ) : (
              <span key={i} className='blankSquare'></span>
            )
          ))}
        </div>
        <div className="letterContainer">
          <p>Adivinhe as letras da palavra:</p>
          <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="letter" 
            maxLength='1' 
            required 
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            className='inputForm'
            />
            <button className='play'>Jogar</button>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras já utilizadas: </p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default gameScreen