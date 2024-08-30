import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { ViroARScene, ViroARSceneNavigator, ViroImageMarker, Viro3DObject, ViroARTrackingTargets } from '@viro-community/react-viro';
import { firestore } from './../Configs/firebase';

// Set up AR tracking targets
ViroARTrackingTargets.createTargets({
  imageTarget: {
    source: require('./path/to/your/image/target.jpg'), // Local image for tracking
    orientation: 'Up',
    physicalWidth: 0.2, // The width of the image in meters
  },
});

const ARScene = ({ objectUri }) => {
  if (!objectUri) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading 3D Object...</Text>
      </View>
    );
  }

  return (
    <ViroARScene>
      <ViroImageMarker
        target={'imageTarget'}
        onAnchorFound={() => console.log('Image found')}
        onAnchorRemoved={() => console.log('Image lost')}
      >
        <Viro3DObject
          source={{ uri: objectUri }}
          resources={[
            require('./path/to/your/texture.png'), // Example texture, replace with your own if needed
          ]}
          position={[0, 0, 0]}
          scale={[0.1, 0.1, 0.1]}
          type="OBJ"
        />
      </ViroImageMarker>
    </ViroARScene>
  );
};

const ARScreen = () => {
  const [objectUri, setObjectUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjectUri = async () => {
      try {
        // Fetch the 3D object URL from Firestore
        const doc = await firestore().collection('mediaLinks').doc('your-image-id').get();
        if (doc.exists) {
          const data = doc.data();
          setObjectUri(data.objUrl);
        } else {
          Alert.alert('Error', 'No object found for the provided image ID.');
        }
      } catch (error) {
        console.error('Error fetching object URL:', error);
        Alert.alert('Error', 'Failed to fetch object URL. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchObjectUri();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ViroARSceneNavigator
          initialScene={{ scene: () => <ARScene objectUri={objectUri} /> }}
          style={styles.arView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  arView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ARScreen;
