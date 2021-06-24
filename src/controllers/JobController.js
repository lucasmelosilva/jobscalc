const Profile = require('../models/Profile')
const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  create(req, res) {
    return res.render('job')
  },

  save(req, res) {
    const jobs = Job.get()
    // req.body = { name: name , 'daily-hours': '3.1', 'total-hours': '3' }
    // pega o indice elemento do array Jobs
    const lastElementJobs = jobs.length - 1

    // pega o id do ultimo elemento caso se nao exista atribui 1 no id
    const lastId = jobs[lastElementJobs]?.id || 0;

    Job.create({
      id: lastId + 1,
      name: req.body.name,
      'daily-hours': req.body['daily-hours'],
      'total-hours': req.body['total-hours'],
      created_at: Date.now() // atribuindo data de hoje
    })

    return res.redirect('/')
  },

  show(req, res) {

    const jobs = Job.get()
    
    const jobId = req.params.id

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found!')
    }

    const profile = Profile.get()

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render('job-edit', { job })
  },

  update(req, res) {  
    const jobId = req.params.id
    const jobs = Job.get()

    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if (!job) {
      return res.send('Job not found!')
    }

    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"]
    }

    Job.update(updatedJob)
    
    res.redirect('/job/' + jobId)

  },

  delete(req, res) {
    const jobId = req.params.id
    Job.delete(jobId)
    return res.redirect('/')
  }
}