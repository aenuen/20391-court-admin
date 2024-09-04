// noinspection JSUnresolvedFunction

const TokenKey = 'Admin-Token'
export const getToken = () => localStorage.getItem(TokenKey)
export const setToken = (token, tel) => localStorage.setItem(TokenKey, token)
export const removeToken = () => localStorage.removeItem(TokenKey)
