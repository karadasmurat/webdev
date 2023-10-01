import {
  ChakraProvider,
  Box,
  Button,
  Container,
  Flex,
  Spacer,
  Stack,
  HStack,
  StackDivider,
} from "@chakra-ui/react";
import Header from "./chakraui/Header";
import Pricing from "./chakraui/Pricing";
import Components from "./chakraui/Components";

export default function ChakraUIDemo() {
  return (
    <ChakraProvider>
      {/* <Header /> */}
      {/* <Pricing /> */}
      <Components />
    </ChakraProvider>
  );
}
