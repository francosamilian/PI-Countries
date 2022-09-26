const { Router } = require('express');
const { default: axios } = require('axios');
const { Country, Activity } = require('../db.js');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let errors = {};

function validate(form) {
    if(!form.name) errors.name = 'The activity must have a name';
    else if(!form.difficulty || form.difficulty < 1 || form.difficulty > 5) errors.difficulty = 'The difficulty must be between 1 and 5';
    else if(form.duration === '') errors.duration = 'The activity must have a duration';
    else if(form.seasons.length === 0) errors.seasons = 'You must select at least one season'
    else if(form.country.length === 0) errors.country = 'The activity must be assigned to a country';
    return errors;
};

router.get('/countries', async (req, res) => {
    try {
        const {name} = req.query;
        if (name) {
            let country = await Country.findAll({
                where: { 
                    [Op.or]: [
                        { name: {[Op.substring]: name}},
                        { name: {[Op.substring]: name[0].toUpperCase() + name.slice(1)}},
                        { name: name[0].toUpperCase() + name.slice(1) },
                    ]}}, {include: Activity});
            country.length ?
            res.status(201).json(country) :
            res.status(404).send('País no encontrado');
        } else {
            const allCountries = await Country.findAll({include: Activity});
            res.status(201).json(allCountries); 
        }
    } catch (e) {
        res.status(404).json({error: e.message});
    }
});

router.get('/countries/:id', (req, res) => {
    try {
        const {id} = req.params;
        Country.findByPk(id.toUpperCase(), {include: Activity})
            .then(country => {
                res.status(201).json(country);  
            })
            .catch(e => {
                res.status(404).json({error: e.message});
            })
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})

router.post('/activities', async (req, res) => {
    try {
        const {name, difficulty, duration, seasons, country} = req.body;
        const validateActivity = {name, difficulty, duration, seasons, country};
        validate(validateActivity);
        if(Object.entries(errors).length > 0) {
            errors = {};
            return res.status(404).send('There is missing or incorrect information')
        };
        let activity = await Activity.create({name, difficulty, duration, seasons: seasons.join(' - ')});
        let countryOfActivity = await Country.findAll({
            where: {
                name: country
            }
        }); 
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