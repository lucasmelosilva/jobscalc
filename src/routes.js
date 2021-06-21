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
			// req.body para pegar os dados
			const data = req.body

			// definir quantas semanas tem um ano: 52
			const weeksPerYear = 52

			// remover as semanas de ferias do ano, para pegar quantas semanas tem um 1 mes
			const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

			// total de horas trabalhadas na semana
			const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

			// horas trabalhadas no mes
			const monthlyTotalHours = weekTotalHours * weeksPerMonth

			// qual sera o valor da minha hora?
			const valueHour = data["monthly-budget"] / monthlyTotalHours

			Profile.data = {
				...Profile.data,
				...req.body,
				"value-hour": valueHour
			}

			return res.redirect('/profile')
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
			created_at: Date.now(),
			budget: 76
		},
		{
			id: 2,
			name: "OneTwo Project",
			'daily-hours': 2,
			'total-hours': 60,
			created_at: Date.now(),
			budget: 76
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
					budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
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
			const lastId = Job.data[lastElementJobs].id || 0;

			Job.data.push({
				id: lastId + 1,
				name: req.body.name,
				'daily-hours': req.body['daily-hours'],
				'total-hours': req.body['total-hours'],
				created_at: Date.now() // atribuindo data de hoje
			})

			return res.redirect('/')
		},

		show(req, res) {
			
			const jobId = req.params.id

			const job = Job.data.find(job => Number(job.id) === Number(jobId))

			if (!job) {
				return res.send('Job not found!')
			}

			job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

			return res.render(basePath + 'job-edit', { job })
		},

		update(req, res) {  
			const jobId = req.params.id

			const job = Job.data.find(job => Number(job.id) === Number(jobId))

			if (!job) {
				return res.send('Job not found!')
			}

			const updatedJob = {
				...job,
				name: req.body.name,
				"total-hours": req.body["total-hours"],
				"daily-hours": req.body["daily-hours"]
			}

			Job.data = Job.data.map( job => Number(jobId) === Number(job.id)? job = updatedJob: job )

			res.redirect('/job/' + jobId)

		},

		delete(req, res) {
			const jobId = req.params.id

			Job.data = Job.data.filter(job => Number(jobId) !== Number(job.id))

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
		},

		calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
	}

}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;