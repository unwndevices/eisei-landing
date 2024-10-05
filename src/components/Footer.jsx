import { HStack, Text, Image } from '@chakra-ui/react'
import logo from '@/assets/logo.svg'

function Footer() {
    return (
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
    )
}

export default Footer