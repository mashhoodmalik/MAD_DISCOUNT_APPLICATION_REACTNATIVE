import * as React from 'react';
import { useState } from 'react';
import { DataTable } from 'react-native-paper';

import {Text,View,StyleSheet,TextInput,TouchableOpacity,StatusBar,FlatList, Modal} from 'react-native';

export default function History({ navigation, route }) {
  const [HistoryData, setHistoryData] = useState(route.params.storeDataObject);
  const [Visibility, setVisibility] = useState(false);

  const clearHistory = () => {
    for (let i = 0; i < HistoryData.length; i++) {
      setHistoryData(delete HistoryData[i]);
    }
  };

  const DeleteData = (itemID) => {
      setHistoryData((currentItems) => {
        return currentItems.filter((item) => item.id !== itemID);
        
      });
  };

  return (
    <View style={styles.MainView}>
      <StatusBar backgroundColor="white" />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>PRICE</DataTable.Title>
          <DataTable.Title numeric>DISCOUNT</DataTable.Title>
          <DataTable.Title numeric>NEW PRICE</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={HistoryData}
          renderItem={({ item, index }) => {
            if (item != undefined) {
              return (
                <TouchableOpacity onPress={() => {DeleteData(item.id)}}>
                  <DataTable.Row>
                    <DataTable.Cell>Rs {item.price}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.discount_Percentage}%
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      Rs {item.final_Price_Var}
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={(index) => {
            return index;
          }}
        />
      </DataTable>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {setVisibility(true), clearHistory()}}
          style={styles.Button_clearHistory}>
          <Text style={styles.Button_clearHistoryText}>Clean Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
    // backgroundColor: 'black',
  },
  Button_clearHistory: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    height: 30,
    width: 300,
  },
  Button_clearHistoryText: {
    fontSize: 13,
    color: 'blue',
  },
  
});