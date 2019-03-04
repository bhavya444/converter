import React from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import ActionSwapVert from 'material-ui/svg-icons/action/swap-vert'
import AutoComplete from 'material-ui/AutoComplete'
import CoinList from './CoinList'

export class CoinForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleReverseClick = this.handleReverseClick.bind(this)
    this.handleFromCoinChange = this.handleFromCoinChange.bind(this)
    this.handleToCoinChange = this.handleToCoinChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleNewFromRequest = this.handleNewFromRequest.bind(this)
    this.handleNewToRequest = this.handleNewToRequest.bind(this)
    this.state = {
      fromCoin: "",
      toCoin: "",
      value: null,
      dataSource: CoinList
    }
  }

  // reverse text and call the reverseClick prop.
  handleReverseClick() {
    var fromCoin = this.state.fromCoin;
    var toCoin = this.state.toCoin;
    this.setState({
      fromCoin: toCoin,
      toCoin: fromCoin
    }, () => this.props.handleReverseClick())
  }

  // handle coin changes by setting state and calling the handler
  handleFromCoinChange(searchText, dataSource, params) {
    this.setState({fromCoin: searchText})
    this.props.handleFromCoinChange(searchText)
  }
  handleToCoinChange(searchText, dataSource, params) {
    this.setState({toCoin: searchText})
    this.props.handleToCoinChange(searchText)
  }

  handleValueChange(e, newVal) {
    this.props.handleValueChange(newVal)
  }

  handleNewFromRequest(chosenRequest, index) {
    if (index !== -1) {
      var newCoin = this.state.dataSource[index].value
      this.setState({
        fromCoin: newCoin
      })
      this.props.handleFromCoinChange(newCoin)
    }
  }

  handleNewToRequest(chosenRequest, index) {
    if (index !== -1) {
      var newCoin = this.state.dataSource[index].value
      this.setState({
        toCoin: newCoin
      })
      this.props.handleToCoinChange(newCoin)
    }
  }

  render() {
    return (
     
      <Paper style={{margin:24, padding: 8,borderStyle:'solid'}}>
        <p style={{fontSize: 20, margin: 12}}>Input Conversion Values</p>
        <div style={{margin: 8}}>
          <AutoComplete
            floatingLabelText="From"
            searchText={this.state.fromCoin}
            filter={AutoComplete.caseInsensitiveFilter}
            onNewRequest={this.handleNewFromRequest}
            onUpdateInput={this.handleFromCoinChange}
            dataSource={this.state.dataSource}/><br/>
          <center><FlatButton secondary={true}
            style={{display: 'flex', alignItems: 'center'}}
            icon={<ActionSwapVert />}
            label="Reverse"
            onClick={this.handleReverseClick}/></center>
          <AutoComplete
            floatingLabelText="To"
            searchText={this.state.toCoin}
            filter={AutoComplete.caseInsensitiveFilter}
            onNewRequest={this.handleNewToRequest}
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleToCoinChange}/> <br/>
          <TextField
            floatingLabelText="Amount"
            onChange={this.handleValueChange} />
            <br/>
        </div>
      </Paper>
    )
  }
}
