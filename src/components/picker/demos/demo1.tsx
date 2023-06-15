import React, { useEffect, useState } from 'react'
import { Button, Picker } from 'components'
import { DemoBlock } from 'demos'
import './demo1.less'


const days = [
  [
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
  ],
  [
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'December', value: '12' },
    { label: 'January', value: '1' },
  ],
  [
    { label: '1993', value: '1993' },
    { label: '1994', value: '1994' },
    { label: '1995', value: '1995' },
    { label: '1996', value: '1996' },
    { label: '1997', value: '1997' },
    { label: '1998', value: '1998' },
    { label: '1999', value: '1999' }
  ],
]

const time = [
  [
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
  ],
  [
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ],
]

const year = [
  [
    { label: '1993', value: '1993' },
    { label: '1994', value: '1994' },
    { label: '1995', value: '1995' },
    { label: '1996', value: '1996' },
    { label: '1997', value: '1997' },
    { label: '1998', value: '1998' },
    { label: '1999', value: '1999' }
  ]
]

export default () => {
  const [customizeVisible1, setCustomizeVisible1] = useState(false)
  const [customizeValue1, setCustomizeValue1] = useState<(string | null)[]>(['12', '3', '1999'])

  const [customizeVisible2, setCustomizeVisible2] = useState(false)
  const [customizeValue2, setCustomizeValue2] = useState<(string | null)[]>(['12', '3'])

  const [customizeVisible3, setCustomizeVisible3] = useState(false)
  const [customizeValue3, setCustomizeValue3] = useState<(string | null)[]>(['2000'])

  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState<(string | null)[]>(['12', '3', '1999'])


  useEffect(() => {
    console.log(customizeValue1)
  }, customizeValue1)

  useEffect(() => {
    console.log(customizeValue2)
  }, customizeValue2)

  useEffect(() => {
    console.log(customizeValue3)
  }, customizeValue3)

  useEffect(() => {
    console.log(value)
  }, value)
  return (
    <>
      
      <DemoBlock title='3列日期选择'>
        <Button
          onClick={() => {
            setCustomizeVisible1(true)
          }}
        >
          选择
        </Button>
        <Picker
          options={days}
          showSelectedBorder={false}
          title={'select date'}
          visible={customizeVisible1}
          onClose={() => {
            setCustomizeVisible1(false)
          }}
          value={customizeValue1}
          defaultValue={['12', '3', '1999']}
          onConfirm={v => {
            setCustomizeValue1(v)
          }}
          onSelect={v => {
            console.log('onselect', v)
          }}
          
        />
      </DemoBlock>
      <DemoBlock title='2列时间选择'>
        <Button
          onClick={() => {
            setCustomizeVisible2(true)
          }}
        >
          选择
        </Button>
        <Picker
          showSelectedBorder={false}
          options={time}
          title={'Select hour and minute'}
          visible={customizeVisible2}
          onClose={() => {
            setCustomizeVisible2(false)
          }}
          value={customizeValue2}
          defaultValue={['12', '3']}
          onConfirm={v => {
            setCustomizeValue2(v)
          }}
          onSelect={v => {
            console.log('onselect', v)
          }}
        />
      </DemoBlock>
      <DemoBlock title='单列年份选择'>
        <Button
          onClick={() => {
            setCustomizeVisible3(true)
          }}
        >
          选择
        </Button>
        <Picker
          options={year}
          showSelectedBorder={false}
          title={'select year'}
          visible={customizeVisible3}
          onClose={() => {
            setCustomizeVisible3(false)
          }}
          value={customizeValue3}
          defaultValue={['1999']}
          onConfirm={v => {
            setCustomizeValue3(v)
          }}
          onSelect={v => {
            console.log('onselect', v)
          }}
        />
      </DemoBlock>
      <DemoBlock title='自定义样式'>
        <Button
          onClick={() => {
            setVisible(true)
          }}
        >
          选择
        </Button>
        <Picker
          buttonPosition='top'
          options={days}
          title={value}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
          value={value}
          defaultValue={['12', '3', '1999']}
          onConfirm={v => {
            setValue(v)
          }}
          onSelect={v => {
            console.log('onselect', v)
          }}
          showScrollStyle={false}
          selectedStyle={{ color: 'black', 'fontWeight': 'normal', fontSize: '16px', height: '20px' }}
          popupProps={{
            bodyStyle: {
              borderRadius: 0
            }
          }}
        />
      </DemoBlock>
    </>
  )
}
