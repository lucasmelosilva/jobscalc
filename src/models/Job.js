let data = [
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
]

module.exports = {
  get() {
    return data;
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