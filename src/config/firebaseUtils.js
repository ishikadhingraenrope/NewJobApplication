import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firestore"; // or wherever you export `db`

export const fetchApplicationsByStatus = async (status) => {
  try {
    let q;
    if (status) {
      q = query(collection(db, "user-listing"), where("status", "==", status));
    } else {
      q = query(collection(db, "user-listing"));
    }
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn("⚠️ No documents found with status:", status || "All");
    }

    const applications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // If fetching pending, also include documents without status field
    if (status === "pending") {
      console.log("🔍 Fetching all documents for pending filter...");
      const allDocs = await getDocs(query(collection(db, "user-listing")));
      const allApplications = allDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log("📋 All applications in collection:", allApplications);
      
      // Filter to include pending status OR no status field
      const pendingApps = allApplications.filter(app => {
        console.log(`🔍 Checking app ${app.name || app.id}: status = "${app.status}"`);
        return !app.status || app.status === "pending";
      });
      
      console.log("✅ Fetched pending applications:", pendingApps);
      return pendingApps;
    }

    console.log("Fetched applications:", applications); // 🟢 Must show array of objects

    return applications;
  } catch (error) {
    console.error("🔥 Firestore fetch error:", error.message);
  }
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const docRef = doc(db, "user-listing", id);
    await updateDoc(docRef, { status });
    console.log(`Updated application ${id} to status: ${status}`);
  } catch (error) {
    console.error("🔥 Firestore update error:", error.message);
  }
};
