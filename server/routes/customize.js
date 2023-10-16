import express from 'express'
import CustomController from '../controllers/customize.js'


const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/coffee-beans', CustomController.getCoffeeBeans)
router.get('/coffee-beans/:id', CustomController.getCoffeeBeanById)

router.get('/milks', CustomController.getMilks)
router.get('/milks/:id', CustomController.getMilkById)

router.get('/sweeteners', CustomController.getSweeteners)
router.get('/sweeteners/:id', CustomController.getSweetenerById)

router.get('/toppings', CustomController.getToppings)
router.get('/toppings/:id', CustomController.getToppingById)

router.get('/temperatures', CustomController.getTemps)
router.get('/temperatures/:id', CustomController.getTempById)

router.get('/custom-coffee', CustomController.getCustomCoffeeList)
router.get('/custom-coffee/:id', CustomController.getCustomCoffeeById)
router.post('/custom-coffee', CustomController.createCustomCoffee)
router.patch('/custom-coffee/:id', CustomController.updateCustomCoffee)
router.delete('/custom-coffee/:id', CustomController.deleteCustomCoffee)


export default router