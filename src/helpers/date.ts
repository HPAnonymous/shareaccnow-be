export function roundDateByHours(date: Date) {
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)

  const prevHour: Date = date

  const nextHour = new Date(60 * 60 * 1000 + prevHour.getTime())

  return [prevHour, nextHour]
}

export function setBackwardDateByDay(date: Date, day: number) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - day)
  return newDate
}

export function modifyHourOfDate(date: Date, hour: number) {
  const newDate = new Date(date)
  const mlSecond = hour * 60 * 60 * 1000 + newDate.getTime()

  return new Date(mlSecond)
}
