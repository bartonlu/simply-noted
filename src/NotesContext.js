import React from "react";
import { useLocalObservable } from "mobx-react";
import { createNotesStore } from "./notesStore";

const NotesContext = React.createContext(null);

export const NotesProvider = ({ children }) => {
  // useLocalStore allows the store to actually be observable
  // According to stackoverflow (may not be true), useLocalStore turns a javascript literal into a store with observable properties.
  // This is not needed if a store is created from a class object with observable attributes.

  // "Local observable state can be introduced by using the useLocalStore hook, that runs its initializer function once to create an
  // observable store and keeps it around for a lifetime of a component.

  // All properties of the returned object will be made observable automatically,"

  // From official documentation: Creates a new observable object using makeObservable, and keeps it around in the component for the entire
  // life-cycle of the component.
  const notesStore = useLocalObservable(createNotesStore);
  return (
    <NotesContext.Provider value={notesStore}>{children}</NotesContext.Provider>
  );
};

// Hook to be able to use our context. Remember that all that a hook does is allow you to use state without a class
export const useNotesStore = () => React.useContext(NotesContext);

/**
 * Context in React requires a few things
 *
 * 1. A statement creating the context. This looks something like const NotesContext = React.createContext(null)
 * 2. A provider. This looks something like export const NotesProvider = () => {}. This is where you put your context/information
 *      that you want other components to know about.
 *      a) You need to wrap all the components that need this context with <NotesProvider>.
 *      b) You need to return the actual provider from the NotesProvider like so: <NotesContext.Provider></NotesContext.Provider>.
 *      c) You need to put {children} inside the <NotesContext.Provider> wrapper. As a) says, components that need this context are
 *         wrapped, and are called the "children". If you didn't do this, you would have to wrap all the components that need this
 *         context inside the <NotesContext.Provider> in this file here, which is bad because the children that need this might
 *         constantly change.
 * 3. A value passed into the provider. These are the values that the provider actually passes to the rest of the components
 *
 * In mobx specifically, the information that you want other components to know about will be in the store. So you would use the
 * createNotesStore() function to create an instance of the store. Then you would pass that to the NotesContext.Provider as a value
 *
 */
