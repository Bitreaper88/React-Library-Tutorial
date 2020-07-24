
export const saveAccessTokenToLocalStorage = (token: string) => {
    localStorage.setItem("accessToken", token)
};

export const loadAccessTokenFromLocalStorage = () => localStorage.getItem("accessToken");

export const removeAccessTokenFromLocalStorage = () => localStorage.removeItem("accessToken");
