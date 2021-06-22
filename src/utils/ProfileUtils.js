module.exports = {
  calculateValueHours(dataBody) { 
    // req.body para pegar os dados
    const data = dataBody

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

  }
}