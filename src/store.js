import { derived, readable, writable } from 'svelte/store'

const randomDateRange = () => {
    const s = new Date()
    s.setDate(s.getDate() + Math.floor(Math.random() * 2))
    const e = new Date()
    e.setDate(s.getDate() + Math.floor(Math.random() * 5))
    if (Math.random() > 0.45) {
        return false
    } else {
        return ({
            start: s,
            end: e
        })
    }
}

let uid = 0
const data = [
    { id: uid++, imgPath: 'img/camera/canon_eos_60d.jpg', name: "Canon EOS 60D", category: "camera", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, accusantium?", available: 3, reserved: randomDateRange() },
    { id: uid++, imgPath: 'img/camera/lumix_gx7.jpg', name: "Lumix GX7", category: "camera", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, accusantium?", available: 3, reserved: randomDateRange() },
    { id: uid++, imgPath: 'img/camera/panasonic_ag-hpx500.jpg', name: "Panasonic AG-HPX500", category: "camera", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, accusantium?", available: 3, reserved: randomDateRange() },
    { id: uid++, imgPath: 'img/portaaudio/zoom_f8n.jpg', name: "Zoom f8n", category: "portaaudio", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, accusantium?", available: 3, reserved: randomDateRange() },
    { id: uid++, imgPath: 'img/portaaudio/zoom_h4.jpg', name: "Zoom h4", category: "portaaudio", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, accusantium?", available: 3, reserved: randomDateRange() },
    { id: uid++, imgPath: 'img/portaaudio/soundDevices_744T.webp', name: "Sound Devices 744t", category: "portaaudio", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, accusantium?", available: 3, reserved: randomDateRange() },
].map(product => {
    return {
        n: 0,
        product: product
    }
})


const createProducts = () => {
    const { subscribe, update } = writable(data)
    return {
        subscribe,
        increment: id => update(products => {
            return products.map(product => product.product.id === id ? ({ ...product, n: Math.min(product.n + 1, product.product.available) }) : product)
        }),
        decrement: id => update(products => {
            return products.map(product => product.product.id === id ? ({ ...product, n: Math.max(product.n - 1, 0) }) : product)
        })
    }
}

export const products = createProducts()

export const productsSelected = readable(0, set => {
    products.subscribe(_products => set(_products.filter(product => product.n > 0).length))
    return () => 0
})

export const contextView = writable('none')
export const drawerState = writable('close')

export const lockDrawer = writable(false)

export const selectedProducts = writable([])
export const currentProduct = writable(false)

export const dateRange = writable({
    start: new Date(),
    end: new Date()
})
export const categories = readable([
    'all', 'camera', 'portaaudio', 'light'
])
export const filter = writable({
    categories: [
        { name: 'all', active: true },
        { name: 'camera', active: false },
        { name: 'portaaudio', active: false },
        { name: 'light', active: false },
    ],
    showOutsideRange: true
})


export const filteredProducts = derived([products, filter, dateRange], ([_products, _filter, _dateRange]) => {
    const filteredProducts = _products.map(
        // Filter dateRange
        ({ product, n }) => {
            if (!product.reserved) {
                return ({
                    product,
                    n,
                    include: true,
                    outsideRange: false
                })
            } else {
                if (_dateRange.start > product.reserved.end || _dateRange.end < product.reserved.start) {
                    return ({
                        product,
                        n,
                        include: true,
                        outsideRange: false
                    })
                } else {
                    return ({
                        product,
                        n,
                        include: _filter.showOutsideRange,
                        outsideRange: true
                    })
                }
            }
        })
    if (_filter.categories.find(c => c.active)) {
        return filteredProducts.filter(
            // Filter categories
            product => {
                return _filter.categories.find(c => c.name === 'all' && c.active) ? true :
                    _filter.categories.find(c => c.name === product.product.category && c.active)
            })
    } else {
        filter.update(u => {
            return { ...u, categories: u.categories.map(c => c.name === 'all' ? { ...c, active: true } : c) }
        })
        return filteredProducts
    }



})


export const userSettings = writable({
    enableVibration: true
})