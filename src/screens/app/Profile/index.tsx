import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { logout, updateProfile } from '../../../redux/slices/AuthSlice';
import { RootState } from '../../../redux/store';
import { ICONS } from '../../../assets';
import { styles } from './style';

export type HomeStackParamList = {
  Home: undefined;
  Details: undefined;
  Profile: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Profile'
>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch();
  const { userData, token } = useSelector((state: RootState) => state.auth);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(userData?.name || '');

  const handleLogout = () => {
    Alert.alert('Logout Confirmation', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          // Navigation reset will be handled automatically by StackNavigator
          // based on authentication state change
        },
      },
    ]);
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          dispatch(updateProfile({ profileImage: imageUri }));
        }
      }
    });
  };

  const handleEditProfile = () => {
    setEditName(userData?.name || '');
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    if (editName.trim().length < 2) {
      Alert.alert('Error', 'Name must be at least 2 characters long');
      return;
    }
    dispatch(updateProfile({ name: editName.trim() }));
    setIsEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.avatar} onPress={handleImagePicker}>
              {userData?.profileImage ? (
                <Image
                  source={{ uri: userData.profileImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.avatarText}>
                  {userData?.name?.charAt(0).toUpperCase()}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={handleImagePicker}
            >
              <Image
                source={ICONS.Edit}
                style={styles.editIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{userData?.name}</Text>
            <TouchableOpacity
              style={styles.editNameButton}
              onPress={handleEditProfile}
            >
              <Image
                source={ICONS.Edit}
                style={styles.editNameIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userEmail}>{userData?.email}</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name:</Text>
            <Text style={styles.value}>{userData?.name || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email Address:</Text>
            <Text style={styles.value}>{userData?.email || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>{userData?.id || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Account Status:</Text>
            <Text style={[styles.value, styles.activeStatus]}>Active</Text>
          </View>
        </View>

        {/* Navigation Section */}

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <Text style={styles.logoutDescription}>
            You will be signed out and redirected to the login screen.
          </Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile Name</Text>

            <TextInput
              style={styles.modalInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter your name"
              maxLength={50}
              autoFocus={true}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
