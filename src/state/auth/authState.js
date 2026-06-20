import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const authAtom = atom(createPersistedAtom("authState", {
  isAuthenticated: false,
}));

export const patientResAtom = atom(createPersistedAtom("patientResKey", null));

export const patientProfileAtom = atom(createPersistedAtom("patientProfileKey", null))