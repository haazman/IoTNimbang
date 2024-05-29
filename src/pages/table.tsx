import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

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

export default function () {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const app = initializeApp(firebaseConfig);
                const firestore = getFirestore(app);
                const savedCollection = collection(firestore, "saved");
                const snapshot = await getDocs(savedCollection);
                const dataList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setData(dataList);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <table className="min-w-96">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Berat</th>
                        <th>Waktu</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.weight}</td>
                            <td>{new Date(item.timestamp.seconds * 1000).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
