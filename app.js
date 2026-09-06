import express from "express"
import "dotenv/config"
import { testDB } from "./src/config/database.js"

const app = express()
const PORT = process.env.PORT || 3006


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


