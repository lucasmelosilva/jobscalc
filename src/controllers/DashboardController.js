const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../models/Profile')

module.exports = {
  index(req, res) {
    const profile = Profile.get();
    const jobs = Job.get()

    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    const updateJobs = jobs.map(job => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? "done" : "progress"

      /* 
        status = 'done'
        statusCount[status] === statusCount[done] === statusCount.done += 1
        somando mais 1 a quantidade de status
      */
      statusCount[status] += 1;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      }
    })

    return res.render('index', { jobs: updateJobs, profile, statusCount })
  }
}