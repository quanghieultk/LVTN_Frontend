
export const menuActions = {
    change
};

function change(menu) {
    return { type: menu, menu };
}
