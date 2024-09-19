import {
    getCachedData,
    clearCache,
    clearAllCache,
    insetCachedData,
    getExamsFromCache,
    getAppointmentsFromCache,
    getMedsFromCache,
} from "@/cache/index";
import { auth } from "@/firebase/index";
import { Button, View } from "react-native";
import {
    SearchItemByName,
    SearchItemByPosition,
} from "@/components/searchItem";

export function CacheButtons() {
    const handleGetCachedData = () => {
        const data = getCachedData(auth.currentUser?.uid ?? "");
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

    const handleGetCachedExam = async () => {
        try {
            const data = await getExamsFromCache(auth.currentUser?.uid ?? "");
            // console log exams
            console.log(data);
        } catch (error) {
            console.error("Error fetching cached exams:", error);
        }
    };
    const handleGetCachedAppointment = () => {
        const data = getAppointmentsFromCache(auth.currentUser?.uid ?? "");
        console.log(data);
    };

    const handleGetCachedMeds = () => {
        const data = getMedsFromCache(auth.currentUser?.uid ?? "");
        console.log(data);
    };

    const handleSearch = (item: string) => {
        SearchItemByName(item).then((resultado) => {
            console.log(resultado); // Exibe [{ examIndex: X, analyteIndex: Y }, ...]
            SearchItemByPosition(resultado).then(
                (resultado) => {
                    console.log(resultado); // Exibe [{ analyteIndex: Y, examIndex: X, seconds: Z }, ...]
                },
                (error) => {
                    console.error("Erro ao buscar second:", error);
                }
            );
        });
    };
    return (
        <View>
            <Button title="Search PTH" onPress={() => handleSearch("PTH")} />

            <Button
                title="Get Appointments"
                onPress={handleGetCachedAppointment}
            />
            <Button title="Get Meds" onPress={handleGetCachedMeds} />
            <Button title="Get Exames" onPress={handleGetCachedExam} />
            <Button title="Get Cached Data" onPress={handleGetCachedData} />
            <Button title="Clear All Cache" onPress={handleClearAllCache} />
        </View>
    );
}
