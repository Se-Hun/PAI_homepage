// https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage : localStorage 관련 자료
// localStorage는 로컬에 저장하는 것이고 만료 기간이 없지만,
// sessionStorage의 경우에는 세션이 끝나면(브라우저가 종료되면)
// 지워지기 때문에 보안적으로도 sessionStorage가 더 좋을듯!
// 백엔드 token 주는거 완료되면 바꾸자!!
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage : sessionStorage 관련 자료
// session 이란?
// 새 탭이나 창에서 페이지를 열면 세션 쿠키 작동 방식과는 다른 최상위
// 수준의 탐색 컨텍스트 값으로 새 세션이 시작됩니다.
// 동일한 URL에서 여러 탭 또는 Windows를 열면 각 탭 또는 창에 대해 sessionStorage가 만들어집니다.
// 탭 또는 창을 닫으면 세션이 끝나고 sessionStorage탭 또는 창을 닫자마자 해당 객체가 지워집니다.

export function isLoggedIn() {
    return sessionStorage.getItem("access_token") !== null && sessionStorage.getItem("access_token") !== "undefined";
}

export function deleteTokens(){
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
}
export function requiredAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}
