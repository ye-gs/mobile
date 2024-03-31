import React from "react";
import { ScrollView} from "@/components/Themed";
import { GenericCard } from "@/components/GenericCard";
import { RFValue } from "react-native-responsive-fontsize";

const Appointments = () => {
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: RFValue(100, 808),
                alignItems: "center"
            }}
        >
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame de prostata"
                date="Mon, 14 Dec"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Dr Flamingo"
                subtext="Exame"
                date="Mon, 14 Dec"
            ></GenericCard>
        </ScrollView>
    );
};

export default Appointments;
