import React from 'react'
import Tooltip from '../Tooltip/Tooltip'
import PropTypes from 'prop-types'
import { ImWarning } from 'react-icons/im'
import { TiWeatherNight } from 'react-icons/ti'

const hasNightService = (servicesTypes) => {
  return servicesTypes.some(elem => elem.name === 'Night')
    ? (
        <Tooltip text='Night service provided'>
          <TiWeatherNight size={17}/>
        </Tooltip>
      )
    : null
}

const hasDisruptions = (servicesStatuses) => {
  return servicesStatuses.some(elem => elem.statusSeverity !== 10)
    ? (
        <Tooltip text='Service disrupted'>
          <ImWarning size={13}/>
        </Tooltip>
    )
    : null
}

const ExtraServiceInfo = ({ types = [], statuses = [] }) => {
  return (
    <>
      {hasNightService(types)}
      {hasDisruptions(statuses)}
    </>
  )
}

ExtraServiceInfo.propTypes = {
  types: PropTypes.array,
  statuses: PropTypes.array
}

export default ExtraServiceInfo