import React, { Component } from 'react';
import Box from '@meditrak/base/dist/components/Box';
import Web3 from 'web3';

import './GenKeyContainer.scss';

import Heading from '@meditrak/base/dist/components/Heading';
import FormField from '@meditrak/base/dist/components/FormField';
import TextInput from '@meditrak/base/dist/components/TextInput';
import Button from '@meditrak/base/dist/components/Button';

const CLASSROOT = 'genkey-container';

const web3 = new Web3();

class GenKeyContainer extends Component {
  constructor() {
    super();

    this.state = {
      isGenerated: false,
      isShowPrivateKey: false,
      address: null,
      privateKey: null,
    };
  }

  onGenKey = () => {
    this.setState({
      isGenerated: false,
      isShowPrivateKey: false,
      address: null,
      privateKey: null,
    });
    const account = web3.eth.accounts.create();
    const { address, privateKey } = account;
    this.setState({ isGenerated: true, address, privateKey });
  };

  onToggleShowPrivateKey = () => {
    this.setState({ isShowPrivateKey: !this.state.isShowPrivateKey });
  };

  render() {
    return (
      <div className={`${CLASSROOT} container`}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {this.state.isGenerated ? (
              <div>
                <Heading align="center">Create A New Keypair</Heading>
                <Box className="content-wrapper" justify="center" align="center">
                  <Box margin="medium" align="center" justify="start">
                    <Heading tag="h2" strong>
                      Your address:
                    </Heading>
                    <Heading tag="h3">{this.state.address}</Heading>
                    <Heading tag="h2" strong>
                      Your private key:
                    </Heading>
                    <Heading tag="h3">
                      {this.state.isShowPrivateKey ? (
                        <span>
                          {this.state.privateKey}{' '}
                          <i
                            style={{ marginLeft: '5px', cursor: 'pointer' }}
                            className="fa fa-lock"
                            aria-hidden="true"
                            onClick={this.onToggleShowPrivateKey}
                          />
                        </span>
                      ) : (
                        <i
                          style={{ cursor: 'pointer' }}
                          className="fa fa-unlock-alt fa-2x"
                          aria-hidden="true"
                          onClick={this.onToggleShowPrivateKey}
                        />
                      )}
                    </Heading>
                    <Button
                      label={this.state.isGenerated ? 'Generate again' : 'Generate'}
                      onClick={this.onGenKey}
                      primary
                    />
                    <Heading tag="h4">
                      <i>
                        <i
                          className="fa fa-exclamation-circle fa-lg"
                          aria-hidden="true"
                          style={{ marginRight: '5px' }}
                        />
                        Please store your private key carefully, you will need this key to access
                        your file later
                      </i>
                    </Heading>
                  </Box>
                </Box>
              </div>
            ) : (
              <Box justify="center" align="center" pad="medium">
                <Heading align="center">Create A New Keypair</Heading>
                <Button
                  label={this.state.isGenerated ? 'Generate again' : 'Generate'}
                  onClick={this.onGenKey}
                  primary
                />
              </Box>
            )}
          </div>
        </div>
      </div>
    );
  }
}

GenKeyContainer.propTypes = {};

GenKeyContainer.defaultProps = {};

export default GenKeyContainer;
