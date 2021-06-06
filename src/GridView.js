import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	Linking
} from 'react-native';

const {width, height} = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { useIsFocused } from "@react-navigation/native";

import ScannerView from "./ScannerView";
function GridView({navigation}) {
	const [docList, setDocList] = useState([]);
	const isFocused = useIsFocused();
	useEffect(() => {
		// get old scanned docs
		getDocs();
	},[isFocused]);

	const getDocs = () => {
		AsyncStorage.getAllKeys().then((list) => {
			AsyncStorage.multiGet(list).then((dataList) => {
				setDocList(dataList);
			});
		});
	}

	const uploadNewDoc = () => {
		// launch Scanner
		navigation.navigate("Scan")
	}

	const openDoc = (filePath) => {
		Linking.canOpenURL(filePath).then((supported) => {
			console.log("supported :: ", supported, filePath)
			Linking.openURL("content://media/internal/images/media");
		})
	}

	const docsPreview = docList.map(([fileName, path]) => {
		return (
			<TouchableOpacity key={fileName} style={styles.docThumbnailWrapper} onPress={() => {openDoc(path)}}>
				<Image
					 source={{ uri:  path}}
					 resizeMode="contain"
					 style={{flex: 1, backgroundColor: '#EFEFEF'}}
				 />
				<Text>{fileName}</Text>
			</TouchableOpacity>
		)
	})
	return (
		<View style={{flex: 1, padding: 10, }}>
			<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
				<TouchableOpacity 
				onPress={uploadNewDoc}
				style={[styles.docThumbnailWrapper, styles.addNewDoc]}>
					<Text>+</Text>
					<Text>Upload new doc here</Text>
				</TouchableOpacity>
				{docsPreview}
			</View>
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
	},
	docThumbnailWrapper: {
		width: width/2 - 40, 
		height: width/2 - 40, 
		borderWidth: 1,
		margin: 10,
		borderRadius: 5
	},
	addNewDoc: {
		alignItems: 'center',
		justifyContent: 'center'
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
