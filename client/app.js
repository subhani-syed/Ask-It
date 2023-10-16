import React from "react";
import ReactDom from "react-dom/client"
import Header from "./src/Components/Header";
import Body from "./src/Components/Body";
import Upload from "./src/Components/Upload"
import Login from "./src/Components/Login";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Conversation from "./src/Components/Conversation";
import { AuthProvider } from "./src/Components/context/AuthContext";
import PrivateRoute from "./src/Components/PrivateRoute";
import Register from "./src/Components/Register";
import Footer from "./src/Components/Footer";

const router = createBrowserRouter([
    {
        path: "/",
        element:<AuthProvider>
            <PrivateRoute>
                <Header/>
                <Body/>
                <Footer/>
            </PrivateRoute>
        </AuthProvider>,

    },
    {
        path:"/:convo_id",
        element:<AuthProvider>
            <PrivateRoute>
                <Header/>
                <Conversation />
                <Footer/>
            </PrivateRoute>
        </AuthProvider>,
    },
    {
        path:"/upload",
        element:<AuthProvider>
            <PrivateRoute>
                <Header/>
                <Upload />
                <Footer/>
            </PrivateRoute>
        </AuthProvider>,
    },
    {
        path:"/login",
        element:<AuthProvider>
            <Login />
        </AuthProvider>
    },
    {
        path:"/register",
        element:<>
            <Register/>
        </>
        
    }
]);
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);