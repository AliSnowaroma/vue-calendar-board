export const getStartDate = (date) => {
  return new Date(date.getFullYear(),date.getMonth(),1)
}

export const getDay = (date) => {
  return new Date(date).getDay()
}
