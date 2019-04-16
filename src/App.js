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
      <div>
        <h3>Input</h3>
        <textarea
          className={styles.commandsText}
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          spellCheck="false"
        />
      </div>

      <div className={styles.outputs}>
        <h3>Report Outputs</h3>
        <div className={styles.report}>
          <ul>
            {outputs.map(output => (
              <li key={shortid.generate()}>{output}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
