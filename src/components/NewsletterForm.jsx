import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    HStack,
    Button,
    useToast,
    Heading,
} from '@chakra-ui/react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { useState, useEffect } from 'react'

const url =
    'https://dev.us11.list-manage.com/subscribe/post?u=3199f742cce66a94556636f99&amp;id=e6dcd4d974'

const textColor = '#E0E0DF'

function NewsletterForm() {
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
                                    colorScheme="gray"
                                    bg="gray.600"
                                    type="submit"
                                    isLoading={status === 'sending'}
                                    color={textColor}
                                    _hover={{
                                        bg: 'gray.300',
                                        color: 'gray.600',
                                    }}
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

export default NewsletterForm
