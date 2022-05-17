// Stores in mobx are simple Javascript objects

import { nanoid } from "nanoid";

// To use this store globally in the application, we must create the context in another file
export function createNotesStore() {
  return {
    notes: [],
    // In Redux, actions are basically events. There are objects that contain the data that we need to perform changes to our state for
    // In contrast, in mobx, actions are functions
    addNote(text) {
      // Although this method isn't in a class, it is within an object, which means you can use "this" to refer to the object
      this.notes.push({
        text,
        id: nanoid(), // generate id using nano id package
      });
    },
    removeNote(id) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
  };
}
