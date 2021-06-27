const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../models/Profile')

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();
    const jobs = await Job.get()

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // total de horas por dia de cada projeto em progress
    let jobTotalHours = 0

    const updateJobs = jobs.map(job => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? "done" : "progress"

      /* 
        status = 'done'
        statusCount[status] === statusCount[done] === statusCount.done += 1
        somando mais 1 a quantidade de status
      */
      statusCount[status] += 1;

      jobTotalHours = status  == 'progress' ? jobTotalHours += Number(job['daily-hours']): jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })

    let freeHours = profile['hours-per-day'] - jobTotalHours;

    return res.render('index', { jobs: updateJobs, profile: profile, statusCount, freeHours })
  }
}