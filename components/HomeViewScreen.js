import * as React from 'react';
import { useState } from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity,StatusBar,Modal} from 'react-native';

export default function HomeSViewScreen({ navigation, route }) {
 

 //ALL NECESSARY USESTATES USED FOR THE DEVELOPMENT
  const [price, setprice] = useState('');
  const [price_discount, setPrice_discount] = useState('');
  const [Amount_saved, setAmount_saved] = useState('0.00');
  const [totalDiscountedPrice, settotalDiscountedPrice] = useState('0.00');
  const [Error, setError] = useState('');
  const [storeData, setstoreData] = useState([]);
  const [Visibility, setVisibility] = useState(false);
  const [ButtonState, setButtonState] = useState(true);


  //DISCOUNT CALCULATION FUNCTION

  const calculateDiscount = () => {
    if (price != '' && price_discount != '') {
      if (price_discount <= 100 && price >= 0 && price_discount >= 0) {
        var saved = (price * price_discount) / 100;
        var final_Price = price - saved;
        setAmount_saved(saved.toFixed(2));
        settotalDiscountedPrice(final_Price.toFixed(2));
        setError('');
      } else if (price_discount > 100) {
        setError('Discount is not less than 100%');
      } else if (price < 0) {
        setError('Price is not greater than 0');
      } else if (price_discount < 0) {
        setError('Discount percentage cannot be less than 0');
      }
    } else {
      setError('Please fill all fields');
    }
  };

  const saveResult = () => {
    if (price != '' || price_discount != '') {
      const resultObj = {
        id: Math.random().toString(),
        price: price,
        discount_Percentage: price_discount,
        final_Price_Var: totalDiscountedPrice,
      };

      setstoreData((oldstoreData) => [...oldstoreData, resultObj]);
      setprice('');
      setPrice_discount('');
      setButtonState(true);
      settotalDiscountedPrice('0.00');
      setAmount_saved('0.00');
      setVisibility(true);
    }
  };

  
    return (
      <View style={styles.box}>
        <View style={{ marginTop: 100 }} />
        <Text style={[styles.Title, { fontFamily: 'Times New Roman' }]}>
          Ahmed Khalid
        </Text>
        <Text style={[styles.Title, { fontFamily: 'Times New Roman' }]}>
          FA18-BCS-007
        </Text>
        <Text style={[styles.Title, { fontFamily: 'Times New Roman', marginTop: 20 }]}>
          Discount Application
        </Text>
        <View style={{ marginTop: 60 }} />


       <TouchableOpacity
          onPress={() =>
            navigation.navigate('HistoryView', {
              storeDataObject: storeData,
            })
          }
          style={styles.Button_Store}>
          <Text style={styles.Button_StoreText}>View History</Text>
        </TouchableOpacity>

        {/* Output Results */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.result}>Price Discount: </Text>
          <Text style={styles.Text_DiscountPrice}> Rs {totalDiscountedPrice}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.result}>Amount Saved: </Text>
          <Text style={[styles.Text_DiscountPrice, { color: 'black' }]}>
            {' '}
            Rs {Amount_saved}
          </Text>
        </View>

        {/* Result Saved Modal */}
      

        <View style={{ marginTop: 10 }} />
        <Text style={{ fontSize: 15, color: '#E74C3C' }}>{Error}</Text>
        <View style={{ marginTop: 10 }} />

        {/* Text Fields */}
        <TextInput
          keyboardType={'number-pad'}
          value={price}
          onChangeText={(orgPrice) => {
            orgPrice == '' || price_discount == ''
              ? setButtonState(true)
              : setButtonState(false);
            setprice(orgPrice);
          }}
          style={styles.InputText}
          placeholder={'Enter The Price'}
          placeholderTextColor="lightgrey"
        />
        <View style={{ paddingTop: 10 }} />
        <TextInput
          value={price_discount}
          keyboardType={'number-pad'}
          onChangeText={(discountPercentage) => {
            discountPercentage == '' || price == ''
              ? setButtonState(true)
              : setButtonState(false);
            setPrice_discount(discountPercentage);
          }}
          style={styles.InputText}
          placeholder={'Enter Discount Percentage'}
          placeholderTextColor="lightgrey"
        />
        <View style={{ paddingTop: 20 }} />

        <TouchableOpacity
          onPress={() => calculateDiscount()}
          style={styles.Button_Calculation}>
          <Text style={styles.Button_CalculationText}>Check</Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 20 }} />

        <TouchableOpacity
          disabled={ButtonState}
          onPress={() => saveResult()}
          style={[
            styles.Button_save,
            ButtonState == true
              ? {
                  borderColor: 'red',
                }
              : {
                  borderColor: 'green',
                },
          ]}>
          <Text
            style={[
              styles.Button_saveText,
              ButtonState == true
                ? {
                    color: 'gray',
                  }
                : {
                    color: '#b5c1c6',
                  },
            ]}>
            Store Data
          </Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 50 }} />

        
      </View>
    );
  }

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  Title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '100',
    letterSpacing: 2,
    fontFamily: 'Times New Roman',
  },
  InputText: {
    height: 50,
    width: 280,
    borderColor: 'black',
    borderWidth: 5,
    paddingLeft: 10,
    fontSize: 15,
    borderRadius: 10,
    color: 'white',
  },
  Button_Calculation: {
    height: 50,
    width: 200,
    backgroundColor: '#33bf5c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 2,
  },
  Button_CalculationText: {
    fontSize: 20,
    color: 'white',
  },
  Button_save: {
    height: 40,
    width: 200,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  Button_saveText: {
    fontSize: 18,
    color: 'black',
  },
  Button_Store: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    height: 40,
    width: 200,
    marginBottom:40
  },
  Button_StoreText: {
    fontSize: 13,
    color: 'white',
  },
  result: {
    fontSize: 25,
    color: 'white',
  },
  Text_DiscountPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: 'lightgreen',
  },
  ViewStyle: {
    margin: 10,
    backgroundColor: 'lightblue',
    padding: 20,
    alignItems: 'center',
    width: 250,
    height: 150,
  },
  ViewText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Times New Roman',
  },
  ViewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    padding: 10,
    width: 180,
    height: 40,
  },
  View_Centre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  Text_Styling: {
    color: 'white',
  },
});