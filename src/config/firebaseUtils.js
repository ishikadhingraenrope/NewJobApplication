import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firestore"; // or wherever you export `db`

export const fetchApplicationsByStatus = async (status) => {
  const q = query(collection(db, "user-listing"), where("status", "==", status));
  const querySnapshot = await getDocs(q);

  const results = [];
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() });
  });

  return results;
};
