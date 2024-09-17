import {getCachedData, clearCache, clearAllCache,insetCachedData,getExamsFromCache,getAppointmentsFromCache,getMedsFromCache} from "@/cache/index";
import {auth} from "@/firebase/index";
import {Button, View} from "react-native";

export function CacheButtons() {

const handleGetCachedData = () => {
    const data = getCachedData(auth.currentUser?.uid??"");
};
const handleClearAllCache = () => {
    clearAllCache()
        .then(() => {
            console.log("Cache limpo com sucesso.");
        })
        .catch((error) => {
            console.error("Erro ao limpar o cache:", error);
        });
};

const handleGetCachedExam = () => {
    const data = getExamsFromCache(auth.currentUser?.uid
        ?? "");
}
const handleGetCachedAppointment = () => {
    const data = getAppointmentsFromCache(auth.currentUser?.uid
        ?? "");
}

const handleGetCachedMeds = () => {
    const data = getMedsFromCache(auth.currentUser?.uid
        ?? "");
}
return <View>
    <Button title="Get Appointments" onPress={handleGetCachedAppointment} />
    <Button title="Get Meds" onPress={handleGetCachedMeds} />
    <Button title="Get Exames" onPress={handleGetCachedExam} />
    <Button title="Get Cached Data" onPress={handleGetCachedData} />
    <Button title="Clear All Cache" onPress={handleClearAllCache} />
</View>;
}