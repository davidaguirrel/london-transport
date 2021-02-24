import React from 'react'
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { fetchData } from './utils/api'
import Loading from './components/Loading/Loading'
import ServiceMenu from './components/ServiceMenu/ServiceMenu'
import ServiceContent from './components/ServiceContent/ServiceContent'
import CycleContent from './components/CycleContent/CycleContent'

class App extends React.Component {
  state = {
    services: [],           // Result from GET request
    selectedService: null,  // Service selected on the menu
    cycleHire: false,       // Cycle Hire selected on the menu
    queries: {},            // Stores results from previous requests
    error: null
  }

  async componentDidMount() {
    try {
      const services = await fetchData()

      this.setState({ services })

    } catch (error) {
      console.log(error)

      this.setState({
        error: 'There was an error while loading the services'
      })
    }
  }

  isLoading = () => {
    const { services, error } = this.state
    return (services.length === 0 && error) === null
  }

  handleSelectService = (selectedService) => {
    this.setState({
      selectedService,
      cycleHire: false
    })
  }

  selectCycle = () => {
    this.setState({
      cycleHire: true,
      selectedService: null
    })
  }

  searchSubmitted = (bikePoints, searchTerm) => {
    this.setState(({ queries }) => ({
      queries: {
        ...queries,
        [searchTerm]: bikePoints
      }
    }))
  }

  render() {
    const { services, selectedService, cycleHire, queries } = this.state

    return (
      <Container className="App">
        {this.isLoading() && <Loading text='Loading Services' />}
        <Row>
          <Col xs={12} md={3}>
            {services.length > 0
              ? <ServiceMenu
                  services={services}
                  onSelectService={this.handleSelectService}
                  onCycleHire={this.selectCycle} />
              : null
            }
          </Col>
          <Col xs={12} md={9}>
            {selectedService
              ? <ServiceContent selected={selectedService} />
              : null
            }
            {cycleHire
              ? <CycleContent queries={queries} onSearchSubmitted={this.searchSubmitted}/>
              : null
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
