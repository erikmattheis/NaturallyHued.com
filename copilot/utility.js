module.exports = {
    sanitizeId(id) {
        return encodeURIComponent(id.toLowerCase().replace(/\s/g, '-'))
    },
    findDifferences(obj1, obj2, currentPath = '') {
        let paths = []
        let keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
        for (let key of keys) {
            let newPath = currentPath ? `${currentPath}.${key}` : key
            if (!obj1[key] || !obj2[key]) {
                paths.push(newPath)
            } else if (
                typeof obj1[key] === 'object' &&
                !Array.isArray(obj1[key]) &&
                typeof obj2[key] === 'object' &&
                !Array.isArray(obj2[key])
            ) {
                paths = paths.concat(
                    this.findDifferences(obj1[key], obj2[key], newPath)
                )
            }
        }
        return paths
    },
}
