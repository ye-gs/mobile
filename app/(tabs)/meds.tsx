import React from "react";
import { ScrollView } from "@/components/Themed";
import { GenericCard } from "@/components/GenericCard";
import { RFValue } from "react-native-responsive-fontsize";

const Meds = () => {
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: RFValue(100, 808),
                alignItems: "center",
            }}
        >
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
            <GenericCard
                time="07:00"
                text="Pantoprazol"
                subtext="10ml"
                date="M T W T F S S"
            ></GenericCard>
        </ScrollView>
    );
};

export default Meds;
