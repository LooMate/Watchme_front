import axios from 'axios';
import store from "@/store";

const apiService = axios.create({
    baseURL: 'https://watchmebacktest-production.up.railway.app/', // Set your backend base URL here
});

const apiRefresh = axios.create({
    baseURL: 'https://watchmebacktest-production.up.railway.app/', // Set your backend base URL here
});

// Add a request interceptor to include the access token in the request headers
apiService.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 Unauthorized responses
apiService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the response status is 401 and there is no previous retry request
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the tokens using the refresh token
                const response = await apiRefresh.get('/api/auth/refresh_tokens', {
                    headers: {
                        'refresh_token': localStorage.getItem('refresh_token'), // Get the refresh token from localStorage
                    },
                });

                // Token refresh successful, save the new tokens to localStorage
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);

                // Retry the original request with the new access token
                originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                return apiService(originalRequest);
            } catch (error) {
                // Token refresh failed, redirect the user to the login page
                window.location.href = '/auth'; // Change this URL to your login page URL
                return Promise.reject(error);
            }
        }

        // For other error responses, simply return the error
        return Promise.reject(error);
    }
);

export default apiService;
