import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "../components/modals";

const firebaseConfig = {
  apiKey: "AIzaSyAIMiCIl--HjP77RuRpSkO7y3nuOzIKYLE",
  authDomain: "iotgas-cd9a3.firebaseapp.com",
  databaseURL: "https://iotgas-cd9a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iotgas-cd9a3",
  storageBucket: "iotgas-cd9a3.appspot.com",
  messagingSenderId: "525858272607",
  appId: "1:525858272607:web:0f2cab401cb2fb43ecb2ea",
  measurementId: "G-2VT17NDGDS"
};

interface Cond {
  value: number
}

export default function () {
  const [cond, setCond] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase();
    const query = ref(database, "condition");
    const unsubscribe = onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setCond(data);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (name.trim() === "") {
      alert("Please enter a name.");
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const savedCollection = collection(firestore, "saved");

      await addDoc(savedCollection, {
        name: name,
        weight: cond,
        timestamp: serverTimestamp()
      });

      closeModal();
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <>
      <div className="ml-48 flex flex-col gap-2 items-center justify-center pt-32">
        <div className="flex justify-center bg-yellow-400 rounded-full">
          <img className="w-44 p-5" src="weight.png" alt="" />
        </div>
        <div className="pt-8 flex flex-row justify-center items-center gap-2">
          <p className="text-xl font-bold">
            {cond}
          </p>
          <select name="scale" id="">
            <option value="kg">KG</option>
            <option value="hg">HG</option>
            <option value="dg">DG</option>
            <option value="g">G</option>
            <option value="dag">DAG</option>
            <option value="cg">CG</option>
            <option value="mg">MG</option>
          </select>
        </div>
        <button className="bg-yellow-400 rounded-full px-10 py-2 font-bold" onClick={openModal}>Simpan</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col w-xl p-16 justify-around gap-10">
          <input
            className="p-2 outline-black outline-1 outline rounded-md"
            type="text"
            name="nama"
            id="nama"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-yellow-400 rounded-full px-10 py-2 font-bold" onClick={handleSave}>Simpan</button>
        </div>
      </Modal>
    </>
  )
}
