module.exports = {
  remainingDays(job) {
    const remainingDaysIni = (Number(job['total-hours']) / Number(job['daily-hours'])).toFixed()

    const createdDate = new Date(job['created-at'])

    const dueday = createdDate.getDate() + Number(remainingDaysIni)
    const dueDateInMs = createdDate.setDate(dueday)

    const timeDiffInMs = dueDateInMs - Date.now()
    // transformar milli em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffInMs / dayInMs)

    // restam x dias
    return dayDiff
  },

  calculateBudget: (job, valueHour) => Number(valueHour) * Number(job["total-hours"])
}