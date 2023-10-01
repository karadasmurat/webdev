import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  HStack,
  Icon,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { MdSettings, MdGroupWork } from "react-icons/md";

export default function Components() {
  return <Media />;
}

function Media() {
  return (
    <Box>
      <PhoneIcon />
      <AddIcon boxSize={6} />
      <WarningIcon w={8} h={8} color="red.500" />
      <HStack>
        {/* Pass the desired third party icon into the "as" prop of the Icon component from @chakra-ui/react */}
        <Icon as={MdSettings} />
        <Icon as={MdGroupWork} w={8} h={8} color="red.500" />
      </HStack>
      <Wrap>
        <WrapItem>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </WrapItem>
        <WrapItem>
          <Avatar src="https://bit.ly/broken-link" />
        </WrapItem>
        <WrapItem>
          <Avatar
            size="xl"
            name="Ryan Florence"
            src="https://bit.ly/ryan-florence"
          >
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
        </WrapItem>
      </Wrap>
      {/* stack avatars as a group */}
      <AvatarGroup size="md" max={2}>
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
        <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
      </AvatarGroup>
    </Box>
  );
}
