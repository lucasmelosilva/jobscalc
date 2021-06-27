const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.all(`SELECT * FROM jobs;`);

    await db.close();

    return data.map(job => ({
      name: job.name,
      'daily-hours': job.daity_hours,
      'total-hours': job.total_hours,
      'created-at': job.created_at,
      budget: job.budget
    }))
  },

  update(newJob) {
    const jobId = newJob.id
    data = data.map( job => Number(jobId) === Number(job.id)? job = newJob: job )
  },

  delete(jobId) {
    data = data.filter(job => Number(job.id) !== Number(jobId));
  },
  
  create(newJob) {
    data.push(newJob);
  }
}