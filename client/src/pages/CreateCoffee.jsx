import React, { useEffect, useState } from 'react'
import '../App.css'
import customAPI from '../services/customAPI'
import beverageCheck from '../services/BeverageCheck'

const CreateCoffee = () => {
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
    const [name, setName] = useState()
    const [price, setPrice] = useState(0)

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

    const selectHandler = (id, name, price) => {
        const data = {id, name, price: parseFloat(price)}
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

        const {status, message} = beverageCheck({milk: milk.name, coffeeBean: coffeeBean.name, sweetener: sweetener.name, topping: topping.name, temperature: temperature.name})
        if (!status) {
            window.alert('Cannot create beverage: ' + message)
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
            const res = await customAPI.createCustomCoffee(data)
            console.log('🎉 Successfully created custom coffee')
            window.alert(`Successfully created custom coffee: ${res.name}`)
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
        <div className='CreateCoffee' onClick={closePopup}>
            <div className='button-container' onClick={e => e.stopPropagation()}>
                <button onClick={() => {buttonHandler("milk")}}>Milk</button>
                <button onClick={() => {buttonHandler("coffee-bean")}}>Coffee Bean</button>
                <button onClick={() => {buttonHandler("sweetener")}}>Sweetener</button>
                <button onClick={() => {buttonHandler("topping")}}>Topping</button>
                <button onClick={() => {buttonHandler("temperature")}}>Temperature</button>
                <input type='text' placeholder='Name' onChange={e => setName(e.target.value)} />
                <button className='submit' onClick={submitHandler}>Submit</button>
            </div>
            <div className='custom-coffee-info'>
                <div className='price'>
                    <p>{`$${price.toFixed(2)}`}</p>
                </div>
                <div className='selection'>
                    <p>{`Selection: ${milk && milk.name && milk.name !== 'Empty' ? milk.name + ';' : ''}
                        ${coffeeBean && coffeeBean.name && coffeeBean.name !== 'Empty' ? coffeeBean.name + ';' : ''}
                        ${sweetener && sweetener.name && sweetener.name !== 'Empty' ? sweetener.name + ';' : ''}
                        ${topping && topping.name && topping.name !== 'Empty' ? topping.name + ';' : ''}
                        ${temperature && temperature.name && temperature.name !== 'Empty' ? temperature.name + ';' : ''}
                    `}</p>
                </div>
            </div>
            <div className='options-container'>
                {popup === "milk" && (
                    <div className='popup'>
                        {milks.map(item => (
                            <article 
                                className={`${milk && milk.id === item.id ? 'selected' : ''}`}
                                key={item.id} 
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price)}}
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
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price)}}
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
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price)}}
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
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price)}}
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
                                onClick={e => {e.stopPropagation(); selectHandler(item.id, item.name, item.price)}}
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

export default CreateCoffee