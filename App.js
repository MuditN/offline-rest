import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

import React, { useState, useEffect } from 'react'
import {Text, View, TextInput, Button } from 'react-native'
import { DataStore } from '@aws-amplify/datastore'
import {Country} from './models'


const initialState = { alpha2Code: 'in'}

function App() {


  const [formState, updateFormState] = useState(initialState)
  const [country, updateCountry] = useState([])

  useEffect(() => {
    fetchCountry()
    const subscription = DataStore.observe(Country).subscribe(() => fetchCountry())
    return () => subscription.unsubscribe()
  })

  function onChangeText(key, value){
    updateFormState({ ...formState, [key]: value })
  }

  async function fetchCountry(){
    const country = await DataStore.query(Country)
    updateCountry(country)  
  }

  async function getCountry(){
    if (!formState.alpha2Code) return
    await DataStore.query(Country, formState.alpha2Code) 
    await DataStore.save(new Country({ ...formState }))
  }

  async function createCountry(){
    if (!formState.name) return
    await DataStore.save(new Country({ ...formState }))
    updateFormState(initialState)
  }

  return (
    <View style={container}>
      <Text style={heading}>Real Time Country Board</Text>
      <TextInput
        onChangeText={v => onChangeText('alph2Code', v)}
        placeholder='Country alph2Code'
        value={formState.alph2Code}
        style={input}
        autoCapitalize='none'
      />
      <Text>alph2Code: <Text style={{fontWeight: 'bold', alph2Code: formState.alph2Code}}>{formState.alph2Code}</Text></Text>
      <Button onPress={getCountry()} name='Create Country' />
      {
        country.map(Country => (
          <View key={Country.alpha2Code}>
            <View style={countryBg}>
              <Text style={countryName}>{Country.name}</Text>
            </View>
          </View>
        ))
      }
    </View>
  )
}

const container = { padding: 20, paddingTop: 80 }
const input = { marginBottom: 10, padding: 7, backgroundColor: '#ddd' }
const heading = { fontWeight: 'normal', fontSize: 40 }
const countryBg = { backgroundColor: 'white' }
const countryStyle = { padding: 20, marginTop: 7, borderRadius: 4 }
const countryName = { margin: 0, padding: 9, fontSize: 20  }

export default App