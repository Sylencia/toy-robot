import React, { useState } from 'react'
import styles from './App.module.scss'
import { validateCommand } from './utils/Utils'

const App = () => {
  const [commands, setCommands] = useState('')
  return (
    <div className={styles.app}>
      <textarea
        className={styles.commandsText}
        value={commands}
        onChange={e => setCommands(e.target.value)}
        spellCheck="false"
      />

      {commands.split('\n').map(command => (
        <div key={command}>
          {command}: {validateCommand(command).toString()}
        </div>
      ))}
    </div>
  )
}

export default App
