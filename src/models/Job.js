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

  async update(newJob) {
    const jobId = newJob.id
    
    const db = await Database();

    await db.run(`UPDATE jobs SET 
      name = "${newJob.name}",
      total_hours = ${newJob['total-hours']},
      daily_hours = ${newJob['daily-hours']} WHERE id = ${jobId};`)

    await db.close()

  },

  async delete(jobId) {
    const db = await Database()

    await db.run(`DELETE FROM jobs WHERE id = ${jobId};`);

    await db.close();
  },
  
  async create(newJob) {
    const db = await Database();

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "${newJob.name}",
      ${Number(newJob['daily-hours'])},
      ${Number(newJob['total-hours'])},
      ${Number(newJob['created-at'])}
    )`)

    await db.close();
  }
}