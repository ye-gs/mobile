import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
    User,
    Auth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
    initializeFirestore,
    doc,
    collection,
    onSnapshot,
    Firestore,
    DocumentData,
    QuerySnapshot,
} from "firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import { getCachedData, updateCache } from "@/cache/index";

// Configuração do Google Sign-in
GoogleSignin.configure({
    webClientId: Constants?.expoConfig?.extra?.webClientId || "",
});

// Firebase configuration
const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "",
    authDomain: Constants.expoConfig?.extra?.authDomain || "",
    projectId: Constants.expoConfig?.extra?.projectId || "",
    storageBucket: Constants.expoConfig?.extra?.storageBucket || "",
    messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId || "",
    appId: Constants.expoConfig?.extra?.appId || "",
    measurementId: Constants.expoConfig?.extra?.measurementId || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db: Firestore = initializeFirestore(app, {});

// Listener para alterações em subcoleções (meds, appointments, exams)
const setupSubcollectionListener = (
    userId: string,
    subcollectionName: string,
    updateData: (subcollectionName: string, data: DocumentData[]) => void
) => {
    const subcollectionRef = collection(
        db,
        `users/${userId}/${subcollectionName}`
    );

    return onSnapshot(
        subcollectionRef,
        (snapshot: QuerySnapshot<DocumentData>) => {
            const subcollectionData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Atualizar os dados da subcoleção e chamar a função para atualizar o cache
            updateData(subcollectionName, subcollectionData);
        }
    );
};

// Função para unir e atualizar todos os dados e o cache
const updateCompleteData = (
    userId: string,
    userData: DocumentData,
    subcollections: Record<string, DocumentData[]>
) => {
    const completeData = {
        user: userData,
        ...subcollections,
    };
    updateCache(userId, completeData);
};

// Listener para alterações no Firestore do documento principal do usuário
const setupFirestoreListener = (userId: string) => {
    const userDocRef = doc(db, "users", userId);

    let subcollections: Record<string, DocumentData[]> = {
        meds: [],
        appointments: [],
        exams: [],
    };

    // Initialize an empty userData object
    let userData: DocumentData = {};

    // Função auxiliar para atualizar subcoleções
    const updateData = (subcollectionName: string, data: DocumentData[]) => {
        subcollections[subcollectionName] = data;
        updateCompleteData(userId, userData, subcollections); // Atualiza o cache com dados da subcoleção
    };

    // Configurar listeners para subcoleções
    const medsListener = setupSubcollectionListener(userId, "meds", updateData);
    const appointmentsListener = setupSubcollectionListener(
        userId,
        "appointments",
        updateData
    );
    const examsListener = setupSubcollectionListener(
        userId,
        "exams",
        updateData
    );

    // Listener para o documento principal do usuário
    return onSnapshot(userDocRef, (snapshot) => {
        if (snapshot.exists()) {
            // Update userData here before using it
            userData = snapshot.data() as DocumentData;
            updateCompleteData(userId, userData, subcollections);
        } else {
            console.log("Documento do usuário não encontrado:", userId);
            updateCache(userId, {}); // Limpar cache se documento não existir
        }
    });
};

// Função inicial para carregar os dados e configurar o listener
const initializeData = async (userId: string) => {
    const cachedData = await getCachedData(userId);
    if (!cachedData) {
        console.log(
            "Nenhum dado em cache, configurando listener para o Firestore..."
        );
        setupFirestoreListener(userId);
    } else {
        console.log("Dados carregados do cache, configurando listener...");
        setupFirestoreListener(userId);
    }
};

// Autenticação do Firebase e configuração do listener para o usuário autenticado
auth.onAuthStateChanged((user: User | null) => {
    if (user) {
        const userId = user.uid;
        console.log("Usuário autenticado:", userId);
        initializeData(userId); // Inicializar dados apenas para o usuário autenticado
    } else {
        console.log("Nenhum usuário autenticado.");
    }
});

export { app, auth, db };
