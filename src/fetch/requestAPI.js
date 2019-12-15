import React from "react";

/**
 * Java Rest API 服务器地址
 * @type {string}
 */
// const baseUrl = `http://10.214.241.223:8081`;
const baseUrl = `http://127.0.0.1:8081`;


let token = null;

async function myFetch(url, init) {

    // const [token, setToken] = useState(null);
    // const {headers} = init;

    // let headers = getHeader();
    // if(init){
    //     init.headers = headers;
    // }else{
    //     init={headers:headers};
    // }

    if (init){
        if ( !init.headers ){
            init.headers = getHeader();
        }
    } else {
        init={headers: getHeader()};
    }

    let response = await fetch(url, init);
    let result = await response.json();

    if (result.status !== 0){
        console.log("Fetch Error: ", result.data);
        throw new Error(result.message);
    }
    return result.data ;
}


function getHeader() {
    const headers = new Headers();
    headers.append("Content-Type","application/json");
    headers.append("Accept","application/json");
    if (token){
        headers.append("token",token);
    }
    return headers;
}




/*********************      用户登录/登出       ***************************/

export async function login(email, password, type) {
    // console.log("type: ",type);
    let user_type;
    switch (type) {
        case "ORDINARY":
            user_type = "user";
            break;
        case "AGENCY":
            user_type = "agency";
            break;
        case "ADMIN":
            user_type = "admin";
            break;
    }
    const url = baseUrl + `/login/${user_type}?email=${email}&password=${password}`;
    const response = await myFetch(url, { method: "POST" });
    token = response;
    // const response = await myFetch(url);
    return response;
}

export async function logout() {
    token = null;
    // const response = await myFetch(url);
    return "用户已登出";
}


/*********************      所有用户公共界面       ***************************/

/**
 * 获得用户详细信息
 */

export async function getUserInfo(userType) {
    const url = baseUrl + `/${userType}/detail`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 查看用户充值记录（已审核通过的）
 */

export async function getRechargeList() {
    const url = baseUrl + `/user/getRechargesY`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 查看用户转账记录
 */

export async function getTransferList() {
    const url = baseUrl + `/user/transferList`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    return response;
}

/**
 * 获取服务（资源）列表
 */

export async function getResourceList(user_type) {
    let userType = user_type === "ORDINARY" ? "user" : (user_type === "AGENCY" ? "agency" : "admin");
    const url = baseUrl + `/${userType}/resourcelist`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/*********************      普通用户专有界面       ***************************/

/**
 * 获取用户已购买服务列表
 */

export async function getMyResourceList(userType) {
    const url = baseUrl + `/${userType}/myresourcelist`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 用户充值
 */

export async function userRecharge(balance, payment) {
    const url = baseUrl + `/user/recharge?balance=${balance}&payment=${payment}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 用户转账
 */

export async function userTransfer(account, balance, accountType, currencyType) {
    const url = accountType === "个人" ? (baseUrl + `/user/transferu2u`) : (baseUrl + `/user/transferu2c`);
    const body = JSON.stringify({
        "to": account,
        "transferNum": balance,
    });
    let response;
    try {
        response = await myFetch(url, {method: "POST", body});
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 普通用户购买阅读权
 */
export async function userBuyReadPrice(id) {
    const url = baseUrl + `/user/consume?serviceID=${id}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/*********************      机构用户专有界面       ***************************/

/**
 * 查看用户提现记录
 */
export async function getWithdrawList() {
    const url = baseUrl + `/agency/withdrawList`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 查看已购买服务列表
 */
// 已在普通用户模块编写

/**
 * 机构用户提现
 */
export async function agencyWithdraw(amount, paymentMethod) {
    const url = baseUrl + `/agency/withdraw?amount=${amount}&paymentMethod=${paymentMethod}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 机构用户查看待审核资源列表
 */
export async function getAgencyResourceListU() {
    const url = baseUrl + `/agency/service/unchecked`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 机构用户查看通过审核资源列表
 */
export async function getAgencyResourceListY() {
    const url = baseUrl + `/agency/service/checked`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 机构用户查看未通过审核资源列表
 */
export async function getAgencyResourceListR() {
    const url = baseUrl + `/agency/service/reject`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 机构用户上传资源
 */
export async function uploadResource(params) {
    const {fileTitle, fileImage, fileDescription, fileReadPrice, fileOwnerShipPrice, fileKeyWord, fileContentType, fileInitialProvider, file} = params;
    // console.log(params);
    // console.log(file);
    const url = baseUrl + `/agency/upload`;

    const formdata = new FormData();
    formdata.append("fileTitle", fileTitle);
    formdata.append("fileImage", fileImage);
    formdata.append("fileDescription", fileDescription);
    formdata.append("fileReadPrice", fileReadPrice);
    formdata.append("fileOwnerShipPrice", fileOwnerShipPrice);
    formdata.append("fileKeyWord", fileKeyWord);
    formdata.append("fileContentType", fileContentType);
    formdata.append("fileInitialProvider", fileInitialProvider);
    formdata.append("file", file);

    const headers = new Headers();
    // 不要画蛇添足: You should NEVER set that header yourself. We set the header properly with the boundary.
    // If you set that header, we won't and your server won't know what boundary to expect (since it is added to the header).
    // Remove your custom Content-Type header and you'll be fine.
    headers.append("Accept","application/json");
    headers.append("token", token);

    let response;
    try {
        response = await myFetch(url, {method: "POST", headers: headers, body: formdata});
    } catch (e) {
        console.log(e);
    }
    console.log(response);
    return response;
}

/**
 * 机构用户购买所有权
 */
export async function agencyBuyOwnership(id) {
    const url = baseUrl + `/agency/service/consume/${id}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 机构用户申诉侵权资源
 */
export async function appealService(params) {
    const {id, file, detail} = params;
    const url = baseUrl + `/agency/appeal`;

    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("file", file);
    formdata.append("detail", detail);

    const headers = new Headers();
    headers.append("Accept","application/json");
    headers.append("token", token);

    let response;
    try {
        response = await myFetch(url, { method: "POST", headers: headers, body: formdata});
    } catch (e) {
        console.log(e);
    }
    return response;
}

/**
 * 机构用户获取自己的申诉记录
 */
export async function getAgencyAppealList(id){
    const url = baseUrl + `/agency/appeal/${id}`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/*********************      管理员专有界面       ***************************/

/**
 * 查看用户充值记录（待审核的）
 */

export async function adminGetRechargeList() {
    const url = baseUrl + `/admin/rechargeList`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 查看用户提现记录（待审核的）
 */

export async function adminGetWithdrawList() {
    const url = baseUrl + `/admin/withdrawList`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    return response;
}


/**
 * 查看资源列表（待审核的）
 */
export async function adminGetResourceListW() {
    const url = baseUrl + `/admin/resourcelistW`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 查看资源列表（审核通过的）
 */
export async function adminGetResourceListY() {
    const url = baseUrl + `/admin/resourcelistY`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 查看资源列表（审核拒绝的）
 */
export async function adminGetResourceListR() {
    const url = baseUrl + `/admin/resourcelistR`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 管理员审核通过资源
 */
export async function adminAgreeResource(id) {
    const url = baseUrl + `/admin/serviceY?id=${id}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员审核拒绝资源
 */
export async function adminRejectResource(id) {
    const url = baseUrl + `/admin/serviceR?id=${id}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 管理员同意普通用户充值
 */
export async function adminAgreeUserRecharge(rechargeId) {
    const url = baseUrl + `/admin/rechargeY?rechargeId=${rechargeId}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员拒绝普通用户充值
 */
export async function adminRejectUserRecharge(rechargeId) {
    const url = baseUrl + `/admin/rechargeR?rechargeId=${rechargeId}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员同意机构用户提现
 */
export async function adminAgreeAgencyWithdraw(withdrawId) {
    const url = baseUrl + `/admin/withdrawY?withdrawId=${withdrawId}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 管理员拒绝机构用户提现
 */
export async function adminRejectAgencyWithdraw(withdrawId) {
    const url = baseUrl + `/admin/withdrawR?withdrawId=${withdrawId}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}


/**
 * 管理员获取未审核侵权上诉记录
 */
export async function getUncheckedAppealList() {
    const url = baseUrl + `/admin/appealList/unchecked`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员获取已审核侵权上诉记录
 */
export async function getCheckedAppealList() {
    const url = baseUrl + `/admin/appealList/checked`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员获取审核通过侵权上诉记录
 */
export async function getApprovedAppealList() {
    const url = baseUrl + `/admin/appealList/approved`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员获取未审核拒绝侵权上诉记录
 */
export async function getRejectAppealList() {
    const url = baseUrl + `/admin/appealList/reject`;
    let response;
    try {
        response = await myFetch(url);
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员审核通过侵权上诉
 */
export async function adminAgreeAppeal(id) {
    const url = baseUrl + `/admin/appeal/approve?id=${id}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/**
 * 管理员审核拒绝侵权上诉
 */
export async function adminRejectAppeal(id) {
    const url = baseUrl + `/admin/appeal/reject?id=${id}`;
    let response;
    try {
        response = await myFetch(url, { method: "POST" });
    } catch (e) {
        console.log(e);
    }
    // console.log(response);
    return response;
}

/*********************      ----- end -----       ***************************/
