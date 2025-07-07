// src/initWeb3AuthCore.js

import { Web3AuthCore } from "@web3auth/core"
import { OpenloginAdapter } from "@web3auth/openlogin-adapter"
import { CHAIN_NAMESPACES } from "@web3auth/base"

const clientId = "YOUR_WEB3AUTH_CLIENT_ID" // Replace with your Web3Auth Core client ID

export const initWeb3AuthCore = async (idToken) => {
  const web3auth = new Web3AuthCore({
    clientId,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.OTHER, // We're not using EVM for now
      displayName: "Bitcoin",
      ticker: "BTC",
      tickerName: "Bitcoin",
    },
  })

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      network: "testnet", // or "mainnet" in production
      uxMode: "redirect",
      loginConfig: {
        telegram_custom: {
          verifier: "YOUR_VERIFIER_NAME", // Set this up on Web3Auth dashboard
          typeOfLogin: "jwt",
          clientId,
        },
      },
    },
  })

  web3auth.configureAdapter(openloginAdapter)

  await web3auth.init()

  const provider = await web3auth.connectTo("openlogin", {
    loginProvider: "telegram_custom",
    extraLoginOptions: {
      id_token: idToken,
      domain: "localhost", // Use your local domain
      verifierIdField: "sub",
    },
  })

  const privateKey = await provider.request({ method: "private_key" })
  return privateKey
}
