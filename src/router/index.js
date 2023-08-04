import {createRouter, createWebHistory} from 'vue-router'
import ShowAllPublisherSubscribers from '../views/user/ShowAllPublisherSubscribers.vue';
import UpdateUser from '../views/user/UpdateUser.vue';
import DeleteUser from '../views/user/DeleteUser.vue';
import SubscribeUserToPublisher from '../views/user/SubscribeUserToPublisher.vue';
import UnsubscribeUserFromPublisher from '../views/user/UnsubscribeUserFromPublisher.vue';
import RegistrationLogin from "@/views/user/auth/RegistrationLogin";
import PostCreate from "@/views/post/PostCreate";
import PostOverview from "@/views/post/PostOverview";
import UserPage from "@/views/user/UserPage";
import PostDetails from "@/views/post/PostDetails";
import store from '@/store/index';
import apiService from '@/services/apiService';
import Logout from "@/views/user/auth/Logout";
import OAuth2Callback from "@/views/user/auth/OAuth2Callback"; // Import your axios instance


const routes = [
    {path: '/auth', component: RegistrationLogin}, // Add the route for RegistrationLogin
    {path: '/user/show/:username', component: UserPage},
    {path: '/user/show/:publisherName/subscribers', component: ShowAllPublisherSubscribers},
    {path: '/user/update', component: UpdateUser, meta: {requiresAuth: true}},
    {path: '/user/delete', component: DeleteUser, meta: {requiresAuth: true}},
    {path: '/user/subscribe', component: SubscribeUserToPublisher},
    {path: '/user/unsubscribe', component: UnsubscribeUserFromPublisher},

    {path: '/post/create', name: 'post-create', component: PostCreate, meta: {requiresAuth: true}},
    {path: '/post/overview', name: 'post-overview', component: PostOverview},
    {path: '/post/more/:postId', name: 'post-details', component: PostDetails},

    { path: '/auth/logout', component: Logout }, // Add the route for Logout
    // { path: '/oauth2/callback', component: OAuth2Callback },
    // { path: '/post/:postId', name: 'post-details', component: PostDetails },
    // { path: '/post/:postId/update', name: 'post-update', component: PostUpdate },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    // If the route doesn't require authentication, simply continue to the next route
    if (!requiresAuth) {
        next();
        return;
    }


    // If the user is not authenticated, attempt to validate the token on the backend
    try {
        // Make an API request to the backend to validate the token
        const response = await apiService.post('/api/auth/authenticate', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'), // Set the Bearer token in the Authorization header
            },
        });

        if (response.status === 200) {
            // If token is valid, set the isAuthenticated state to true
            store.commit('auth/setIsAuthenticated', true);
            next();
        } else {
            // If token is not valid, redirect to the login page
            next('/auth');
        }
    } catch (error) {
        console.log(error)
        // If an error occurs during token validation, redirect to the login page
        next('/auth');
    }
});

export default router
