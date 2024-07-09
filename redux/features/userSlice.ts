import { UserT } from '@/types/ReduxTypes/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
  
interface UserState {
    user: UserT | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserT>) => {
            state.user = { ...state.user, ...action.payload };
        },
        clearUser: () => initialState,
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: any) => state.user;
