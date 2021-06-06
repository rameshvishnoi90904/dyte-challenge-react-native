/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
 import DocumentScanner from "react-native-document-scanner";
 import CustomCrop from "react-native-perspective-image-cropper";
 function YourComponent(props) {
	 const [info, setInfo] = useState({});
	 const docRef = useRef();
	 const customCrop = useRef();
 
	 const handleOnPictureTaken = () => {
 
	 }
 
	 const capture = () => {
		 docRef.current.capture();
	 }
 
	 const cancelSelection = () => {
		 setInfo({});
	 }
 
	 const crop = () => {
 
	 }
	 const updateImage = (image, newCoordinates) => {
		 console.log("updateImage called ", image, newCoordinates)
	 }
 
   return (
	 <View style={{flex: 1, backgroundColor: 'green'}}>
		 {
			 (info.image) ?
			 <>
				 {/* <CustomCrop
					 updateImage={updateImage}
					 rectangleCoordinates={info.rectangleCoordinates}
					 initialImage={info.image}
					 height={info.imageHeight}
					 width={info.imageWidth}
					 ref={customCrop}
					 overlayColor="rgba(18,190,210, 1)"
					 overlayStrokeColor="rgba(20,190,210, 1)"
					 handlerColor="rgba(20,150,160, 1)"
					 enablePanStrict={false}
				 />
				 <Button title="CROP IMAGE" onPress={crop}>
				 </Button> */}
				 <Image
					 source={{ uri: `${info.image}` }}
					 resizeMode="contain"
					 style={{flex: 1, backgroundColor: 'red'}}
				 />
				 <Image
					 source={{ uri: `${info.initialImage}` }}
					 resizeMode="contain"
					 style={{flex: 1, backgroundColor: 'yellow'}}
				 />
				 <Button title="Cancel" onPress={cancelSelection}/>
			 </>
			 :
			 <>
				 <DocumentScanner
					 ref={docRef}
					 style={{flex:1}}
					 useBase64={true}
					 saveInAppDocument={false}
					 onPictureTaken={data =>
						 {
							 console.log("data :: ", data)
							 setInfo({
								 image: data.croppedImage,
								 initialImage: data.initialImage,
								 rectangleCoordinates: data.rectangleCoordinates,
								 imageHeight: data.height,
								 imageWidth: data.width
							 })
						 }
					 }
					 overlayColor="rgba(255,130,0, 0.7)"
					 enableTorch={false}
					 brightness={0.3}
					 saturation={1}
					 contrast={1.1}
					 quality={0.5}
					 onRectangleDetect={(data) => {
						 console.log("onRectangleDetect :: ",data );
					 }}
					 detectionCountBeforeCapture={5}
					 detectionRefreshRateInMS={50}
				 onPermissionsDenied={() => console.log(" $$$$  Permissions Denied")}
				 />
				 <Button title="Capture" onPress={capture}/>
			 </>
		 }
		 
		 
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
 
 export default YourComponent;
 