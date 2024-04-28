declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}


type WeightValue = 'normal'
| 'bold'
| '100'
| '200'
| '300'
| '400'
| '500'
| '600'
| '700'
| '800'
| '900'
| undefined;