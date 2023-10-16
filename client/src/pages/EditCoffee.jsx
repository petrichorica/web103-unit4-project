import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import '../App.css'
import customAPI from '../services/customAPI'

const EditCoffee = () => {
    const { id } = useParams()
    const [milks, setMilks] = useState([])
    const [coffeeBeans, setCoffeeBeans] = useState([])
    const [sweeteners, setSweeteners] = useState([])
    const [toppings, setToppings] = useState([])
    const [temperatures, setTemperatures] = useState([])
    const [popup, setPopup] = useState('')

    const [milk, setMilk] = useState()
    const [coffeeBean, setCoffeeBean] = useState()
    const [sweetener, setSweetener] = useState()
    const [topping, setTopping] = useState()
    const [temperature, setTemperature] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const getMilks = async () => {
            try {
                const res = await customAPI.getAllMilks()
                setMilks(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        const getCoffeeBeans = async () => {
            try {
                const res = await customAPI.getAllCoffeeBeans()
                setCoffeeBeans(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        const getSweeteners = async () => {
            try {
                const res = await customAPI.getAllSweeteners()
                setSweeteners(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        const getToppings = async () => {
            try {
                const res = await customAPI.getAllToppings()
                setToppings(res)
            }
            catch (err) {
                console.log(err)
            }
        }
        const getTemperatures = async () => {
            try {
                const res = await customAPI.getAllTemperatures()
                setTemperatures(res)
            }
            catch (err) {
                console.log(err)
            }
        }

        getMilks()
        getCoffeeBeans()
        getSweeteners()
        getToppings()
        getTemperatures()
    }, [])

    useEffect(() => {
        const getCustomCoffee = async () => {
            try {
                const res = await customAPI.getCustomCoffee(id)
                setName(res.name)
                setPrice(parseFloat(res.price))

                const milk = await customAPI.getMilkById(res.milk_id)
                setMilk({id: milk.id, name: milk.name, price: parseFloat(milk.price), url: milk.url})

                const coffeeBean = await customAPI.getCoffeeBeanById(res.coffee_bean_id)
                setCoffeeBean({id: coffeeBean.id, name: coffeeBean.name, price: parseFloat(coffeeBean.price), url: coffeeBean.url})

                const sweetener = await customAPI.getSweetenerById(res.sweetener_id)
                setSweetener({id: sweetener.id, name: sweetener.name, price: parseFloat(sweetener.price), url: sweetener.url})

                const topping = await customAPI.getToppingById(res.topping_id)
                setTopping({id: topping.id, name: topping.name, price: parseFloat(topping.price), url: topping.url})

                const temperature = await customAPI.getTemperatureById(res.temperature_id)
                setTemperature({id: temperature.id, name: temperature.name, price: parseFloat(temperature.price), url: temperature.url})
            }
            catch (err) {
                console.log(err)
            }
        }
        getCustomCoffee()
    }, [id])

    const buttonHandler = (option) => {
        switch (option) {
            case "milk":
                setPopup("milk")
                break
            case "coffee-bean":
                setPopup("coffee-bean")
                break
            case "sweetener":
                setPopup("sweetener")
                break
            case "topping":
                setPopup("topping")
                break
            case "temperature":
                setPopup("temperature")
                break
            default:
                break
        }
    }

    const closePopup = () => {
        setPopup('')
    }

    const selectHandler = (id, name, price, url) => {
        const data = {id, name, price: parseFloat(price), url}
        switch (popup) {
            case "milk":
                setMilk(data)
                break
            case "coffee-bean":
                setCoffeeBean(data)
                break
            case "sweetener":
                setSweetener(data)
                break
            case "topping":
                setTopping(data)
                break
            case "temperature":
                setTemperature(data)
                break
            default:
                break
        }
    }

    const submitHandler = async () => {
        if (!milk || !coffeeBean || !sweetener || !topping || !temperature) {
            window.alert('Please select all options')
            return
        }

        if (!name) {
            window.alert('Please create a name')
            return
        }

        const price = milk.price + coffeeBean.price + sweetener.price + topping.price + temperature.price
        const data = {
            milk_id: milk.id,
            coffee_bean_id: coffeeBean.id,
            sweetener_id: sweetener.id,
            topping_id: topping.id,
            temperature_id: temperature.id,
            name,
            price,
        }
        try {
            await customAPI.editCustomCoffee(id, data)
            console.log('🎉 Successfully updated custom coffee')
            window.alert(`Successfully updated custom coffee: ${data.name}`)
            navigate('/customcoffee')
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let _price = 0;
        if (milk) {
            _price += milk.price
        }
        if (coffeeBean) {
            _price += coffeeBean.price
        }
        if (sweetener) {
            _price += sweetener.price
        }
        if (topping) {
            _price += topping.price
        }
        if (temperature) {
            _price += temperature.price
        }
        setPrice(_price)
    }, [milk, coffeeBean, sweetener, topping, temperature])

    return (
        <div className='EditCoffee' onClick={closePopup}>
            <div className='CoffeeDetails'>
                <article>
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
            </div>
            <div className='button-container' onClick={e => e.stopPropagation()}>
                <button onClick={() => {buttonHandler("milk")}}>Milk</button>
                <button onClick={() => {buttonHandler("coffee-bean")}}>Coffee Bean</button>
                <button onClick={() => {buttonHandler("sweetener")}}>Sweetener</button>
                <button onClick={() => {buttonHandler("topping")}}>Topping</button>
                <button onClick={() => {buttonHandler("temperature")}}>Temperature</button>
                <input type='text' value={name} placeholder={name} onChange={e => setName(e.target.value)} />
                <button className='submit' onClick={submitHandler}>Update</button>
            </div>
            <div className='custom-coffee-info'>
                <div className='price'>
                    <p>{`$${price.toFixed(2)}`}</p>
                </div>
            </div>
            <div className='options-container'>
                {popup === "milk" && (
                    <div className='popup'>
                        {milks.map(item => (
                            <article 
                                className={`${milk && milk.id === item.id ? 'selected' : ''}`}
                                key={item.id} 
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price, item.url)}}
                                >
                                <h4>{item.name}</h4>
                                <img src={item.url} alt={item.name} />
                                <p>{`$${item.price}`}</p>
                            </article>
                        ))}
                    </div>
                )}
                {popup === "coffee-bean" && (
                    <div className='popup'>
                        {coffeeBeans.map(item => (
                            <article 
                                className={`${coffeeBean && coffeeBean.id === item.id ? 'selected' : ''}`}
                                key={item.id} 
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price, item.url)}}
                                >
                                <h4>{item.name}</h4>
                                <img src={item.url} alt={item.name} />
                                <p>{`$${item.price}`}</p>
                            </article>
                        ))}
                    </div>
                )}
                {popup === "sweetener" && (
                    <div className='popup'>
                        {sweeteners.map(item => (
                            <article 
                                className={`${sweetener && sweetener.id === item.id ? 'selected' : ''}`}
                                key={item.id} 
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price, item.url)}}
                                >
                                <h4>{item.name}</h4>
                                <img src={item.url} alt={item.name} />
                                <p>{`$${item.price}`}</p>
                            </article>
                        ))}
                    </div>
                )}
                {popup === "topping" && (
                    <div className='popup'>
                        {toppings.map(item => (
                            <article 
                                className={`${topping && topping.id === item.id ? 'selected' : ''}`}
                                key={item.id} 
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price, item.url)}}
                                >
                                <h4>{item.name}</h4>
                                <img src={item.url} alt={item.name} />
                                <p>{`$${item.price}`}</p>
                            </article>
                        ))}
                    </div>
                )}
                {popup === "temperature" && (
                    <div className='popup'>
                        {temperatures.map(item => (
                            <article 
                                className={`${temperature && temperature.id === item.id ? 'selected' : ''}`}
                                key={item.id} 
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price, item.url)}}
                                >
                                <h4>{item.name}</h4>
                                <img src={item.url} alt={item.name} />
                                <p>{`$${item.price}`}</p>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default EditCoffee