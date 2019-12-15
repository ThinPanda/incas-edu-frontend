import React from 'react';
import './App.css';
import { Router } from "@reach/router";

import PersistentDrawerLeft from "./components/PersistentDrawer";
import HomePage from "./pages/HomePage";
import Details from "./pages/UserDetails";
import Resources from "./pages/ResourcesPage";
import MyResource from "./pages/MyResourcePage";
import LoginPage from "./pages/LoginPage";
import {ContextProvider} from "./hooks/GlobalContext";
import Settings from "./pages/Settings";
import Register from "./pages/RegisterPage";
import Recharge from "./pages/ordinary/RechargePage";
import Transfer from "./pages/ordinary/TransferPage";
import Upload from "./pages/agency/UploadPage";
import MyUpload from "./pages/agency/MyUploadPage";
import CentralBank from "./pages/admin/CentralBankPage";
import Contrast from "./pages/admin/ContrastPage";
import AuditTrading from "./pages/admin/AuditTradingPage";
import AuditResource from "./pages/admin/AuditResourcePage";
import Monitor from "./pages/admin/MonitorPage";
import Withdraw from "./pages/agency/WithdrawPage";
import Appeal from "./pages/agency/AppealPage";
import AuditAppeal from "./pages/admin/AuditAppealPage";


function App() {
  return (
    <div>
        <ContextProvider>
            <Router>
                <HomePage path="/" />
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
                    <Appeal path="/appeal" />
                    {/* 以下的是管理员登录后才能看见的组件  */}
                    <CentralBank path="/centralBank" />
                    <Contrast path="/contrast" />
                    <AuditTrading path="/auditTrading" />
                    <AuditResource path="/auditResource" />
                    <AuditAppeal path="/auditAppeal" />
                    <Monitor path="/monitor" />

                    <Settings path="/modifyInfo" />
                </PersistentDrawerLeft>
            </Router>
        </ContextProvider>
    </div>
  );
}

export default App;
