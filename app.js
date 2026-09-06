import express from "express"
import "dotenv/config"
import { testDB } from "./src/config/database.js"
import { userRoutes } from "./src/routes/users.routes.js"
import { profileRoutes } from "./src/routes/profile.routes.js"

const app = express()
const PORT = process.env.PORT || 3006

app.use(express.json())
app.use(userRoutes)
app.use(profileRoutes)


async function VerificarDB() {
    try {
        await testDB()
        app.listen(PORT,() =>{
        console.log(`Servidor corriendo en el Puerto: ${PORT}`)
        });
    } catch (error) {
        console.log('Ocurrio un erro:',error)

    }
}

VerificarDB()


