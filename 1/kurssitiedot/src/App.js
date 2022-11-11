const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  //console.log(props)
  return (
    <div>
      <Part osa =  {props.osat[0]} />
      <Part osa =  {props.osat[1]} />
      <Part osa =  {props.osat[2]} />
    </div>
  )
}
const Part = (props) => {
  //console.log(props)
  //console.log(props.osa.name)
  return (
    <p>
      {props.osa.name} {props.osa.exercises} 
    </p>
  )
}
const Total = (props) => {
  return (
    <p>
      <p>Number of exercises {props.osat[0].exercises 
        + props.osat[1].exercises
        + props.osat[2].exercises}</p>
    </p>
  )
}

const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content osat = {course.parts}/>
      <Total osat = {course.parts} />
    </div>
  )
}

export default App
