import {Router} from "express"
import { CategoryModel } from "../db.js"

const router = Router()

// Get all categories
router.get('/', async (req, res) => res.send(await CategoryModel.find()))

// Get single category by ID
router.get('/:id', async (req, res) => {
    const category = await CategoryModel.findById(req.params.id)
    if(category){
        res.send(category)
    } else {
        res.status(404).send({error: 'Category not found'})
    }
})

// Create a new category
router.post('/', async(req, res) => {
    try {
        const newCategory = await CategoryModel.create(req.body)
        res.status(201).send(insertedEntry)
    }
})

// Update a single category

// Delete a category

export default router