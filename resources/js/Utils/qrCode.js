import QRCode from "qrcode"

/**
 * Generates and downloads a high-resolution QR code PNG with embedded logo.
 *
 * @param {string} text - The URL or text to encode in the QR code.
 * @param {string} filename - The filename for the downloaded image.
 * @param {string} [logoSrc="/android-chrome-512x512.png"] - Path to the logo image.
 * @returns {Promise<void>}
 */
export async function downloadQrCodeWithLogo(
    text,
    filename = "qrcode.png",
    logoSrc = "/android-chrome-512x512.png"
) {
    if (!text) {
        throw new Error("No URL provided for QR code generation.")
    }

    const canvas = document.createElement("canvas")
    const canvasSize = 1024

    await QRCode.toCanvas(canvas, text, {
        width: canvasSize,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
            dark: "#101010",
            light: "#ffffff"
        }
    })

    const ctx = canvas.getContext("2d")

    if (logoSrc && ctx) {
        try {
            const logoImage = await loadLogoImage(logoSrc)

            const logoSize = Math.round(canvasSize * 0.22)
            const bgPadding = Math.round(logoSize * 0.12)
            const bgSize = logoSize + bgPadding * 2
            const bgX = (canvasSize - bgSize) / 2
            const bgY = (canvasSize - bgSize) / 2
            const logoX = (canvasSize - logoSize) / 2
            const logoY = (canvasSize - logoSize) / 2
            const radius = Math.round(bgSize * 0.22)

            // Draw rounded white background plate for the logo
            ctx.save()
            ctx.fillStyle = "#ffffff"
            ctx.beginPath()
            if (typeof ctx.roundRect === "function") {
                ctx.roundRect(bgX, bgY, bgSize, bgSize, radius)
            } else {
                drawRoundedRect(ctx, bgX, bgY, bgSize, bgSize, radius)
            }
            ctx.fill()

            // Optional subtle outline for clean contrast
            ctx.strokeStyle = "rgba(0, 0, 0, 0.08)"
            ctx.lineWidth = Math.max(1, Math.round(canvasSize * 0.002))
            ctx.stroke()

            // Draw logo image
            ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize)
            ctx.restore()
        } catch (e) {
            console.warn("Could not load logo for QR code overlay, downloading clean QR code instead:", e)
        }
    }

    const dataUrl = canvas.toDataURL("image/png")
    const downloadLink = document.createElement("a")
    downloadLink.href = dataUrl
    downloadLink.download = filename.endsWith(".png") ? filename : `${filename}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}

function loadLogoImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve(img)
        img.onerror = (err) => reject(err)
        img.src = src
    })
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
}
