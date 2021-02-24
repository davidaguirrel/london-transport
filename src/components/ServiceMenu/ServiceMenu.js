import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import PropTypes from 'prop-types'
import ExtraServiceInfo from '../ExtraServiceInfo/ExtraServiceInfo'

import styles from './ServiceMenu.module.css'

const ServiceMenu = ({ services, onSelectService, onCycleHire }) => {
  return (
    <Navbar bg='light'>
      <Nav fill className={`flex-column ${styles.fullWidth}`}>
        {services.map((service) => (
          <div key={service.id} className={styles.serviceItem}>
            <Nav.Link onClick={() => onSelectService(service)}>
              {service.name}
            </Nav.Link>
            <ExtraServiceInfo types={service.serviceTypes} statuses={service.lineStatuses} />
          </div>
        ))}
        <div className={styles.serviceItem}>
          <Nav.Link onClick={() => onCycleHire()}>
            Cycle Hire
          </Nav.Link>
        </div>
      </Nav>
    </Navbar>
  )
}

ServiceMenu.propTypes = {
  services: PropTypes.array.isRequired,
  onSelectService: PropTypes.func.isRequired,
  onCycleHire: PropTypes.func.isRequired
}

export default ServiceMenu