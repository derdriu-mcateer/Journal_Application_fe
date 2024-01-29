import express from 'express'
import entryRoutes from './routes/entry_routes.js'
import categoryRoutes from './routes/category_routes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API' }))



app.use('/entries', entryRoutes)
app.use('/categories', categoryRoutes)



app.listen(3001)