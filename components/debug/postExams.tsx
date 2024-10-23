import { getExamsFromCache } from "@/cache/index";
import { auth } from "@/firebase/index";
import { Button, View } from "react-native";

export function PostExams() {
    const handleButton = async () => {
        // Post exams
        if (auth.currentUser === null) {
            console.error("No user authenticated");
            return;
        }

        try {
            const exams = await getExamsFromCache(auth.currentUser.uid);

            if (!exams || exams.length === 0) {
                console.error("No exams found in cache");
                return;
            }

            const path = `users/${auth.currentUser.uid}/exams`;

            const response = await fetch("http://192.168.0.86:12345", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path, exams }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log("Success:", responseData);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <View>
            <Button title="POST EXAMS" onPress={handleButton} />
        </View>
    );
}
