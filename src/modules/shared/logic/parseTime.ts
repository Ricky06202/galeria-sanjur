export const parseTime = (minutos: number) => {
  const horas = Math.trunc(minutos / 60)

  let tiempo = ''
  if (horas) tiempo += `${horas}h `
  if (minutos % 60) tiempo += `${minutos % 60}m`

  return tiempo
}
