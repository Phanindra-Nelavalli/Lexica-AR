import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import DocumentPicker from "react-native-document-picker";
import Video from "react-native-video";
import RNFS from "react-native-fs";
import { storage, firestore } from "./../Configs/firestore";
import { Buffer } from "buffer";

global.Buffer = Buffer;

const FacultyUploadScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [objUri, setObjUri] = useState(null);
  const [imageId, setImageId] = useState(null); // To store image ID
  const [isImageDuplicate, setIsImageDuplicate] = useState(false); // To track duplicate image status

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
      }
    };
    requestPermissions();
  }, []);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: false },
      (response) => {
        if (response.didCancel) {
          console.log("Image selection cancelled");
        } else if (response.error) {
          console.error("Error picking image:", response.error);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImageUri = response.assets[0].uri;
          checkIfImageExists(selectedImageUri);
        }
      }
    );
  };

  const checkIfImageExists = async (imageUri) => {
    try {
      // Generate a unique image ID (you can use a hash or a unique identifier)
      const imageName = imageUri.split("/").pop();
      const imageRef = storage.ref().child(`images/${imageName}`);
      const imageUrl = await imageRef.getDownloadURL();
      setIsImageDuplicate(true); // If image exists, set duplicate status to true
      Alert.alert(
        "Image already exists",
        "The selected image has already been uploaded."
      );
    } catch (error) {
      // If the image does not exist, proceed to upload
      setIsImageDuplicate(false);
      setImageUri(imageUri);
      console.log("Image selected:", imageUri);
    }
  };

  const pickVideo = () => {
    launchImageLibrary(
      { mediaType: "video", includeBase64: false },
      (response) => {
        if (response.didCancel) {
          console.log("Video selection cancelled");
        } else if (response.error) {
          console.error("Error picking video:", response.error);
        } else if (response.assets && response.assets.length > 0) {
          setVideoUri(response.assets[0].uri);
          console.log("Video selected:", response.assets[0].uri);
        }
      }
    );
  };

  const pickObjFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res[0].name.endsWith(".obj")) {
        setObjUri(res[0].uri);
        console.log("OBJ file selected:", res[0].uri);
      } else {
        Alert.alert("Invalid File", "Please select a .obj file.");
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("OBJ file selection cancelled");
      } else {
        console.error("Error picking OBJ file:", err.message);
      }
    }
  };

  const resolveFilePath = async (uri) => {
    if (uri.startsWith("content://")) {
      try {
        const fileName = `temp_${Date.now()}.obj`;
        const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        await RNFS.copyFile(uri, filePath);
        console.log("Resolved content URI to path:", filePath);
        return filePath;
      } catch (error) {
        console.error("Error resolving content URI:", error);
        throw new Error("Could not resolve content URI");
      }
    } else {
      console.log("File path is already resolved:", uri);
      return uri;
    }
  };

  const readFileAsBlob = async (uri) => {
    try {
      const filePath = await resolveFilePath(uri);
      console.log("Reading file from path:", filePath);
      const fileData = await RNFS.readFile(filePath, "base64");
      const fileBuffer = Buffer.from(fileData, "base64");
      return new Blob([fileBuffer], { type: "application/octet-stream" });
    } catch (error) {
      console.error("Error reading file as Blob:", error.message);
      throw new Error("File does not exist");
    }
  };

  const uploadFiles = async () => {
    if (isImageDuplicate) {
      Alert.alert(
        "Upload Skipped",
        "The image is already uploaded. Skipping upload for video and OBJ file."
      );
      return;
    }

    try {
      let imageUrl = null;
      let videoUrl = null;
      let objUrl = null;

      // Upload Image
      if (imageUri) {
        console.log("Uploading image...");
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const imageName = imageUri.split("/").pop();
        const imageRef = storage.ref().child(`images/${imageName}`);
        await imageRef.put(blob);
        imageUrl = await imageRef.getDownloadURL();
        console.log("Image uploaded:", imageUrl);
        setImageId(imageName); // Store the image ID for Firestore document
      }

      // Upload Video
      if (videoUri && !isImageDuplicate) {
        console.log("Uploading video...");
        const response = await fetch(videoUri);
        const blob = await response.blob();
        const videoRef = storage.ref().child(`videos/${Date.now()}.mp4`);
        await videoRef.put(blob);
        videoUrl = await videoRef.getDownloadURL();
        console.log("Video uploaded:", videoUrl);
      }

      // Upload OBJ File
      if (objUri && !isImageDuplicate) {
        console.log("Uploading OBJ file...");
        const objBlob = await readFileAsBlob(objUri);
        const objRef = storage.ref().child(`3d_models/${Date.now()}.obj`);
        await objRef.put(objBlob);
        objUrl = await objRef.getDownloadURL();
        console.log("OBJ file uploaded:", objUrl);
      }

      // Prepare Firestore document
      const mediaDoc = {
        ...(imageUrl && { imageUrl }),
        ...(videoUrl && { videoUrl }),
        ...(objUrl && { objUrl }),
      };

      console.log("mediaDoc before upload:", mediaDoc); 

      if (Object.keys(mediaDoc).length > 0 && imageId) {
        console.log("Uploading to Firestore:", mediaDoc);
        await firestore.collection("mediaLinks").doc(imageId).set(mediaDoc);
        Alert.alert("Upload successful!");
      } else {
        console.log("No media to upload to Firestore");
        Alert.alert("No media to upload");
      }

      // Clear state after upload
      setImageUri(null);
      setVideoUri(null);
      setObjUri(null);
    } catch (error) {
      console.error("Error uploading files:", error.message);
      Alert.alert(
        "Upload Failed",
        "An error occurred while uploading the files. Please try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Upload Image, Video, and 3D Model</Text>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an image from camera roll</Text>
        </TouchableOpacity>
        {imageUri && !isImageDuplicate && (
          <Image source={{ uri: imageUri }} style={styles.media} />
        )}

        <TouchableOpacity style={styles.button} onPress={pickVideo}>
          <Text style={styles.buttonText}>Pick a video from camera roll</Text>
        </TouchableOpacity>
        {videoUri && (
          <Video
            source={{ uri: videoUri }}
            style={styles.media}
            useNativeControls
          />
        )}

        <TouchableOpacity style={styles.button} onPress={pickObjFile}>
          <Text style={styles.buttonText}>Pick a 3D Model (.obj)</Text>
        </TouchableOpacity>
        {objUri && (
          <Text style={styles.objFileText}>OBJ File Selected: {objUri}</Text>
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={uploadFiles}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  media: {
    width: 300,
    height: 300,
    marginTop: 10,
  },
  objFileText: {
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  uploadButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
});

export default FacultyUploadScreen;
