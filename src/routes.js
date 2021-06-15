const express = require('express');
const routes = express.Router();
const basePath = __dirname + '/views/';

const profile = {
    name: "lucas",
    avatar: "https://avatars.githubusercontent.com/u/65877042?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

const jobs = []

routes.get('/', (req, res) => res.render(basePath + 'index'))
routes.get('/job', (req, res) => res.render(basePath + 'job'))
routes.post('/job', (req, res) => {

    // req.body = { name: name , 'daily-hours': '3.1', 'total-hours': '3' }
    jobs.push(req.body)
    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(basePath + 'job-edit'))
routes.get('/profile', (req, res) => res.render(basePath + 'profile', { profile }))

module.exports = routes