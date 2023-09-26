const endScreen = ({retry, score, classification}) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <p>A sua pontuação foi de: {score}</p>
      <p> Voce foi classificado como{classification}</p>
      <button onClick={retry}>Resetar</button>
    </div>
  )
}   

export default endScreen