import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export default function Pricing() {
  return (
    <Box>
      <Flex>
        <Box bg="#F0EAFB" p="60px">
          <Text>Premium PRO</Text>
          <Heading>$329</Heading>
          <Text>billed just once</Text>
          <Button colorScheme="purple">Get Started</Button>
        </Box>
      </Flex>
    </Box>
  );
}

