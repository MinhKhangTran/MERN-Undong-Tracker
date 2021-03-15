import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import * as React from "react";
import { FaDumbbell } from "react-icons/fa";
import { useHistory } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearToast } from "../features/toast/toastSlice";

const Layout: React.FC = ({ children }) => {
  const { msg, type } = useSelector((state: RootState) => state.toast);
  const { userInfo } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  React.useEffect(() => {
    if (type === "success") {
      toast({
        title: "Erfolg",
        description: msg,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      dispatch(clearToast());
    }
    if (type === "error") {
      toast({
        title: "Fehler",
        description: msg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      dispatch(clearToast());
    }
    // eslint-disable-next-line
  }, [type, msg, dispatch]);
  return (
    <Box position="relative">
      <Flex display={{ base: "none", sm: "none", md: "block" }}>
        <Box
          w={{ lg: "15%", md: "25%" }}
          bg="blue.200"
          h="100vh"
          position="fixed"
          left="0"
          top="0"
          p={8}
        >
          <Flex justify="center" align="center" color="blue.700">
            <Icon
              w={8}
              h={8}
              as={FaDumbbell}
              transform="rotate(-30deg)"
              mr={2}
            />
            <Heading fontSize="xl">Undong Tracker</Heading>
          </Flex>
          <Text
            _hover={{ transform: "rotate(3deg)" }}
            mt={8}
            fontSize="xl"
            color="blue.700"
            fontWeight="semibold"
          >
            Hi User
          </Text>
          <Text
            _hover={{ transform: "rotate(-3deg)" }}
            fontSize="xl"
            my={4}
            color="blue.700"
          >
            Dein Profil
          </Text>
          <Text
            _hover={{ transform: "rotate(2.3deg)" }}
            fontSize="xl"
            my={4}
            color="blue.700"
          >
            Der Stärkste im Raum
          </Text>
          <Text
            _hover={{ transform: "rotate(4deg)" }}
            fontSize="xl"
            my={4}
            color="blue.700"
          >
            Volumen-Junkie
          </Text>
          <Text
            _hover={{ transform: "rotate(-1deg)" }}
            fontSize="xl"
            my={4}
            color="blue.700"
          >
            Logout
          </Text>
        </Box>
        <Box w={{ lg: "85%", md: "75%" }} ml="auto" p={8}>
          <Box>{children}</Box>
        </Box>
      </Flex>
      {/* Mobile view screen */}
      <Box display={{ base: "block", md: "none" }}>
        <Box position="sticky" top="0" bg="blue.200" p={4}>
          <Flex w="90%" mx="auto" align="center">
            <Flex align="center" color="blue.700">
              <Icon
                w={8}
                h={8}
                as={FaDumbbell}
                transform="rotate(-30deg)"
                mr={2}
              />
              <Heading fontSize="lg">Undong Tracker</Heading>
            </Flex>
            <Spacer />
            {/* sandbox glitch */}
            {/* <Text>Hi User</Text> */}

            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                User
              </MenuButton>
              <MenuList>
                <MenuItem>Dein Profil</MenuItem>
                <MenuItem>Der Stärkste im Raum</MenuItem>
                <MenuItem>Volumen-Junkie</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
        {/* Children */}
        <Box p={4}>{children}</Box>
      </Box>
      <Box position="fixed" bottom="0" left="50%" transform="translateX(-50%)">
        <Text fontSize={{ base: "md", md: "xl" }} whiteSpace="nowrap">
          Made with{" "}
          <span role="img" aria-label="blaues herz">
            💙
          </span>{" "}
          by MKT {new Date().getFullYear()}
        </Text>
      </Box>
    </Box>
  );
};
export default Layout;
