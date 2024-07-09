
import { HealthProfileT } from '@/types/ReduxTypes/healthProfileType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
  
interface HealthProfileState {
    healthProfile: HealthProfileT | null;
}

const initialState: HealthProfileState = {
    healthProfile: null,
};

const userSlice = createSlice({
    name: 'healthProfile',
    initialState,
    reducers: {
        setHealthProfile: (state, action: PayloadAction<HealthProfileT>) => {
            state.healthProfile = action.payload;
        },
        clearHealthProfile: () => initialState,
    },
});

export const { setHealthProfile, clearHealthProfile } = userSlice.actions;

export default userSlice.reducer;

export const selectHealthProfile = (state: any) => state.healthProfile;
