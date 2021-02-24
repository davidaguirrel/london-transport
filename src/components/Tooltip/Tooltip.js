import React from 'react'
import Hover from '../Hover/Hover'
import PropTypes from 'prop-types'

import styles from './Tooltip.module.css'

const Tooltip = ({ text, children }) => {
  return (
    <Hover>
      {(hovering) => (
        <div className={styles.container}>
          {hovering === true && <div className={styles.tooltip}>{text}</div>}
          {children}
        </div>
      )}
    </Hover>
  )
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element
}

export default Tooltip