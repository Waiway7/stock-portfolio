
export const updateBalance = (id, total_price) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/users/${id}`,
        data: total_price,
        contentType: false,
        processData: false
    })
}

export const fetchUser = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${id}`
    })
}