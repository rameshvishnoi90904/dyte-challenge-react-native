import React, { useState, useRef, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	Button,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const {width, height} = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import ScannerView from "./ScannerView";
function GridView({navigation}) {
	const [initialLoading, setInitialLoading] = useState(true);
	const [docList, setDocList] = useState([]);

	useEffect(() => {
		// get old scanned docs

	},[]);

	const uploadNewDoc = () => {
		// launch Scanner
		navigation.navigate("Scan")
	}

	return (
		<View style={{flex: 1, padding: 10, }}>
			<TouchableOpacity 
			onPress={uploadNewDoc}
			style={{width: 200, height: 200, borderWidth: 1,alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}>
				<Text>+</Text>
				<Text>Upload new doc here</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
	scanner:{
		flex: 1,
		backgroundColor: 'red'
	}
});


function App() {
	return (
	  <NavigationContainer>
		<Stack.Navigator>
		  <Stack.Screen name="Home" component={GridView} />
		  <Stack.Screen name="Scan" component={ScannerView} />
		</Stack.Navigator>
	  </NavigationContainer>
	);
  }

export default App;
