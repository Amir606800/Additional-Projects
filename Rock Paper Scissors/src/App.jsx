import { useState } from 'react'
import { useRef } from 'react'

function App() {
  const [head, setHead] = useState('Do you want to start?')
  const [opponentL,setOpponentL] = useState('')
  const rockRef = useRef(null)
  const paperRef = useRef(null)
  const scsRef = useRef(null)
  const startRef= useRef(null)
  const mainHeadRef = useRef(null)
  const opponentRef = useRef(null)
  const opponent = {
    "rock":"&#x1F44A;",
    "paper":"&#x1f590;",
    "scissors":"&#x270c;"
  }


  function opponentChoice(){
    const keys = Object.keys(opponent)
    const randomKey = Math.floor(Math.random()*(keys.length))
    const chosenKey = keys[randomKey]
    return chosenKey;
  }
  function countdown(){
    setTimeout(() => {
      setHead("3");
      setOpponentL("Computer is thinking.")
    }, 1000);
    setTimeout(() => {
      setHead("2");
      setOpponentL("Computer is thinking..")
    }, 2000);
    setTimeout(() => {
      setHead("1");
      setOpponentL("Computer is thinking...")
    }, 3000);
    setTimeout(() => {
      setHead("Choose one of them");
    }, 4000);
    paperRef.current.classList.remove("hidden")
    rockRef.current.classList.remove("hidden")
    scsRef.current.classList.remove("hidden")
    opponentRef.current.innerHTML = "?"
  }
  const start = ()=>{
    opponentRef.current.classList.remove("hidden")
    countdown()
    startRef.current.classList.add("hidden");
    mainHeadRef.current.innerHTML = "VS"
    setOpponentL("Computer")
  }

  const generation = (userChoice) => {
    rockRef.current.classList.add("hidden");
  paperRef.current.classList.add("hidden");
  scsRef.current.classList.add("hidden");

  if (userChoice === "rock") rockRef.current.classList.remove("hidden");
  if (userChoice === "paper") paperRef.current.classList.remove("hidden");
  if (userChoice === "scissors") scsRef.current.classList.remove("hidden");
  
    const opponentSelection = opponentChoice(); // Generate opponent's choice once
     // Display opponent's choice
     
    opponentRef.current.innerHTML = opponent[opponentSelection];
    
    setTimeout(() => {
      // Determine result
      if (userChoice === opponentSelection) {
        alert("Draw");
      } else if (
        (userChoice === "rock" && opponentSelection === "scissors") ||
        (userChoice === "paper" && opponentSelection === "rock") ||
        (userChoice === "scissors" && opponentSelection === "paper")
      ) {
        alert("You Won!");
      } else {
        alert("You Lost!");
      }
  
      countdown(); // Restart the game
    }, 1000);
  };
  
  
  return (
    <>
      <div className="main w-screen gap-10 h-screen flex flex-col justify-center items-center relative">
        <div className="opponent-score absolute top-10 text-4xl">4</div>
        <div className="your-score absolute bottom-10 text-4xl">10</div>
        <div className="computerDiv text-5xl">{opponentL}</div>
        
        <p ref={opponentRef} className="border-2 hidden border-black p-5 rounded-2xl text-5xl bg-slate-400" id="rock"> ? </p>
        
        <div ref={mainHeadRef} className="head text-5xl">
          Rock Paper Scissor
        </div>
        <p  className=' text-2xl'>{head}</p>
        <div className="choose flex flex-row gap-20 justify-center items-center">
          <button ref={startRef} onClick={start} className="start border-2 border-black p-3 rounded-xl text-2xl">Start</button>
          <button onClick={()=>{generation("rock")}} ref={rockRef} className='border-2 border-black p-5 rounded-2xl text-5xl hidden bg-red-600'>&#x1F44A;</button>
          <button onClick={()=>{generation("paper")}} ref={paperRef} className='border-2 border-black p-5 rounded-2xl text-5xl hidden bg-green-500' >&#x1f590;</button>
          <button onClick={()=>{generation("scissors")}} ref={scsRef} className='border-2 border-black p-5 rounded-2xl text-5xl hidden bg-blue-500'>&#x270c;</button>
        </div>
      </div>
    </>
  )
}

export default App
