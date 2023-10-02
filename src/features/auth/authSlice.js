import {createSlice} from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')

const initialState = {
    user: user ? user : null,
    token: token ? token : null
};


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        setToken:(state, action)=>{
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
        clearAuth:(state, action)=>{
            state.user = null;
            state.token = null;
        },
        setLogout:()=>{
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});

export const { setUser, setToken, clearAuth, setLogout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;