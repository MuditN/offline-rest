import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Country } from "./models";

const initialState = { alpha2Code: "bc", name: "TeswBC" };

function App() {
  const [formState, updateFormState] = useState(initialState);
  const [country, updateCountry] = useState([]);

  useEffect(() => {
    fetchCountry();
    const subscription = DataStore.observe(Country).subscribe(() =>
      fetchCountry()
    );
    return () => subscription.unsubscribe();
  });

  function onChangeText(key, value) {
    updateFormState({ ...formState, [key]: value });
  }

  async function fetchCountry() {
    const country = await DataStore.query(Country);
    updateCountry(country);
  }

  async function getCountry() {
    if (!formState.alpha2Code) return;
    console.log(formState.alpha2Code);
    const data = await DataStore.query(Country, (c) =>
      c.alpha2Code("eq", formState.alpha2Code)
    );
    console.log(data);
    if (
      country.find((element) => {
        return element.alph2Code === formState.alpha2Code;
      }) === null
    ) {
      country.push(data[0]);
      updateCountry(country);
    }
  }

  async function createCountry() {
    //if (!formState.name) return
    await DataStore.save(new Country({ ...formState }));
    updateFormState(initialState);
  }

  return (
    <View style={container}>
      <Text style={heading}>Real Time Country Board</Text>
      <TextInput
        onChangeText={(v) => onChangeText("alpha2Code", v)}
        placeholder="Country alpha2Code"
        value={formState.alpha2Code}
        style={input}
        autoCapitalize="none"
      />
      <Text>
        alph2Code:{" "}
        <Text style={{ fontWeight: "bold", alph2Code: formState.alph2Code }}>
          {formState.alph2Code}
        </Text>
      </Text>
      <Button onPress={getCountry} title="Get Country" />
      {country.map((Country) => (
        <View key={Country.alpha2Code}>
          <View style={countryBg}>
            <Text style={countryName}>{Country.name}</Text>
          </View>
        </View>
      ))}
      <Button onPress={createCountry} title="Create Country" />
    </View>
  );
}

const container = { padding: 20, paddingTop: 80 };
const input = { marginBottom: 10, padding: 7, backgroundColor: "#ddd" };
const heading = { fontWeight: "normal", fontSize: 40 };
const countryBg = { backgroundColor: "white" };
const countryStyle = { padding: 20, marginTop: 7, borderRadius: 4 };
const countryName = { margin: 0, padding: 9, fontSize: 20 };

export default App;
