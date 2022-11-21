const Header = (props) => {
    return (
        <div>
        <h1>{props.course}</h1>
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

const Content = ({osat}) => {
//console.log(props)
    return (
        <div>
        {osat.map(osa =>
            <Part key={osa.id}
            osa = {osa}
            />
        )}
        </div>
    )
}
const Total = ({osat}) => {
    return (
        <div>
        <p>{"Total of  "} 
            {osat.map(osa => osa.exercises)
            .reduce((exercises,total) => exercises+total,0)}
            {" exercises"}
        </p>
        </div>
    )
}

const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content osat = {course.parts}/>
        <Total osat = {course.parts} />
      </div>
    )
}
export default Course