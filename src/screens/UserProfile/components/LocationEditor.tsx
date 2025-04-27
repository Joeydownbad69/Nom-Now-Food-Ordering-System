import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../contexts/auth-context';

const LocationEditor: React.FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateUser({ address });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update address:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Delivery Address</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
          >
            {user?.address ? 'Change' : 'Add Address'}
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Complete Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="House/Unit Number, Building, Street, Barangay, City, Province, Postal Code"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Please provide your complete address for accurate delivery
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-blue-300"
            >
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </button>
            <button
              type="button"
              onClick={() => {
                setAddress(user?.address || '');
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          {user?.address ? (
            <p className="text-gray-700">{user.address}</p>
          ) : (
            <p className="text-gray-500 italic">No delivery address saved yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationEditor;
