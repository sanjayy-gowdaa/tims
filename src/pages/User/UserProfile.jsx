import React, { useRef, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/services/userService';
import { uploadProfilePicture, deleteProfilePicture } from '@/services/api';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

const UserProfile = () => {
  const { user, updateUser, refreshUser } = useAuthStore();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());
  const [previewUrl, setPreviewUrl] = useState(null);

  const { data: profile, isLoading, refetch } = useQuery('profile', userService.getProfile, {
    initialData: user,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
  });

  const updateMutation = useMutation(userService.updateProfile, {
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
      updateUser(data.user);
      refetch();
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      toast.error('Only image files are allowed (JPEG, PNG, GIF)');
      return;
    }

    // Create preview URL immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      setUploading(true);
      console.log('Uploading file:', file.name, 'Size:', file.size, 'bytes');
      
      const result = await uploadProfilePicture(file);
      console.log('Upload result:', result);
      
      // Refresh user data from server
      const updatedUser = await refreshUser();
      console.log('User data after refresh:', updatedUser);
      
      await refetch();
      
      // Force image reload with new timestamp
      setImageTimestamp(Date.now());
      
      // Clear preview URL
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(null);
      
      // Update local state to force re-render
      updateUser(updatedUser);
      
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      console.error('Error details:', error.response?.data);
      
      // Clear preview on error
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(null);
      
      toast.error(error.response?.data?.message || 'Failed to upload profile picture');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeletePicture = async () => {
    if (!window.confirm('Are you sure you want to delete your profile picture?')) {
      return;
    }

    try {
      console.log('Deleting profile picture...');
      await deleteProfilePicture();
      
      // Refresh user data from server
      await refreshUser();
      await refetch();
      
      // Force image reload
      setImageTimestamp(Date.now());
      
      toast.success('Profile picture deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete profile picture');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const profilePicUrl = previewUrl || (profile?.profilePicture 
    ? `http://localhost:5001${profile.profilePicture}?t=${imageTimestamp}` 
    : null);

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="mb-4 relative">
              {profilePicUrl ? (
                <img
                  key={`${profile?.profilePicture}-${imageTimestamp}`}
                  src={profilePicUrl}
                  alt="Profile"
                  className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-primary-500 bg-gray-200"
                  onError={(e) => {
                    console.error('Image load error:', e);
                    e.target.style.display = 'none';
                  }}
                  onLoad={(e) => {
                    console.log('Image loaded successfully:', profilePicUrl);
                  }}
                />
              ) : null}
              {!profilePicUrl && (
                <div className="mx-auto h-32 w-32 rounded-full bg-primary-600 flex items-center justify-center text-white text-4xl font-bold">
                  {profile?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">{profile?.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{profile?.role}</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/jpeg,image/jpg,image/png,image/gif"
              className="hidden"
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-4 btn-secondary w-full disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Change Picture'}
            </button>
            {profile?.profilePicture && (
              <button
                type="button"
                onClick={handleDeletePicture}
                disabled={uploading}
                className="mt-2 btn-danger w-full disabled:opacity-50"
              >
                Delete Picture
              </button>
            )}
            <p className="text-xs text-gray-500 mt-2">
              Max 5MB • JPEG, PNG, GIF
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input-field bg-gray-100"
                    value={profile?.email}
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    {...register('phone')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    className="input-field bg-gray-100 capitalize"
                    value={profile?.department || 'N/A'}
                    disabled
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    {...register('location')}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    className="input-field"
                    {...register('bio')}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive email updates about your tickets</p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      {...register('emailNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                      <p className="text-xs text-gray-500">Receive push notifications in browser</p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      {...register('pushNotifications')}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                <button type="button" className="btn-secondary">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isLoading}
                  className="btn-primary"
                >
                  {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
