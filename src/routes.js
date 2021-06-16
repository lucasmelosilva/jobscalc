const express = require('express');
const routes = express.Router();
const basePath = __dirname + '/views/';

const Profile = {
    data: {
        name: "lucas",
        avatar: "https://avatars.githubusercontent.com/u/65877042?v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(basePath + 'profile', { profile: Profile.data })
        },

        update(req, res) {
            
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria do Guloso",
            'daily-hours': 2,
            'total-hours': 1,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            'daily-hours': 2,
            'total-hours': 60,
            created_at: Date.now()
        }
    ],

    controllers: {
        index(req, res) {
            const updateJobs = Job.data.map(job => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? "done" : "progress"

                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["value-hour"] * job["total-hours"]
                }
            })

            return res.render(basePath + 'index', { jobs: updateJobs })
        },

        create(req, res) {
            return res.render(basePath + 'job')
        },

        save(req, res) {
            // req.body = { name: name , 'daily-hours': '3.1', 'total-hours': '3' }
            // pega o indice elemento do array Jobs
            const lastElementJobs = Job.data.length - 1

            // pega o id do ultimo elemento caso se nao exista atribui 1 no id
            const lastId = Job.data[lastElementJobs].id || 1;

            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours'],
                created_at: Date.now() // atribuindo data de hoje
            })

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
            const remainingDaysIni = (job['total-hours'] / job['daily-hours']).toFixed()

            const createdDate = new Date(job.created_at)
            const dueday = createdDate.getDate() + Number(remainingDaysIni)
            const dueDateInMs = createdDate.setDate(dueday)

            const timeDiffInMs = dueDateInMs - Date.now()
            // transformar milli em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)

            // restam x dias
            return dayDiff
        }
    }

}

routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)

routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.render(basePath + 'job-edit'))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;