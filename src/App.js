import React, { useState } from 'react'
import './App.scss'
import { Button } from '@carbon/react'

import { CreateSidePanel, SidePanel } from './components'
import { Add } from '@carbon/icons-react'

const defaultStoryProps = {
  title: 'Create partitions',
  subtitle: 'Specify the details of the partitions you\'re creating',
  formTitle: 'Core configuration',
  formDescription:
    'We recommend you formDescriptionill out and evaluate these details at a minimum before deploying your topic.',
  primaryButtonText: '确认',
  secondaryButtonText: '关闭',
  selectorPrimaryFocus: '.bx--text-input'
}

function App () {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  
  return (
    <div>
      App
      <div>
        <Button onClick={() => setOpen(!open)}>
          {open ? 'Close panel' : 'Open panel'}
        </Button>
        <Button onClick={() => setOpen2(!open2)}>
          {open ? 'Close panel2' : 'Open panel2'}
        </Button>
      </div>
  
      <CreateSidePanel
        {...defaultStoryProps}
        open={open}
        onRequestClose={() => setOpen(false)}
        selectorPageContent="#cloud-and-cognitive-page-content"
      >
        aaaaaaaa
      </CreateSidePanel>
      
      <SidePanel
        open={open2}
        onRequestClose={() => setOpen2(false)}
        title="Incident management2"
        subtitle="Testing subtitle text.2"
        actions={[
          {
            label: 'icon',
            onClick: () => setOpen2(false),
            renderIcon: Add,
            iconDescription: 'Icon Description',
            hasIconOnly: true,
            kind: 'secondary'
          },
          {
            label: 'Submit',
            onClick: () => setOpen2(false),
            kind: 'primary'
          },
          {
            label: 'Cancel',
            onClick: () => setOpen2(false),
            kind: 'secondary'
          }
        ]}
      >
        bbbbbb
      </SidePanel>
    </div>
  )
}

export default App
