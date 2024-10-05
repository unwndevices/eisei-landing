import { HStack, Box, Image, Flex, Link } from '@chakra-ui/react'
import { FaInstagram, FaTiktok, FaEnvelope } from 'react-icons/fa'
import eisei from '@/assets/eisei.svg'

function Header() {
    return (
        <HStack
            justifyContent="space-between"
            alignItems="center"
            py={4}
            px={[5, 5, 8, 10]}
            position="relative"
        >
            <Box zIndex={1}>
                <Image src={eisei} alt="Logo" maxW="150px" />
            </Box>
            <Flex justifyContent="center" gap={6} zIndex={3}>
                <Link href="https://instagram.com/unwndevices/" isExternal>
                    <FaInstagram size={24} />
                </Link>
                <Link href="https://tiktok.com/@unknown_devices" isExternal>
                    <FaTiktok size={24} />
                </Link>
                <Link href="mailto:eisei@unwn.dev">
                    <FaEnvelope size={24} />
                </Link>
            </Flex>
        </HStack>
    )
}

export default Header
