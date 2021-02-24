import axios from 'axios'

const serviceUrl = 'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true'
const bikeUrl = 'https://api.tfl.gov.uk/BikePoint'

export const fetchData = async () => {
  try {
    const { data } = await axios.get(serviceUrl)

    const sortedData = data.sort((a, b) => (
      (a.modeName < b.modeName) ? -1 : ((a.modeName === b.modeName) ? ((a.name < b.name) ? -1 : 1) : 1)
    ))

    return sortedData

  } catch (error) {
    console.log(error)
  }
}

export const searchBikePoints = async (text) => {
  try {
    const { data } = await axios.get(`${bikeUrl}/Search?query=${text}`)

    return data

  } catch (error) {
    console.log(error)
  }
}