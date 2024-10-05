import { VStack, HStack, Image } from '@chakra-ui/react'
import module from '@/assets/module.svg'
import NewsletterForm from './NewsletterForm'

function MainContent() {
    return (
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
                <Image src={module} alt="Eisei" maxW="400px" zIndex={1} />
                <NewsletterForm />
            </HStack>
        </VStack>
    )
}

export default MainContent