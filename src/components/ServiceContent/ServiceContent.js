import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import styles from './ServiceContent.module.css'

const hasDisruptions = (servicesStatuses) => {
  return servicesStatuses.some(elem => elem.statusSeverity !== 10)
}

function ServiceContent({ selected }) {
  const { name, lineStatuses } = selected

  return (
    <Card border='dark'>
      <Card.Header as='h2'>{name}</Card.Header>
      <Card.Body>
        {hasDisruptions(lineStatuses)
          ? (
              <>
                <Card.Subtitle as='h5'>Service currently suffering disruptions</Card.Subtitle>
                <ListGroup className={styles.disruptionList} variant='flush'>
                  {lineStatuses.map((status, index) => (
                    <ListGroup.Item key={index} className={styles.disruptionItem}>
                      {status.reason}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )
          : <Card.Subtitle as='h5'>No service disruptions</Card.Subtitle>
        }
      </Card.Body>
    </Card>
  )
}

export default ServiceContent