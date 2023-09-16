// store.js
import { ref, reactive } from 'vue';
import { db } from './server/lib/firebase.ts'; // Adjust the import path

const state = reactive({
  firestore: db,
  // Other state properties can be added here
});

export default state;