// src/App.jsx

import React, { useState } from "react"
import { initWeb3AuthCore } from "./initWeb3AuthCore"
import { fakeTelegramUser, generateFakeIdToken } from "./fakeTelegram"

function App() {
  const [privateKey, setPrivateKey] = useState(null)

  const handleLogin = async () => {
    const idToken = generateFakeIdToken(fakeTelegramUser)
    try {
      const pk = await initWeb3AuthCore(idToken)
      setPrivateKey(pk)
    } catch (e) {
      console.error("Web3Auth Error:", e)
    }
  }

  return (
    <div style={{ padding: 20, marginLeft: 20, }}>
      <h1>BTC Wallet MVP - Phase 2 (Web3Auth Core)</h1>
      <button onClick={handleLogin}>Login with Telegram (Fake)</button>
      {privateKey && (
        <div style={{ marginTop: 20 }}>
          <strong>Private Key:</strong>
          <pre>{privateKey}</pre>
        </div>
      )}
    </div>
  )
}

export default App
