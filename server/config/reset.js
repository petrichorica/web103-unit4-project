import { pool } from "./database.js"
import './dotenv.js'
import imagesData from '../data/images.js'
import customize from "../data/customize.js"

const createImagesTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS images;

        CREATE TABLE IF NOT EXISTS images (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            url VARCHAR(300) NOT NULL
        );
    `
    try {
        await pool.query(sql)
        console.log('🎉 Images table created successfully!')
    } catch (error) {
        console.error('⚠️ Could not create images table!', error)
    }
}

const seedImagesTable = async () => {
    await createImagesTable();
    try {
        const sql = `INSERT INTO images (name, url) VALUES ($1, $2)`
        for (let image of imagesData) {
            await pool.query(sql, [image.name, image.url])
        }
        console.log('🎉 Images table seeded successfully!')
    } catch (error) {
        console.error('⚠️ Could not seed images table!', error)
    }
}

const createMilkTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS milk;

        CREATE TABLE IF NOT EXISTS milk (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price NUMERIC(4, 2) NOT NULL
        );
    `
    try {
        await pool.query(sql)
        console.log('🎉 Milk table created successfully!')
    } catch (error) {
        console.error('⚠️ Could not create milk table!', error)
    }
}

const seedMilkTable = async () => {
    await createMilkTable()
    const sql = `INSERT INTO milk (name, price) VALUES ($1, $2)`
    try {
        for (let milk of customize.milk_type) {
            await pool.query(sql, [milk.name, milk.price])
        }
        console.log('🎉 Milk table seeded successfully!')
    } catch (error) {
        console.error('⚠️ Could not seed milk table!', error)
    }
}

const createCoffeeBeansTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS coffee_beans;

        CREATE TABLE IF NOT EXISTS coffee_beans (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price NUMERIC(4, 2) NOT NULL
        );
    `
    try {
        await pool.query(sql)
        console.log('🎉 Coffee Beans table created successfully!')
    } catch (error) {
        console.error('⚠️ Could not create coffee beans table!', error)
    }
}

const seedCoffeeBeansTable = async () => {
    await createCoffeeBeansTable()
    const sql = `INSERT INTO coffee_beans (name, price) VALUES ($1, $2)`
    try {
        for (let coffeeBean of customize.coffee_beans) {
            await pool.query(sql, [coffeeBean.name, coffeeBean.price])
        }
        console.log('🎉 Coffee Beans table seeded successfully!')
    } catch (error) {
        console.error('⚠️ Could not seed coffee beans table!', error)
    }
}

const createSweetenerTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS sweetener;

        CREATE TABLE IF NOT EXISTS sweetener (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price NUMERIC(4, 2) NOT NULL
        );
    `
    try {
        await pool.query(sql)
        console.log('🎉 Sweetener table created successfully!')
    } catch (error) {
        console.error('⚠️ Could not create sweetener table!', error)
    }
}

const seedSweetenerTable = async () => {
    await createSweetenerTable()
    const sql = `INSERT INTO sweetener (name, price) VALUES ($1, $2)`
    try {
        for (let sweetener of customize.sweetener) {
            await pool.query(sql, [sweetener.name, sweetener.price])
        }
        console.log('🎉 Sweetener table seeded successfully!')
    } catch (error) {
        console.error('⚠️ Could not seed sweetener table!', error)
    }
}

const createToppingsTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS toppings;

        CREATE TABLE IF NOT EXISTS toppings (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price NUMERIC(4, 2) NOT NULL
        );
    `
    try {
        await pool.query(sql)
        console.log('🎉 Toppings table created successfully!')
    } catch (error) {
        console.error('⚠️ Could not create toppings table!', error)
    }
}

const seedToppingsTable = async () => {
    await createToppingsTable()
    const sql = `INSERT INTO toppings (name, price) VALUES ($1, $2)`
    try {
        for (let topping of customize.toppings) {
            await pool.query(sql, [topping.name, topping.price])
        }
        console.log('🎉 Toppings table seeded successfully!')
    } catch (error) {
        console.error('⚠️ Could not seed toppings table!', error)
    }
}

const createTempTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS temperature;

        CREATE TABLE IF NOT EXISTS temperature (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            price NUMERIC(4, 2) NOT NULL
        );
    `
    try {
        await pool.query(sql)
        console.log('🎉 temperature table created successfully!')
    } catch (error) {
        console.error('⚠️ Could not create temperature table!', error)
    }
}

const seedTempTable = async () => {
    await createTempTable()
    const sql = `INSERT INTO temperature (name, price) VALUES ($1, $2)`
    try {
        for (let temp of customize.temperature) {
            await pool.query(sql, [temp.name, temp.price])
        }
        console.log('🎉 temperature table seeded successfully!')
    } catch (error) {
        console.error('⚠️ Could not seed temperature table!', error)
    }
}

const createCustomCoffeeTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS custom_coffee (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            milk_id INTEGER REFERENCES milk(id) NOT NULL,
            coffee_bean_id INTEGER REFERENCES coffee_beans(id) NOT NULL,
            sweetener_id INTEGER REFERENCES sweetener(id) NOT NULL,
            topping_id INTEGER REFERENCES toppings(id) NOT NULL,
            temperature_id INTEGER REFERENCES temperature(id) NOT NULL,
            price NUMERIC(4, 2) NOT NULL
        );
    `
    try {
        await pool.query(sql)
        console.log('🎉 Custom Coffee table created successfully!')
    } catch (error) {
        console.error('⚠️ Could not create custom coffee table!', error)
    }
}

const seedCustomCoffeeTable = async () => {
    await createCustomCoffeeTable()
}

const dropCustomCoffeeTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS custom_coffee;
    `
    try {
        await pool.query(sql)
        console.log('🎉 Custom Coffee table dropped successfully!')
    } catch (error) {
        console.error('⚠️ Could not drop custom coffee table!', error)
    }
}

await dropCustomCoffeeTable()
await seedImagesTable()
await seedMilkTable()
await seedCoffeeBeansTable()
await seedSweetenerTable()
await seedToppingsTable()
await seedTempTable()
await seedCustomCoffeeTable()
