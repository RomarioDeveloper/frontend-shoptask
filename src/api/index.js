const login = async ({
    username,
    password
}) => {
    const req = await fetch('https://5667-2-133-130-122.ngrok-free.app/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({
            username,
            password
        })
    })

    const res = await req.json()

    return res
}

const getProducts = async () => {
    const req = await fetch('https://5667-2-133-130-122.ngrok-free.app/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "ngrok-skip-browser-warning": "true"
        }
    })

    const res = await req.json()

    return res
}

const deleteProduct = async (id) => {
    const req = await fetch('https://5667-2-133-130-122.ngrok-free.app/api/products/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "ngrok-skip-browser-warning": "true"
        }
    })

    const res = await req.json()

    return res
}

const editProduct = async (id, data) => {
    const req = await fetch('https://5667-2-133-130-122.ngrok-free.app/api/products/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(data)
    })

    const res = await req.json()

    return res
}

const createProduct = async (data) => {
    const req = await fetch('https://5667-2-133-130-122.ngrok-free.app/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(data)
    })

    const res = await req.json()

    return res
}
export {
    login,
    deleteProduct,
    editProduct,
    createProduct,
    getProducts
}