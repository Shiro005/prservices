import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue, query, orderByChild, equalTo } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBaGggWbjmUf5E4S9N9mjp32ixSMGQLBr0",
  authDomain: "prservices-e8e79.firebaseapp.com",
  projectId: "prservices-e8e79",
  storageBucket: "prservices-e8e79.appspot.com",
  messagingSenderId: "306367055282",
  appId: "1:306367055282:web:3b5085d6a28225b2dbd0ab",
  databaseURL: "https://prservices-e8e79-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, set, onValue, query, orderByChild, equalTo };