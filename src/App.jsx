import { Flex } from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import { Layer1, Layer2 } from '@/Wallpaper'

const theme = extendTheme({
    fonts: {
        body: '"Inter", sans-serif',
        heading: '"Inter", sans-serif',
    },
})

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Flex
                position="relative"
                direction="column"
                justifyContent="space-between"
                maxW="100vw"
                minHeight="100vh"
                color="#E0E0DF"
                overflow="hidden"
                fontFamily="Inter, sans-serif"
            >
                <Layer1 />
                <Header />
                <MainContent />
                <Footer />
                <Layer2 />
            </Flex>
        </ChakraProvider>
    )
}

export default App
