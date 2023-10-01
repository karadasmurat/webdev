import { Box, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box color="#f7fafc" bg="#6b46c1" pt="90px" pb="200px" px="32px">
      <Heading fontWeight="800">Simple pricing for your business</Heading>
      <Text fontWeight="500">
        Plans that are carefully crafted to suit your business.
      </Text>
    </Box>
  );
}
