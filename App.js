import Amplify from "@aws-amplify/core";
import config from "./aws-exports";
Amplify.configure(config);

import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Request, Response } from "./models";

const initialState = { alpha2Code: "bc", name: "TeswBC" };

function App() {
  const [formState, updateFormState] = useState(initialState);
  const [response, updateResponse] = useState([]);
  const [request, updateRequest] = useState([]);

  useEffect(() => {
    fetchRequest();
    fetchResponse();
    const subscription = DataStore.observe(Request).subscribe(() =>
      msg => {
        console.log(msg.name);
        fetchRequest();
      });
      const subscription2 = DataStore.observe(Response).subscribe(() =>
      msg => {
        console.log(msg.name);
        fetchResponse();
      });

    return () => {subscription.unsubscribe();
      subscription2.unsubscribe();}
  });

  function onChangeText(key, value) {
    updateFormState({ ...formState, [key]: value });
  }

  async function fetchRequest() {
    const request = await DataStore.query(Request);
    updateRequest(request);
  }
  async function fetchResponse() {
    const response = await DataStore.query(Response);
    updateResponse(response);
  }

  async function getRequest() {
    if (!formState.alpha2Code) return;
    console.log(formState.alpha2Code);
    const test = await DataStore.query(Request);
    console.log(test);
    const data = await DataStore.query(Request, (c) =>
      c.alpha2Code("eq", formState.alpha2Code.toUpperCase())
    );
    

    if (response.filter(function(e) { return e.alpha2Code === formState.alpha2Code; }).length === 0) {
      formState.name = data[0].name
      createResponse();
    }
  }

  async function createResponse() {
    if (!formState.name) return
    var test = await DataStore.save(new Response({ ...formState }));
    console.log(test);
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
      <Button onPress={getRequest} title="Get Country" />
      {response.map((Response) => (
        <View key={Response.alpha2Code}>
          <View style={countryBg}>
            <Text style={countryName}>{Response.name}</Text>
          </View>
        </View>
      ))}
      <Button onPress={createResponse} title="Create Country" />
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
