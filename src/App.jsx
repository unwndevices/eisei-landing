import {
    Box,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    HStack,
    Image,
    Link,
    VStack,
    Button,
    useToast,
    Text,
    Heading,
} from '@chakra-ui/react'
import { FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { useState, useEffect } from 'react'
// Import your logo file
import eisei from '@/assets/eisei.svg'
import logo from '@/assets/logo.svg'
import module from '@/assets/module.svg'
import { Layer1, Layer2 } from '@/Wallpaper'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const url =
    'https://dev.us11.list-manage.com/subscribe/post?u=3199f742cce66a94556636f99&amp;id=e6dcd4d974'

const textColor = '#E0E0DF'
// Remove the following line:
// const bgColor = '#a8a8a8'

const CustomForm = () => {
    const [email, setEmail] = useState('')
    const [subscribeStatus, setSubscribeStatus] = useState(null)
    const [subscribeMessage, setSubscribeMessage] = useState('')
    const toast = useToast()

    const showToast = (title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 4000,
            isClosable: true,
        })
    }

    useEffect(() => {
        if (subscribeStatus === 'error') {
            showToast('An error occurred.', subscribeMessage, 'error')
        } else if (subscribeStatus === 'success') {
            showToast(
                'Subscribed!',
                "You've been successfully subscribed to our newsletter.",
                'success'
            )
        }
    }, [subscribeStatus, subscribeMessage])

    return (
        <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => {
                // Update local state when MailchimpSubscribe status changes
                if (status !== subscribeStatus) {
                    setSubscribeStatus(status)
                    setSubscribeMessage(message)
                }

                return (
                    <Box width="100%" maxW="800px" zIndex={3}>
                        <FormControl
                            as="form"
                            isRequired
                            onSubmit={(e) => {
                                e.preventDefault()
                                subscribe({ EMAIL: email })
                            }}
                        >
                            <Heading size="3xl" mb={4}>
                                Subscribe to our newsletter!
                            </Heading>
                            <Heading
                                fontStyle="italic"
                                fontWeight="normal"
                                size="md"
                                mb={10}
                            >
                                Get the latest news and updates about Eisei and
                                Unknown Devices. Eisei will launch on
                                Kickstarter by the end of the year.
                            </Heading>
                            <FormLabel>Email address</FormLabel>
                            <HStack>
                                <Input
                                    variant="filled"
                                    bg="rgba(255, 255, 255, 0.25)"
                                    type="email"
                                    placeholder="your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    _placeholder={{ color: textColor }}
                                    _focus={{
                                        borderColor: 'rgba(255, 255, 255, 0.8)',
                                    }}
                                    _hover={{
                                        borderColor: 'rgba(255, 255, 255, 0.6)',
                                    }}
                                />
                                <Button
                                    colorScheme="blue"
                                    type="submit"
                                    isLoading={status === 'sending'}
                                >
                                    Subscribe
                                </Button>
                            </HStack>
                            <FormHelperText color="rgba(255, 255, 255, 0.3)">
                                We&apos;ll never share your email with anyone
                                else.
                            </FormHelperText>
                        </FormControl>
                    </Box>
                )
            }}
        />
    )
}

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

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    py={4}
                    px={10}
                    position="relative"
                >
                    <Box py={4} zIndex={1}>
                        <Image src={eisei} alt="Logo" maxW="150px" />
                    </Box>
                    <Flex justifyContent="center" gap={6} zIndex={3}>
                        <Link
                            href="https://instagram.com/unwndevices/"
                            isExternal
                        >
                            <FaInstagram size={24} />
                        </Link>
                        <Link
                            href="https://tiktok.com/@unknown_devices"
                            isExternal
                        >
                            <FaTiktok size={24} />
                        </Link>
                        <Link href="mailto:eisei@unwn.dev">
                            <FaEnvelope size={24} />
                        </Link>
                    </Flex>
                </HStack>

                <VStack
                    flex={1}
                    justifyContent="center"
                    spacing={8}
                    position="relative"
                >
                    <HStack
                        flexWrap="wrap"
                        gap={10}
                        px={10}
                        justifyContent="space-around"
                        minW="100vw"
                        alignItems="flex-start"
                    >
                        <Image
                            src={module}
                            alt="Eisei"
                            maxW="400px"
                            zIndex={1}
                        />

                        <CustomForm />
                    </HStack>
                </VStack>
                <HStack
                    justifyContent="space-between"
                    alignItems="flex-end"
                    py={4}
                    px={10}
                    position="relative"
                >
                    <Text>© 2024 Unknown Devices</Text>

                    <Image src={logo} alt="Logo" maxW="30px" />
                </HStack>
                <Layer2 />
            </Flex>
        </ChakraProvider>
    )
}

export default App
