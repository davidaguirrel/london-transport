import React from 'react'
import PropTypes from 'prop-types'

class Loading extends React.Component {
  state = {
    content: this.props.text
  }

  componentDidMount() {
    const { text } = this.props

    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }))
    }, 200)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <p>{this.state.content}</p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
}

export default Loading