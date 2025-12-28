import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {locations} from "../constants/index.js"


const DEFAULT_LOCATION = locations.work



const UseLocationStore = create(
  immer((set) => ({
    activeLocation : DEFAULT_LOCATION,

    setactiveLocation : (locations = null) => 
        set((state) => {
            state.activeLocation = locations;
        }),

    
    resetactiveLocation : () => 
        set((state) => {
            state.activeLocation =  DEFAULT_LOCATION;
        }),

  })),
);

export default UseLocationStore;
