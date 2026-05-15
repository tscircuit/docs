# Testing and Deploying on XDC Network - Bounty Guide

## Overview
Guide for completing bounties related to testing and deploying smart contracts on the XDC Network.

## Prerequisites
```bash
npm install -g truffle@latest
npm install @xdcpay/truffle-provider
```

## Network Configuration
```javascript
// truffle-config.js
const XDCProvider = require('@xdcpay/truffle-provider');

module.exports = {
  networks: {
    xinfin: {
      provider: () => new XDCProvider('YOUR_PRIVATE_KEY', 'https://erpc.xinfin.network'),
      network_id: 50,
      gas: 6721975,
    },
    apothem: {
      provider: () => new XDCProvider('YOUR_PRIVATE_KEY', 'https://erpc.apothem.network'),
      network_id: 51,
      gas: 6721975,
    }
  }
};
```

## Deployment Steps
1. Write and test contracts locally
2. Deploy to Apothem testnet
3. Verify contract on XDC explorer
4. Test all functions
5. Deploy to XinFin mainnet

## Testing Checklist
- [ ] Unit tests pass
- [ ] Gas optimization verified
- [ ] Events emitted correctly
- [ ] Access control tested
- [ ] Edge cases covered

## Bounty Submission
Include in PR:
- Deployed testnet contract address
- Verified contract link
- Test results
- Wallet for reward: XDC address
