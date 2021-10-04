var initialState = {
    menu: 0
}
export function menu(state = initialState, action) {

    switch (action.type) {
        case 0:
            return {
                menu: 0
            };
        case 1:
            return {
                menu: 1
            }
        case 2:
            return {
                menu: 2
            }
        case 3:
            return {
                menu: 3
            }
        case 4:
            return {
                menu: 4
            }
        case -1:
            return {
                menu: false
            };
        default:
            return state
    }
}