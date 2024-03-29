import { drizzleConnect } from 'drizzle-react'
import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class LoadingContainer extends Component {
  render() {
    if (this.props.web3.status === 'failed')
    {
      if (this.props.errorComp) {
        return this.props.errorComp
      }

      return(
        <main className="container loading-screen">
          <div className="pure-g">
            <div className="pure-u-1-1">
                <center>
                    <h1>⚠️</h1>
                    <p>This browser has no connection to the Ethereum network. <br/>
                        Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers.</p>
                </center>
            </div>
          </div>
        </main>
      )
    }

    if (this.props.web3.status === 'initialized' && Object.keys(this.props.accounts).length === 0)
    {
      return(
        <main className="container loading-screen">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <center>
              <h1>🦊</h1>
              <br/>
              <p><strong>We can't find any Ethereum accounts!</strong> <br/><br/>
              Please check and make sure Metamask or your browser are pointed at the <b>Rinkeby Network</b> and your account is unlocked.
              </p>
              </center>
            </div>
          </div>
        </main>
      )
    }
    if (this.props.drizzleStatus.initialized)
    {
      return Children.only(this.props.children)
    }
    if (this.props.loadingComp) {
      return this.props.loadingComp
    }
    return(
      <main className="container loading-screen">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>⚙️</h1>
            <p>Loading dapp...</p>
          </div>
        </div>
      </main>
    )
  }
}
LoadingContainer.contextTypes = {
  drizzle: PropTypes.object
}
/*
 * Export connected component.
 */
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3
  }
}
export default drizzleConnect(LoadingContainer, mapStateToProps)