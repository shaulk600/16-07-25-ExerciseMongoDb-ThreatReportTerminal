import express from "express";
import reportRoute from "./reportRoute.js";



export default function configRoutes(app) {

    app.use('/reports', reportRoute);

    app.use((req, res) => {
        res.status(404).json({ msg: 'Route not found' })
    })
}