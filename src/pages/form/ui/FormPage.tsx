import { useState, type SyntheticEvent } from 'react'
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material'
import { SimpleForm, StepByStepForm } from 'features/form'

type TFormTab = 'simple' | 'stepByStep'

const tabOptions: Array<{ label: string; value: TFormTab }> = [
  { label: 'Простая форма', value: 'simple' },
  { label: 'Последовательная форма', value: 'stepByStep' },
]

export const FormPage = () => {
  const [activeTab, setActiveTab] = useState<TFormTab>('simple')

  const handleTabChange = (_event: SyntheticEvent, value: TFormTab) => {
    setActiveTab(value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={2} sx={{ maxWidth: 560, width: '100%', mt: 4, mx: 'auto' }}>
        <Tabs onChange={handleTabChange} value={activeTab} variant="fullWidth">
          {tabOptions.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Paper>

      <Typography sx={{ maxWidth: 560, mt: 2, mx: 'auto' }} variant="body2">
      </Typography>

      {activeTab === 'simple' ? <SimpleForm /> : null}
      {activeTab === 'stepByStep' ? <StepByStepForm /> : null}
    </Box>
  )
}
