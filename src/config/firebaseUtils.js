import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firestore"; // or wherever you export `db`

export const fetchApplicationsByStatus = async () => {
  try {
    const q = query(collection(db, "user-listing"), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("⚠️ No documents found with status: Pending");
    }

    const applications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched applications:", applications); // 🟢 Must show array of objects

    return applications;
  } catch (error) {
    console.error("🔥 Firestore fetch error:", error.message);
  }
};
