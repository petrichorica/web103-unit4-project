import { pool } from "../config/database.js"

const getCoffeeBeans = async (req, res) => {
    const sql = `
        SELECT coffee_beans.id, coffee_beans.name, coffee_beans.price, images.url 
        FROM coffee_beans INNER JOIN images ON coffee_beans.name = images.name
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('⚠️ error getting coffee beans!', error)
        res.status(409).json({error: error.message})
    }
}

const getCoffeeBeanById = async (req, res) => {
    const { id } = req.params
    const sql = `
        SELECT coffee_beans.id, coffee_beans.name, coffee_beans.price, images.url 
        FROM coffee_beans INNER JOIN images ON coffee_beans.name = images.name
        WHERE coffee_beans.id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(`⚠️ error getting coffee beans by id=${id}!`, error)
        res.status(409).json({error: error.message})
    }
}

const getMilks = async (req, res) => {
    const sql = `
        SELECT milk.id, milk.name, milk.price, images.url
        FROM milk INNER JOIN images ON milk.name = images.name
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('⚠️ error getting milk!', error)
        res.status(409).json({error: error.message})
    }
}

const getMilkById = async (req, res) => {
    const { id } = req.params
    const sql = `
        SELECT milk.id, milk.name, milk.price, images.url
        FROM milk INNER JOIN images ON milk.name = images.name
        WHERE milk.id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(`⚠️ error getting milk by id=${id}!`, error)
        res.status(409).json({error: error.message})
    }
}

const getSweeteners = async (req, res) => {
    const sql = `
        SELECT sweetener.id, sweetener.name, sweetener.price, images.url
        FROM sweetener INNER JOIN images ON sweetener.name = images.name
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('⚠️ error getting sweetener!', error)
        res.status(409).json({error: error.message})
    }
}

const getSweetenerById = async (req, res) => {
    const { id } = req.params
    const sql = `
        SELECT sweetener.id, sweetener.name, sweetener.price, images.url
        FROM sweetener INNER JOIN images ON sweetener.name = images.name
        WHERE sweetener.id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(`⚠️ error getting sweetener by id=${id}!`, error)
        res.status(409).json({error: error.message})
    }
}

const getToppings = async (req, res) => {
    const sql = `
        SELECT toppings.id, toppings.name, toppings.price, images.url
        FROM toppings INNER JOIN images ON toppings.name = images.name
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('⚠️ error getting toppings!', error)
        res.status(409).json({error: error.message})
    }
}

const getToppingById = async (req, res) => {
    const { id } = req.params
    const sql = `
        SELECT toppings.id, toppings.name, toppings.price, images.url
        FROM toppings INNER JOIN images ON toppings.name = images.name
        WHERE toppings.id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(`⚠️ error getting toppings by id=${id}!`, error)
        res.status(409).json({error: error.message})
    }
}

const getTemps = async (req, res) => {
    const sql = `
        SELECT temperature.id, temperature.name, temperature.price, images.url
        FROM temperature INNER JOIN images ON temperature.name = images.name
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('⚠️ error getting temperature!', error)
        res.status(409).json({error: error.message})
    }
}

const getTempById = async (req, res) => {
    const { id } = req.params
    const sql = `
        SELECT temperature.id, temperature.name, temperature.price, images.url
        FROM temperature INNER JOIN images ON temperature.name = images.name
        WHERE temperature.id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error(`⚠️ error getting temperature by id=${id}!`, error)
        res.status(409).json({error: error.message})
    }
}

const getCustomCoffeeList = async (req, res) => {
    const sql = `
        SELECT custom_coffee.id, custom_coffee.name AS name, coffee_beans.name AS coffee_bean, milk.name AS milk, sweetener.name AS sweetener, toppings.name AS topping, temperature.name AS temperature, custom_coffee.price AS price
        FROM custom_coffee INNER JOIN coffee_beans ON custom_coffee.coffee_bean_id = coffee_beans.id
        INNER JOIN milk ON custom_coffee.milk_id = milk.id
        INNER JOIN sweetener ON custom_coffee.sweetener_id = sweetener.id
        INNER JOIN toppings ON custom_coffee.topping_id = toppings.id
        INNER JOIN temperature ON custom_coffee.temperature_id = temperature.id
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('⚠️ error getting custom coffee!', error)
        res.status(409).json({error: error.message})
    }
}

const getCustomCoffeeById = async (req, res) => {
    const { id } = req.params
    const sql = `
        SELECT custom_coffee.id, custom_coffee.name AS name, milk_id, coffee_bean_id, sweetener_id, topping_id, temperature_id,
            coffee_beans.name AS coffee_bean, milk.name AS milk, sweetener.name AS sweetener, toppings.name AS topping, temperature.name AS temperature, custom_coffee.price AS price
        FROM custom_coffee INNER JOIN coffee_beans ON custom_coffee.coffee_bean_id = coffee_beans.id
        INNER JOIN milk ON custom_coffee.milk_id = milk.id
        INNER JOIN sweetener ON custom_coffee.sweetener_id = sweetener.id
        INNER JOIN toppings ON custom_coffee.topping_id = toppings.id
        INNER JOIN temperature ON custom_coffee.temperature_id = temperature.id
        WHERE custom_coffee.id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error('⚠️ error getting custom coffee by id!', error)
        res.status(409).json({error: error.message})
    }
}

const createCustomCoffee = async (req, res) => {
    const { name, milk_id, coffee_bean_id, sweetener_id, topping_id, temperature_id, price } = req.body
    const sql = `
        INSERT INTO custom_coffee (name, milk_id, coffee_bean_id, sweetener_id, topping_id, temperature_id, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `
    try {
        const result = await pool.query(sql, [name, milk_id, coffee_bean_id, sweetener_id, topping_id, temperature_id, price])
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('⚠️ error creating custom coffee!', error)
        res.status(409).json({error: error.message})
    }
}

const updateCustomCoffee = async (req, res) => {
    const { id } = req.params
    const { name, milk_id, coffee_bean_id, sweetener_id, topping_id, temperature_id, price } = req.body
    const sql = `
        UPDATE custom_coffee
        SET name = $1, milk_id = $2, coffee_bean_id = $3, sweetener_id = $4, topping_id = $5, temperature_id = $6, price = $7
        WHERE id = $8
        RETURNING *
    `
    try {
        const result = await pool.query(sql, [name, milk_id, coffee_bean_id, sweetener_id, topping_id, temperature_id, price, id])
        res.status(200).json(result.rows[0])
    } catch (error) {
        console.error('⚠️ error updating custom coffee!', error)
        res.status(409).json({error: error.message})
    }
}

const deleteCustomCoffee = async (req, res) => {
    const { id } = req.params
    const sql = `
        DELETE FROM custom_coffee
        WHERE id = $1
    `
    try {
        await pool.query(sql, [id])
        res.status(204).json()
    } catch (error) {
        console.error('⚠️ error deleting custom coffee!', error)
        res.status(409).json({error: error.message})
    }
}

export default {
    getCoffeeBeans,
    getCoffeeBeanById,
    getMilks,
    getMilkById,
    getSweeteners,
    getSweetenerById,
    getToppings,
    getToppingById,
    getTemps,
    getTempById,
    getCustomCoffeeList,
    getCustomCoffeeById,
    createCustomCoffee,
    updateCustomCoffee,
    deleteCustomCoffee
}
