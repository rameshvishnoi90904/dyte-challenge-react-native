import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	Modal
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
	const [displayDocFullscreen, setFullScreen] = useState(false);
	const [toPreviewDoc, setToPreview] = useState({});


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

	const openDoc = (fileName, filePath) => {
		setFullScreen(true);
		setToPreview({fileName, filePath})
	}

	const closePreviewPopup = () => {
		setFullScreen(false);
		setToPreview({});
	}


	const previewDocModal = (
		<Modal
			animationType={'fade'}
			transparent={true}
			visible={displayDocFullscreen}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View>
						<Text style={styles.titleText}>Preview</Text>
					</View>
					<Image
						source={{ uri:  toPreviewDoc.filePath}}
						resizeMode="contain"
						style={{width: width - 100, height: width - 100,marginBottom: 10}}
					/>
					<View style={{marginVertical:10, flexDirection: 'row'}}>
						<TouchableOpacity onPress={closePreviewPopup} style={styles.saveButton}>
							<Text style={styles.saveText}>CLOSE</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)

	const docsPreview = docList.map(([fileName, path]) => {
		return (
			<TouchableOpacity key={fileName} style={styles.docThumbnailWrapper} onPress={() => {openDoc(fileName, path)}}>
				<Image
					 source={{ uri:  path}}
					 resizeMode="cover"
					 style={{flex: 1, backgroundColor: 'green', borderTopLeftRadius: 5, borderTopRightRadius: 5}}
				 />
				 <View style={styles.fileNameContainer}>
					 <Text style={styles.fileNameText}>{fileName}</Text>
				 </View>
			</TouchableOpacity>
		)
	});
	return (
		<View style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
			<View style={styles.appHeader}>
				<Text style={[styles.appText,{color: 'red'}]}>My</Text>
				<Text style={styles.appText}> CamScanner</Text>
			</View>
			<View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
				<TouchableOpacity 
				onPress={uploadNewDoc}
				style={[styles.docThumbnailWrapper, styles.addNewDoc]}>
					<Text style={{fontSize: 34}}>+</Text>
					<Text>Upload new doc here</Text>
				</TouchableOpacity>
				{docsPreview}
				{previewDocModal}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	
	docThumbnailWrapper: {
		width: width/2 - 40, 
		height: width/2 - 40, 
		borderWidth: 1,
		margin: 10,
		borderRadius: 5,
		borderColor: '#9E9E9E'
	},
	addNewDoc: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(224,224,224,0.5)',
	},
	modalView: {
		backgroundColor:'#fff',
		borderRadius: 10,
		paddingHorizontal: 10,
	},
	closeButton: {
		borderRadius: 2,
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 10,
		alignItems: 'center',
		flex: 1,
		marginRight: 10,
		borderColor: '#9E9E9E'
	},
	saveButton: {
		flex: 1,
		borderRadius: 2,
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 10,
		alignItems: 'center',
		backgroundColor: '#2266EE',
		borderColor: "#2266EE"
	},
	titleText: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 20
	},
	saveText: {
		fontSize: 16, fontWeight: 'bold', color: 'white'
	},
	cancelText: {
		fontSize: 16, fontWeight: 'bold', color: '#9E9E9E'
	},
	fileNameContainer: {
		padding: 10
	},
	fileNameText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},
	appHeader: {
		justifyContent: 'center',
		paddingVertical: 10,
		flexDirection: 'row'
	},
	appText: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#1A237E'
	},
});


function App() {
	return (
	  <NavigationContainer>
		<Stack.Navigator>
		  <Stack.Screen 
		  name="My CamScanner" 
			  component={GridView} 
			  options={{ headerShown: false }}/>
		  <Stack.Screen name="Scan" component={ScannerView} />
		</Stack.Navigator>
	  </NavigationContainer>
	);
  }

export default App;
