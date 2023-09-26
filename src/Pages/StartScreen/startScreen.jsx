import './style.css'
const startScreen = ({startGame}) => {
  return (
    <div className='startScreen'>
      <h1>CodeGuessr</h1>
      <p>Clique abaixo para começar</p>
      <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default startScreen