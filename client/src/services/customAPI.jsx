import { request } from "../utilities/api.js"

const url = '/api'

const getAllCustomCoffee = () => request('get', `${url}/custom-coffee`)
const getCustomCoffee = (id) => request('get', `${url}/custom-coffee/${id}`)
const createCustomCoffee = (data) => request('post', `${url}/custom-coffee`, data)
const editCustomCoffee = (id, data) => fetch(`${url}/custom-coffee/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
const deleteCustomCoffee = (id) => fetch(`${url}/custom-coffee/${id}`, {
    method: 'DELETE'
})

const getAllMilks = () => request('get', `${url}/milks`)
const getMilkById = (id) => request('get', `${url}/milks/${id}`)

const getAllCoffeeBeans = () => request('get', `${url}/coffee-beans`)
const getCoffeeBeanById = (id) => request('get', `${url}/coffee-beans/${id}`)

const getAllSweeteners = () => request('get', `${url}/sweeteners`)
const getSweetenerById = (id) => request('get', `${url}/sweeteners/${id}`)

const getAllToppings = () => request('get', `${url}/toppings`)
const getToppingById = (id) => request('get', `${url}/toppings/${id}`)

const getAllTemperatures = () => request('get', `${url}/temperatures`)
const getTemperatureById = (id) => request('get', `${url}/temperatures/${id}`)

export default {
    getAllCustomCoffee,
    getCustomCoffee,
    createCustomCoffee,
    editCustomCoffee,
    deleteCustomCoffee,
    getAllMilks,
    getMilkById,
    getAllCoffeeBeans,
    getCoffeeBeanById,
    getAllSweeteners,
    getSweetenerById,
    getAllToppings,
    getToppingById,
    getAllTemperatures,
    getTemperatureById,
}