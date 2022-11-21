import { useEffect, useState } from 'react'
import numberService from './services/numbers'
import './index.css'

const Filter = ({newFilter,handleFilterChange}) => {
  return (
    <div>
      filter shown with:
      <input value={newFilter}
      onChange = {handleFilterChange}
      />
    </div> 
  )  
}

const PersonForm = ({newName,newNumber, addName,handleNameChange,handleNumberChange}) => {
  return(
    <form onSubmit={addName}>
    <div>
      name: 
      <input value={newName}
      onChange={handleNameChange}
      />
    </div>
    <div>
      number: 
      <input value={newNumber}
      onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )

}

const Persons = ({persons,setPersons,newFilter,setErrorMessage}) => {
  const personsToshow = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))
  const remove = (person) => {
    const ok = window.confirm(`delete ${person.name} ?`)
      if (ok) {
        numberService.remove(person.id,person.name)
        .then(() =>{
          setPersons(persons.filter(p => p.id !== person.id))
          setErrorMessage({message : `Deleted ${person.name}`,type : "done"})
          setTimeout(() => {
            setErrorMessage({message : null,type : "done"})
          }, 5000)
        })    
        .catch(() => {
          setErrorMessage({message : `Error deleting ${person.name}`,type : "error"})
          setTimeout(() => {
            setErrorMessage({message : null,type : "done"})
          }, 5000)
        }) 
      }
    }
  

  return(
    <ul>
    {personsToshow.map(person =>
    <li key = {person.name}>
      {person.name} {person.number} 
      <button onClick={() => remove(person)}>delete</button>
    </li>
  )}
  </ul>
  )
}

const Notification = ({ message,type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className = {type}>
      {message}
    </div>
  )
}

const App = () => {
    useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({message : null,type : "done"})

  const addName = (event) => {
    event.preventDefault()
    console.log(newName,persons.map(p =>p.name))
    const nameObject = {
      name: newName,
      number : newNumber}
    const addIndex = persons.map(p =>p.name).indexOf(newName)  
    if (addIndex>= 0){
      const ok = window.confirm(`${newName} is already added to phonebook, replace number`)
      if (ok){
        const addId = persons[addIndex].id
        numberService.replace(nameObject,addId)
        .then(response => {
          console.log(response.data)
          setPersons(persons.map(person => person.id !== persons[addIndex].id ? person : response.data))
          setErrorMessage({message : `Updated ${response.data.name}`,type : "done"})
          setTimeout(() => {
            setErrorMessage({message : null,type : "done"})
          }, 5000)
        })
        .catch(error => {
          setErrorMessage({message : `Update failed`,type : "error"})
          setTimeout(() => {
            setErrorMessage({message : null,type : "done"})
          }, 5000)
        })
      }
      console.log('loytyi jo')
    }
    else{
      console.log('button clicked', event.target)
      numberService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))  
          setNewName('')
          setNewNumber('')
          setErrorMessage({message : `Added ${response.data.name}`,type : "done"})
          setTimeout(() => {
            setErrorMessage({message : null,type : "done"})
          }, 5000)
          .catch(error => {
            setErrorMessage({message : `Add failed`,type : "error"})
            setTimeout(() => {
            setErrorMessage({message : null,type : "done"})
          }, 5000)
          })
      })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  console.log(errorMessage)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} type = {errorMessage.type} />
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} />
      
      <h2>Add a new</h2>
      <PersonForm 
        newName = {newName}
        newNumber ={newNumber}
        addName = {addName}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons = {persons} setPersons = {setPersons} newFilter = {newFilter} setErrorMessage ={setErrorMessage}/>

    </div>
  )

}

export default App
