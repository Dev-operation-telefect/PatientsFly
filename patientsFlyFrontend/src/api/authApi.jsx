import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL+'/api/air-ambulance/v1/auth' || 'http://localhost:8080/api/air-ambulance/v1/auth';

// Register user
export const registerUser = (data) => axios.post(`${API_URL}/register`, data);

// Login user
export const loginUser = (data) => {
  console.log(data);
  return axios.post(`${API_URL}/login`, data);
};

// Verify email
export const verifyEmail = (data) => axios.post(`${API_URL}/verify-email`, data);

// Forgot password
export const forgotPassword = (email) => axios.post(`${API_URL}/forgot-password`, { email });

// Reset password
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);

// Get user profile
export const getUserProfile = (id, token) =>
axios.get(`${API_URL}/profile/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});

// Update profile info
export const updateProfileInfo = (data, token) =>
  axios.put(`${API_URL}/profile-info`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Update profile picture
export const updateProfilePic = (id, formData, token) =>
axios.put(`${API_URL}/profile-pic/${id}`, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  }
});


// Get single user by ID with token
export const getSingleUser = (id, token) => axios.get(`${API_URL}/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});

// update profile information
export const updateAdminProfileInformation = async (formData, token) => {
    try {
      console.log(token, formData);
        const response = await axios.put(`${API_URL}/admin-update-profile`,formData,
            {
                headers: {
                  Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error.response?.data?.error || "Error updating profile");
    }
};


export const updateAdminProfilePicture = async (auth, imageFile,) => {
    const userId = auth?.user?.id;
    const token = auth?.token;
    try {
        const formData = new FormData();
        formData.append("profileImage", imageFile);
        const response = await axios.put(
            `${API_URL}/admin-update-profile-pic/${userId}`,
            formData,
            {
                headers: { Authorization: `Bearer ${token}`, }
            }
        );
        return response.data; 
    } catch (error) {
        console.log(
            error.response?.data?.message || "Error uploading profile picture"
        );
    }
};
