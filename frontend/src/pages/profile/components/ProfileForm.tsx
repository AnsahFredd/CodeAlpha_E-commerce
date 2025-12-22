import React from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profileData,
  setProfileData,
  isEditing,
  setIsEditing,
  onSave,
  onCancel,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Profile Settings
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 sm:w-auto"
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              onClick={onSave}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 sm:flex-none"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300 sm:flex-none"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <User className="h-5 w-5 shrink-0 text-gray-400" />
                <span className="truncate text-gray-900">
                  {profileData.name}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Mail className="h-5 w-5 shrink-0 text-gray-400" />
                <span className="truncate text-gray-900">
                  {profileData.email}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <Phone className="h-5 w-5 shrink-0 text-gray-400" />
                <span className="text-gray-900">{profileData.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Address Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Street Address
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <MapPin className="h-5 w-5 shrink-0 text-gray-400" />
                <span className="truncate text-gray-900">
                  {profileData.address}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              City
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.city}
                onChange={(e) =>
                  setProfileData({ ...profileData, city: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            ) : (
              <div className="rounded-lg bg-gray-50 p-3 text-gray-900">
                {profileData.city}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              State
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.state}
                onChange={(e) =>
                  setProfileData({ ...profileData, state: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            ) : (
              <div className="rounded-lg bg-gray-50 p-3 text-gray-900">
                {profileData.state}
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ZIP Code
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.zipCode}
                onChange={(e) =>
                  setProfileData({ ...profileData, zipCode: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            ) : (
              <div className="rounded-lg bg-gray-50 p-3 text-gray-900">
                {profileData.zipCode}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
