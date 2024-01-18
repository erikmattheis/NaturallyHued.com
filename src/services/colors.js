function calculateNewHSLColor({ h1, s, l }, percent) {
    const h = h1 * (1 + percent / 100)
    const result = `hsl(${h}, ${s}, ${l})`
    return result
}

function rgbStringToRgbObj(rgb) {
    const obj = rgb.replace(/[^\d,]/g, '').split(',')
    return obj
}

function rgbStringToHslString(rgb) {
    const rgbObj = rgbStringToRgbObj(rgb)
    const hsl = rgbObjToHslObj(rgbObj)
    return hsl
}

function rgbObjToHslObj(rgb) {
    let r = rgb.r / 255
    let g = rgb.g / 255
    let b = rgb.b / 255

    let max = Math.max(r, g, b)
    let min = Math.min(r, g, b)
    let h,
        s,
        l = (max + min) / 2

    if (max === min) {
        h = s = 0 // achromatic
    } else {
        let d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
}

function hexStringToRgbObj(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 }
}

function hexStringToHslObj(hex) {
    const rgb = hexStringToRgbObj(hex)
    console.log('rgb', rgb)
    const hsl = rgbObjToHslObj(rgb)
    console.log('hsl', hsl)
    return hsl
}

function contrastingColor(hex) {
    const rgb = hexStringToRgbObj(hex)
    const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b
    return luminance < 140 ? '#ffffff' : '#000000'
}

function adjustLightness(hex, percent) {
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '')

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (hex.length == 3) {
        hex = hex.replace(/(.)/g, '$1$1')
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16)

    return (
        '#' +
        (0 | ((1 << 8) + r + ((256 - r) * percent) / 100))
            .toString(16)
            .substr(1) +
        (0 | ((1 << 8) + g + ((256 - g) * percent) / 100))
            .toString(16)
            .substr(1) +
        (0 | ((1 << 8) + b + ((256 - b) * percent) / 100))
            .toString(16)
            .substr(1)
    )
}

export { contrastingColor, adjustLightness }
