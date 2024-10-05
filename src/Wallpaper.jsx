import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'

const useImageSequence = (prefix) => {
    const [images, setImages] = useState([])
    const [currentFrame, setCurrentFrame] = useState(0)

    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = Array.from({ length: 25 }, (_, i) => {
                const img = new Image()
                img.src = `/seq/${prefix}_${String(i).padStart(2, '0')}.webp`
                return new Promise((resolve) => {
                    img.onload = () => resolve(img)
                })
            })
            const loadedImages = await Promise.all(imagePromises)
            setImages(loadedImages)
        }

        loadImages()
    }, [prefix])

    return { images, currentFrame, setCurrentFrame }
}

const Layer = ({
    images,
    currentFrame,
    zIndex,
    style,
    addFilmGrain,
    backgroundColor,
}) => {
    const canvasRef = useRef(null)
    const [aspectRatio, setAspectRatio] = useState(1)

    useEffect(() => {
        if (images.length > 0) {
            const img = images[0]
            setAspectRatio(img.width / img.height)
        }
    }, [images])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            renderFrame()
        }

        const renderFrame = () => {
            const canvasAspectRatio = canvas.width / canvas.height
            let drawWidth, drawHeight, offsetX, offsetY

            if (canvasAspectRatio > aspectRatio) {
                drawWidth = canvas.width
                drawHeight = canvas.width / aspectRatio
                offsetX = 0
                offsetY = (canvas.height - drawHeight) / 2
            } else {
                drawWidth = canvas.height * aspectRatio
                drawHeight = canvas.height
                offsetX = (canvas.width - drawWidth) / 2
                offsetY = 0
            }

            if (backgroundColor) {
                context.fillStyle = backgroundColor
                context.fillRect(0, 0, canvas.width, canvas.height)
            }

            if (images.length > 0) {
                const img = images[currentFrame]
                context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

                if (addFilmGrain) {
                    applyFilmGrain(context, canvas.width, canvas.height)
                }
            }
        }

        const applyFilmGrain = (ctx, width, height) => {
            const imageData = ctx.getImageData(0, 0, width, height)
            const data = imageData.data
            for (let i = 0; i < data.length; i += 4) {
                const noise = Math.random() * 20 - 10
                data[i] += noise
                data[i + 1] += noise
                data[i + 2] += noise
            }
            ctx.putImageData(imageData, 0, 0)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [images, currentFrame, addFilmGrain, backgroundColor, aspectRatio])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex,
                ...style,
            }}
        />
    )
}

export const Layer1 = () => {
    const { images, currentFrame, setCurrentFrame } = useImageSequence('wp1')

    useEffect(() => {
        const handleMouseMove = (e) => {
            const frame = Math.floor(
                (e.clientY / window.innerHeight) * (images.length - 1)
            )
            setCurrentFrame(frame)
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [images.length, setCurrentFrame])

    return (
        <Layer
            images={images}
            currentFrame={currentFrame}
            zIndex={-2}
            addFilmGrain={true}
            backgroundColor="#a8a8a8"
        />
    )
}

export const Layer2 = () => {
    const { images, currentFrame, setCurrentFrame } = useImageSequence('wp2')

    useEffect(() => {
        const handleMouseMove = (e) => {
            const frame = Math.floor(
                (e.clientX / window.innerWidth) * (images.length - 1)
            )
            setCurrentFrame(frame)
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [images.length, setCurrentFrame])

    return (
        <Layer
            images={images}
            currentFrame={currentFrame}
            zIndex={1}
            style={{
                pointerEvents: 'none', // This makes the layer clickable-through
            }}
        />
    )
}

Layer.propTypes = {
    images: PropTypes.array.isRequired,
    currentFrame: PropTypes.number.isRequired,
    zIndex: PropTypes.number.isRequired,
    style: PropTypes.object,
    addFilmGrain: PropTypes.bool,
    backgroundColor: PropTypes.string,
}
