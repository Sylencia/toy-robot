import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import styles from './App.module.scss'
import { runInstructions } from './utils/Utils'

const App = () => {
  const [instructions, setInstructions] = useState('')
  const [outputs, setOutputs] = useState([])
  useEffect(() => {
    setOutputs(runInstructions(instructions))
  }, [instructions])

  return (
    <div className={styles.app}>
      <textarea
        className={styles.commandsText}
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
        spellCheck="false"
      />

      <div className={styles.outputs}>
        {outputs.map(output => (
          <div key={shortid.generate()}>{output}</div>
        ))}
      </div>
    </div>
  )
}

export default App
