import React, { useReducer } from "react";

const initialState = {
    fileTitle: "Haven't fill in",
    fileImage: "imaHaven't fill inge",
    fileKeyWord: "Haven't fill in",
    fileContentType: "Haven't fill in",
    fileInitialProvider: "Haven't fill in",
    fileReadPrice: "Haven't fill in",
    fileOwnerShipPrice: "Haven't fill in",
    file: "Haven't fill in",
    fileDescription: "Haven't fill in",
};
const FileContext = React.createContext(initialState);

function fileReducer(state, action) {
    switch (action.type) {
        case "fileTitle":
            return { ...state, fileTitle: action.value };
        case "fileImage":
            return { ...state, fileImage: action.value };
        case "fileKeyWord":
            return { ...state, fileKeyWord: action.value };
        case "fileContentType":
            return { ...state, fileContentType: action.value };
        case "fileInitialProvider":
            return { ...state, fileInitialProvider: action.value };
        case "fileReadPrice":
            return { ...state, fileReadPrice: action.value };
        case "fileOwnerShipPrice":
            return { ...state, fileOwnerShipPrice: action.value };
        case "fileDescription":
            return { ...state, fileDescription: action.value };
        case "file":
            return { ...state, file: action.value };
        default:
            throw new Error();
    }
}


const UploadFileProvider = props => {
    const [state, dispatch] = useReducer(fileReducer, initialState);
    return (
        <FileContext.Provider value={{ state, dispatch }}>
            {props.children}
        </FileContext.Provider>
    );
};

export { FileContext, UploadFileProvider };