import React, { useState, useEffect } from 'react'
import '../App.css'
import '../css/Page.css'
import customAPI from '../services/customAPI'

const ViewCoffee = () => {
    const [customCoffeeList, setCustomCoffeeList] = useState([])

    const getCustomCoffee = async () => {
        try {
            const res = await customAPI.getAllCustomCoffee()
            setCustomCoffeeList(res.map((customCoffee) => {
                return {
                    id: customCoffee.id,
                    name: customCoffee.name,
                    milk: customCoffee.milk == "Empty" ? "" : customCoffee.milk,
                    coffee_bean: customCoffee.coffee_bean == "Empty" ? "" : customCoffee.coffee_bean,
                    sweetener: customCoffee.sweetener == "Empty" ? "" : customCoffee.sweetener,
                    topping: customCoffee.topping == "Empty" ? "" : customCoffee.topping,
                    temperature: customCoffee.temperature == "Empty" ? "" : customCoffee.temperature,
                    price: customCoffee.price
                }
            }))
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getCustomCoffee()
    }, [])

    const handleDelete = (id, name) => async () => {
        try {
            await customAPI.deleteCustomCoffee(id)
            console.log(`Custom Coffee ${name} with id=${id} deleted`)
            alert(`Custom Coffee ${name} is deleted!`)
            setCustomCoffeeList(customCoffeeList.filter((customCoffee) => customCoffee.id !== id))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='ViewCoffee'>
            <article>
                <h1>Custom Coffee Beverages</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Custom Coffee</th>
                            <th>Milk</th>
                            <th>Coffee Bean</th>
                            <th>Sweetener</th>
                            <th>Topping</th>
                            <th>Temperature</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customCoffeeList.map((customCoffee) => (
                            <tr key={customCoffee.id}>
                                <td>{customCoffee.name}</td>
                                <td>{customCoffee.milk}</td>
                                <td>{customCoffee.coffee_bean}</td>
                                <td>{customCoffee.sweetener}</td>
                                <td>{customCoffee.topping}</td>
                                <td>{customCoffee.temperature}</td>
                                <td>${customCoffee.price}</td>
                                <td>
                                    <a href={`/customcoffee/${customCoffee.id}`}>View</a>
                                    <span> | </span>
                                    <a href={`/edit/${customCoffee.id}`}>Edit</a>
                                    <span> | </span>
                                    <a onClick={handleDelete(customCoffee.id, customCoffee.name)}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
        </div>
    )
}

export default ViewCoffee