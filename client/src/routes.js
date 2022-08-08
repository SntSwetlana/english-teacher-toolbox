import React from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import {LoginPage} from "./Page/LoginPage";
import {AboutPage} from "./Page/AboutPage";
import {BookshelfPage} from "./Page/BookshelfPage";
import {DictionaryLinksPage} from "./Page/DictionaryLinksPage";
import {DictionaryPage} from "./Page/DictionaryPage";
import {SchoolPage} from "./Page/SchoolPage";
import {VideoLibraryPage} from "./Page/VideoLibraryPage";
import {HomePage} from "./Page/HomePage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        console.log('Auth complete');
        return(
            <Routes>
                <Route path="AboutPage" element={<AboutPage />} />
                <Route path="BookshelfPage" element={<BookshelfPage />} />
                <Route path="DictionaryLinksPage" element={<DictionaryLinksPage />} />
                <Route path="DictionaryPage" element={<DictionaryPage />} />
                <Route path="SchoolPage" element={<SchoolPage />} />
                <Route path="VideoLibraryPage" element={<VideoLibraryPage />} />
                <Route path="HomePage" element={<HomePage />} />
                <Route  path="*"  element={<Navigate to="HomePage" replace />} />
            </Routes>
        )
    }
    console.log('we are here');
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route  path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
