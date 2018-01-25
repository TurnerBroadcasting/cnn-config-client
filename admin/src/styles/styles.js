import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "width": "100%",
        "height": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "background": "url(\"img/choose-bg.png\")"
    },
    "body": {
        "width": "100%",
        "height": "100%",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "background": "url(\"img/choose-bg.png\")"
    },
    "content": {
        "color": "white",
        "height": "100%",
        "fontFamily": "Maverick",
        "marginLeft": "auto",
        "marginRight": "auto",
        "marginTop": 0,
        "marginBottom": 0,
        "background": "url(\"img/choose-bg.png\")"
    },
    "choices": {
        "top": "60%",
        "maxWidth": 480,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "choice": {
        "backgroundColor": "black",
        "textAlign": "center",
        "lineHeight": 100,
        "color": "white"
    },
    "answer": {
        "position": "fixed",
        "top": "20%",
        "height": 300,
        "width": 300,
        "background": "url(\"img/choose-q.png\")",
        "backgroundSize": "cover"
    },
    "wrap": {
        "maxWidth": 300,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "answer-text": {
        "width": 300,
        "textAlign": "center",
        "fontSize": 24,
        "lineHeight": 13,
        "borderRadius": 170,
        "color": "gray"
    },
    "article": {
        "width": "100%"
    },
    "q-text": {
        "maxWidth": 480,
        "fontSize": 35,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "textAlign": "center",
        "textTransform": "uppercase",
        "backgroundColor": "black"
    }
});