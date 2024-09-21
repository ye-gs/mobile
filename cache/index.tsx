import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para obter dados do cache do usuário autenticado
const getCachedData = async (userId: string) => {
    try {
        const cachedData = await AsyncStorage.getItem(
            `firestoreData_${userId}`
        );
        if (cachedData !== null) {
            const parsedData = JSON.parse(cachedData);
            return parsedData;
        } else {
            console.log(
                "Nenhum dado encontrado no cache para o usuário:",
                userId
            );
        }
    } catch (error) {
        console.error("Erro ao carregar dados do cache:", error);
    }
    return null; // Retorna null se não houver dados
};

// Função para obter apenas exames do cache do usuário autenticado
const getExamsFromCache = async (userId: string) => {
    try {
        const cachedData = await AsyncStorage.getItem(
            `firestoreData_${userId}`
        );
        if (cachedData !== null) {
            const parsedData = JSON.parse(cachedData);

            if (parsedData.exams) {
                return parsedData.exams;
            } else {
                console.log(
                    "Nenhum exame encontrado no cache para o usuário:",
                    userId
                );
                return [];
            }
        } else {
            console.log(
                "Nenhum dado encontrado no cache para o usuário:",
                userId
            );
            return [];
        }
    } catch (error) {
        console.error("Erro ao carregar dados do cache:", error);
        return [];
    }
};

// Função para obter apenas appointments do cache do usuário autenticado
const getAppointmentsFromCache = async (userId: string) => {
    try {
        const cachedData = await AsyncStorage.getItem(
            `firestoreData_${userId}`
        );
        if (cachedData !== null) {
            const parsedData = JSON.parse(cachedData);

            if (parsedData.appointments) {
                return parsedData.appointments;
            } else {
                console.log(
                    "Nenhuma consulta encontrada no cache para o usuário:",
                    userId
                );
                return [];
            }
        } else {
            console.log(
                "Nenhum dado encontrado no cache para o usuário:",
                userId
            );
            return [];
        }
    } catch (error) {
        console.error("Erro ao carregar dados do cache:", error);
        return [];
    }
};

// Função para obter apenas meds do cache do usuário autenticado
const getMedsFromCache = async (userId: string) => {
    try {
        const cachedData = await AsyncStorage.getItem(
            `firestoreData_${userId}`
        );
        if (cachedData !== null) {
            const parsedData = JSON.parse(cachedData);

            if (parsedData.meds) {
                return parsedData.meds;
            } else {
                console.log(
                    "Nenhum medicamento encontrado no cache para o usuário:",
                    userId
                );
                return [];
            }
        } else {
            console.log(
                "Nenhum dado encontrado no cache para o usuário:",
                userId
            );
            return [];
        }
    } catch (error) {
        console.error("Erro ao carregar dados do cache:", error);
        return [];
    }
};

// Função para limpar o cache do usuário autenticado
const clearCache = async (userId: string) => {
    try {
        await AsyncStorage.removeItem(`firestoreData_${userId}`);
        console.log("Cache limpo com sucesso para o usuário:", userId);
    } catch (error) {
        console.error("Erro ao limpar o cache:", error);
    }
};

// Função para limpar todo o cache
const clearAllCache = async () => {
    try {
        await AsyncStorage.clear();
        console.log("Todo o cache foi limpo com sucesso.");
    } catch (error) {
        console.error("Erro ao limpar todo o cache:", error);
    }
};

// Função para salvar dados no cache do usuário autenticado
const insetCachedData = async (userId: string, data: any) => {
    try {
        const stringifiedData = JSON.stringify(data);
        await AsyncStorage.setItem(`firestoreData_${userId}`, stringifiedData);
        console.log("Dados salvos no cache para o usuário:", userId, data);
    } catch (error) {
        console.error("Erro ao salvar dados no cache:", error);
    }
};

// Função para atualizar o cache do usuário autenticado (sem alterações)
const updateCache = async (userId: string, data: any) => {
    try {
        await AsyncStorage.setItem(
            `firestoreData_${userId}`,
            JSON.stringify(data)
        );
        console.log("Cache atualizado com sucesso para o usuário:", userId);
    } catch (error) {
        console.error("Erro ao atualizar o cache:", error);
    }
};

// Função genérica para atualizar uma seção específica do cache (appointments, meds, exams)
const updateCacheSection = async (
    userId: string,
    section: string,
    data: any
) => {
    try {
        // Pega o cache atual do usuário
        const cachedData = await AsyncStorage.getItem(
            `firestoreData_${userId}`
        );
        let parsedData = cachedData ? JSON.parse(cachedData) : {};

        // Atualiza apenas a seção específica (appointments, meds, exams)
        parsedData[section] = data;

        // Salva o cache atualizado
        await AsyncStorage.setItem(
            `firestoreData_${userId}`,
            JSON.stringify(parsedData)
        );
        console.log(
            `Cache de ${section} atualizado com sucesso para o usuário:`,
            userId
        );
    } catch (error) {
        console.error(`Erro ao atualizar o cache de ${section}:`, error);
    }
};

// Função para atualizar o cache de appointments
const updateAppointmentsCache = async (userId: string, appointments: any) => {
    await updateCacheSection(userId, "appointments", appointments);
};

// Função para atualizar o cache de exames
const updateExamsCache = async (userId: string, exams: any) => {
    await updateCacheSection(userId, "exams", exams);
};

// Função para atualizar o cache de medicamentos (meds)
const updateMedsCache = async (userId: string, meds: any) => {
    await updateCacheSection(userId, "meds", meds);
};

// Exports
export {
    getCachedData,
    clearCache,
    clearAllCache,
    insetCachedData,
    updateCache,
    getExamsFromCache,
    getAppointmentsFromCache,
    getMedsFromCache,
    updateAppointmentsCache,
    updateExamsCache,
    updateMedsCache,
};
