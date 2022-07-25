const { Router } = require('express');
const { default: axios } = require('axios');
const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {
    try {
        const {name} = req.query;
        if (name) {
            let country = await Country.findAll({
                where: { 
                    [Op.or]: [
                        { name: {[Op.substring]: name}},
                        { name: name.toLowerCase() }, 
                    ]}});
            country.length ?
            res.status(201).json(country) :
            res.status(404).send('País no encontrado');
        } else {
            const allCountries = await Country.findAll();
            res.status(201).json(allCountries); 
        }
    } catch (e) {
        res.status(404).json({error: e.message});
    }
});

router.get('/countries/:idPais', async (req, res) => {
    try {
        const {idPais} = req.params;
        const country = await Country.findByPk(idPais.toUpperCase(), {include: Activity});
        console.log(idPais.toUpperCase());  
        console.log(country); 
        res.status(201).json(country);  
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})

router.post('/activities', async (req, res) => {
    const {name, difficulty, duration, season, country} = req.body;
    try {
        let activity = await Activity.create({name, difficulty, duration, season});
        let countryOfActivity = await Country.findByPk(country.toUpperCase());  
        console.log(countryOfActivity);
        activity.addCountry(countryOfActivity);
        res.status(201).json(activity);
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})

router.get('/activities', async (req, res) => {
    try {
        const allActivities = await Activity.findAll();
        res.status(201).json(allActivities);
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})


module.exports = router;