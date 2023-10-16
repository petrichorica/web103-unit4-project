import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import '../css/Page.css'
import customAPI from '../services/customAPI'

const CoffeeDetails = () => {
    const { id } = useParams()
    const [customCoffee, setCustomCoffee] = useState()
    const [milk, setMilk] = useState()
    const [coffeeBean, setCoffeeBean] = useState()
    const [sweetener, setSweetener] = useState()
    const [topping, setTopping] = useState()
    const [temperature, setTemperature] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const getCustomCoffee = async () => {
            try {
                const res = await customAPI.getCustomCoffee(id)
                setCustomCoffee(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        getCustomCoffee()
    }, [])

    useEffect(() => {
        if (customCoffee && customCoffee.id) {
            const getMilk = async () => {
                try {
                    const res = await customAPI.getMilkById(customCoffee.milk_id)
                    setMilk(res)
                }
                catch (err) {
                    console.log(err)
                }
            }
            const getCoffeeBean = async () => {
                try {
                    const res = await customAPI.getCoffeeBeanById(customCoffee.coffee_bean_id)
                    setCoffeeBean(res)
                }
                catch (err) {
                    console.log(err)
                }
            }
            const getSweetener = async () => {
                try {
                    const res = await customAPI.getSweetenerById(customCoffee.sweetener_id)
                    setSweetener(res)
                }
                catch (err) {
                    console.log(err)
                }
            }
            const getTopping = async () => {
                try {
                    const res = await customAPI.getToppingById(customCoffee.topping_id)
                    setTopping(res)
                }
                catch (err) {
                    console.log(err)
                }
            }
            const getTemperature = async () => {
                try {
                    const res = await customAPI.getTemperatureById(customCoffee.temperature_id)
                    setTemperature(res)
                }
                catch (err) {
                    console.log(err)
                }
            }
            getMilk()
            getCoffeeBean()
            getSweetener()
            getTopping()
            getTemperature()
        }
    }, [customCoffee])

    const handleDelete = (id, name) => async () => {
        try {
            await customAPI.deleteCustomCoffee(id)
            console.log(`Custom Coffee ${name} with id=${id} deleted`)
            alert(`Custom Coffee ${name} is deleted!`)
            navigate('/customcoffee')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="CoffeeDetails">
            {customCoffee && (
                <article>
                    <div className='head-container'>
                        <h1>{customCoffee.name}</h1>
                        <div className='update'>
                            <a href={`/edit/${customCoffee.id}`}>Edit</a>
                            <span> | </span>
                            <a onClick={handleDelete(customCoffee.id, customCoffee.name)}>Delete</a>
                        </div>
                    </div>
                    <p className='price'>Price: ${customCoffee.price}</p>
                    <div className='grid'>
                        <div className='grid-item'>
                            <h3>Milk</h3>
                            <p>{milk && milk.name == "Empty" ? "" : milk && milk.name}</p>
                            <img src={milk && milk.url} alt={milk && milk.name} />
                        </div>
                        <div className='grid-item'>
                            <h3>Coffee Bean</h3>
                            <p>{coffeeBean && coffeeBean.name == "Empty" ? "" : coffeeBean && coffeeBean.name}</p>
                            <img src={coffeeBean && coffeeBean.url} alt={coffeeBean && coffeeBean.name} />
                        </div>
                        <div className='grid-item'>
                            <h3>Sweetener</h3>
                            <p>{sweetener && sweetener.name == "Empty" ? "" : sweetener && sweetener.name}</p>
                            <img src={sweetener && sweetener.url} alt={sweetener && sweetener.name} />
                        </div>
                        <div className='grid-item'>
                            <h3>Topping</h3>
                            <p>{topping && topping.name == "Empty" ? "" : topping && topping.name}</p>
                            <img src={topping && topping.url} alt={topping && topping.name} />
                        </div>
                        <div className='grid-item'>
                            <h3>Temperature</h3>
                            <p>{temperature && temperature.name == "Empty" ? "" : temperature && temperature.name}</p>
                            <img src={temperature && temperature.url} alt={temperature && temperature.name} />
                        </div>
                    </div>
                </article>
            )}
        </div>
    )
}

export default CoffeeDetails