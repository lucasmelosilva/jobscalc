const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../models/Profile')

module.exports = {
  index(req, res) {
    const jobs = Job.get()
    const updateJobs = jobs.map(job => {
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? "done" : "progress"

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, Profile.get()["value-hour"])
      }
    })

    return res.render('index', { jobs: updateJobs })
  }
}