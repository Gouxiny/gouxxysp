
export const state = {
//   todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    name: '',
    user:{}
}

export const mutations = {
    changeName (state, {newName}){
        state.name = newName;
    },
    setUser (state, {user}){
        state.user = user;
    },
}
