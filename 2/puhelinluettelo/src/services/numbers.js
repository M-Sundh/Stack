import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
return axios.get(baseUrl)
}

const create = nameObject => {
    //console.log(nameObject)
    return axios.post(baseUrl,nameObject)
}

const remove = (id) => {
    //console.log(id,nimi)
    //console.log(`${baseUrl}/${id}`)
    return axios.delete(baseUrl + "/" + id)
} 

const replace = (nameObject,addId) => {
    return axios.put(baseUrl + "/" + addId,nameObject)
}

export default {getAll,create,remove,replace}