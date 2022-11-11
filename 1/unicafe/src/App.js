import { useState } from 'react'

const StatisticLine = ({text,value}) =>  
<tr>
  <td>{text}</td><td>{value}</td>
</tr>  


const Statistics = ({good ,bad ,neutral}) => {

  //console.log('props value is', props)
  //const  = props
  const all = good + bad + neutral
  if (all===0) {
    return(
      <div>
      <h1>Statistics </h1>

      No feedback given
      </div>
    )
  }

  return (
  <div>
    <h1>Statistics </h1>
    <table>
      <tbody>
        <StatisticLine text = "Good " value = {good}/>
        <StatisticLine text = "Neutral " value = {neutral}/>
        <StatisticLine text = "Bad " value = {bad}/>
        <StatisticLine text = "All " value = {all}/>
        <StatisticLine text = "Average " value = {(good - bad) /all}/>
        <StatisticLine text = "Positive " value = {(good / all)*100 + " %"}/>
      </tbody>
    </table>
  </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>Give feedback </h1>

      <Button handleClick ={() => handleGoodClick()} text = 'Good' />
      <Button handleClick ={() => handleNeutralClick()} text = 'Neutral' />
      <Button handleClick ={() => handleBadClick()} text = 'Bad' />

      <Statistics good = {good} bad = {bad} neutral = {neutral}/>

    </div>
  )
}

export default App
