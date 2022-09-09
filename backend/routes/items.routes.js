import express from 'express'
import { createItem, deleteItem, getItem, getItems, updateItem, updateItemAvailability } from '../controllers/item.controller.js'

import { verifyAdmin } from '../utils/verifyToken.js'
// import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()
//CREATE
router.post('/add', verifyAdmin, createItem)

//UPDATE
router.put('/availability/:id', verifyAdmin, updateItemAvailability)
router.put('/:id', verifyAdmin, updateItem)
//DELETE
router.delete('/:id/', verifyAdmin, deleteItem)
//GET

router.get('/:id', getItem)
//GET ALL

router.get('/', getItems)

export default router
