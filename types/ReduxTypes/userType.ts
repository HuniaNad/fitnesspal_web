export interface UserT {
    id?: string;
    name?: string;
    email?: string;
    age?: number;
    gender?: string;
    emergencyContacts?: unknown[];
    subscription?: boolean;
    password?: string;
}