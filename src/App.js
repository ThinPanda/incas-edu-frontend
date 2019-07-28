import React from 'react';
import './App.css';
import { Router, Link } from "@reach/router";

import PersistentDrawerLeft from "./components/PersistentDrawer";
import HomePage from "./pages/HomePage";
import Details from "./pages/UserDetails";
import Resources from "./pages/ResourcesPage";
import MyResource from "./pages/MyResourcePage";
import LoginPage from "./pages/LoginPage1";
import {ContextProvider} from "./hooks/GlobalContext";
import Settings from "./pages/Settings";
import Register from "./pages/RegisterPage";
import Recharge from "./pages/ordinary/RechargePage";
import Transfer from "./pages/ordinary/TransferPage";
import Upload from "./pages/agency/UploadPage";
import MyUpload from "./pages/agency/MyUploadPage";
import CentralBank from "./pages/admin/CentralBankPage";
import Contrast from "./pages/admin/ContrastPage";
import Audit from "./pages/admin/AuditPage";
import Monitor from "./pages/admin/MonitorPage";
import Withdraw from "./pages/agency/WithdrawPage";


function App() {
  return (
    <div>
        <ContextProvider>
            <Router>
                <HomePage path="/index" />
                <LoginPage path="/login"/>
                <Register path="/register"/>
                <PersistentDrawerLeft path="/">
                    <Details path="/detail" />
                    <Resources path="/resource" />
                    {/* 以下的是普通用户登录后才能看见的组件  */}
                    <MyResource path="/myResource" />
                    <Recharge path="/recharge" />
                    <Transfer path="/transfer" />
                    {/* 以下的是机构用户登录后才能看见的组件  */}
                    <MyResource path="/myResource" />
                    <Upload path="/upload" />
                    <MyUpload path="/myUpload" />
                    <Withdraw path="/withdraw" />
                    {/* 以下的是管理员登录后才能看见的组件  */}
                    <CentralBank path="/centralBank" />
                    <Contrast path="/contrast" />
                    <Audit path="/audit" />
                    <Monitor path="/monitor" />

                    <Settings path="/modifyInfo" />
                </PersistentDrawerLeft>
            </Router>
        </ContextProvider>
    </div>
  );
}

export default App;
