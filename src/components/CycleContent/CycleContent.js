import React from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { searchBikePoints } from '../../utils/api'
import { formatEntry } from '../../utils/helpers'
import PropTypes from 'prop-types'

import styles from './CycleContent.module.css'

class CycleContent extends React.Component {
  state = {
    text: '',                     // Text input
    bikePoints: [],               // Result from GET request
    queries: this.props.queries,  // Stores results from previous requests
    querySubmitted: ''            // Text sent on the GET request
  }

  componentDidUpdate = ({ queries }) => {
    if (queries !== this.props.queries) {
      this.setState({
        queries: this.props.queries
      })
    }
  }

  textChange = (event) => {
    this.setState(
      { text: event.target.value },
      () => {
        if (this.state.text === '') {
          this.setState({
            bikePoints: []
          })
        }
      }
    )
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { text, queries } = this.state

    this.setState({
      querySubmitted: text
    })

    // only make the request if the search term has not been searched before
    try {
      if(!queries[text]) {
        const bikePoints = await searchBikePoints(text)

        // cache queries with the new bikePoints returned on the GET request
        this.setState(
          { bikePoints },
          () => { this.props.onSearchSubmitted(bikePoints, text) }
        )
      } else {
        this.setState({
          bikePoints: queries[text]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { text, bikePoints, queries, querySubmitted } = this.state

    return (
      <Card border='dark'>
        <Card.Header as='h2'>Cycle Hire</Card.Header>
        <Card.Body>
          <Form className={styles.searchForm} onSubmit={this.handleSubmit}>
            <Form.Label htmlFor='search'>Enter your search:</Form.Label>
            <div className={styles.flexRow}>
              <Form.Control
                id='search'
                type='text'
                value={text}
                onChange={this.textChange}
                placeholder='Use one word (e.g., regent, james)'/>
              <Button type='submit' disabled={!text}>
                Search
              </Button>
            </div>
          </Form>
          {bikePoints.length > 0 && text
            ? (
              <ListGroup className={styles.bikeList} variant='flush'>
                {bikePoints.map((point, index) => (
                  <ListGroup.Item key={index}>
                    {formatEntry(point)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )
            : null
          }
          {queries[querySubmitted] && queries[querySubmitted].length === 0
            ? <Card.Text className={styles.noPoints}>No bike points found for <b>{querySubmitted}</b></Card.Text>
            : null
          }
        </Card.Body>
      </Card>
    )
  }
}

CycleContent.propTypes = {
  queries: PropTypes.object.isRequired,
  onSearchSubmitted: PropTypes.func.isRequired
}

export default CycleContent