import React from "react";
import "./App.css";
import { NewNoteForm } from "./NewNoteForm";
import { useNotesStore } from "./NotesContext";
import { useObserver } from "mobx-react";

function App() {
  const notesStore = useNotesStore();

  // To observe the notes store, use the useObserver hook.
  // Need to wrap our rendering with it
  // useObserver takes a function that returns the layout

  /** Information online about useObserver as a hook: https://www.npmjs.com/package/react-hook-useobserver
   * "Avoid excessive re-rendering in your React app by using useObserver and useObserverListener as an alternative to useState.

      Both useState is frequently used hook. However, when you use the setState function, useState will immediately re-render 
      the component. Most of the time, we don't want to re-render the component right away, and we want to make sure that we're 
      re-rendering the component that listens to the change of a specific attribute in the state only. As an alternative, we can 
      utilize useObserver to fix this problem."

      More info online:
      "Despite using useObserver hook in the middle of the component, it will re-render a whole component on change of the observable."
      I think this is the case for my code here. If I want to micromanage the way they sort of do above, then I would have to do this:
      "If you want to micro-manage renders, feel free to use <Observer /> or useForceUpdate option (for advanced users)."
   */
  return useObserver(() => (
    <>
      <h1>Simply Noted</h1>
      <ul>
        {notesStore.notes.map((note) => (
          <li key={note.id} onClick={() => notesStore.removeNote(note.id)}>
            {note.text}
          </li>
        ))}
      </ul>
      <NewNoteForm />
    </>
  ));
}

export default App;
