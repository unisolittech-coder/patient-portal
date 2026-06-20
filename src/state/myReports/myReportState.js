import { atom } from "recoil";
import { createPersistedAtom } from "../recoilConfig";

export const reportsAtom = atom(createPersistedAtom("reportsKey", []));
export const reportsDetailsAtom = atom(createPersistedAtom("reportsDetailsKey", null));