const Database = require('../db/config');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  async get() {
    const db = await Database();

    const data = await db.all(`SELECT * FROM jobs;`);

    await db.close();

    return data.map(job => ({
      id: job.id,
      name: job.name,
      'daily-hours': job.daily_hours,
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
  
  async create(newJob) {
    const db = await Database();

    await db.run(`INSERT INTO jobs (
      id,
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      ${Number(newJob.id)},
      "${newJob.name}",
      ${Number(newJob['daily-hours'])},
      ${Number(newJob['total-hours'])},
      ${Number(newJob['created-at'])}
    )`)

    await db.close();
  }
}