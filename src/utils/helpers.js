const extractDigits = (id) => {
  const digits = id.replace( /^\D+/g, '')
  return digits
}

export const formatEntry = (bikePoint) => {
  return `${extractDigits(bikePoint.id)} 
    ${bikePoint.commonName} (${bikePoint.lat}, ${bikePoint.lon})`
}