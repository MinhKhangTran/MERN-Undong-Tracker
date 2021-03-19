import * as React from "react";
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
import { FaDumbbell } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearToast } from "../features/toast/toastSlice";
import { clearState } from "../features/workout/workoutSlice";
import { logoutUser } from "../features/users/userSlice";

const Layout: React.FC = ({ children }) => {
  const { msg, type } = useSelector((state: RootState) => state.toast);
  const { userInfo } = useSelector((state: RootState) => state.users);
  const { änderung } = useSelector((state: RootState) => state.workout);
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();
  React.useEffect(() => {
    dispatch(clearState());
  }, [änderung]);
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

  React.useEffect(
    () => {
      if (userInfo?._id.length === 0) {
        history.push("/login");
      }
    },
    // eslint-disable-next-line
    [dispatch, history, userInfo]
  );
  //if no user is log in
  if (userInfo?._id.length === 0) {
    return (
      <Box position="relative">
        <Flex display={{ base: "none", sm: "none", md: "block" }}>
          <Box
            zIndex="sticky"
            w={{ lg: "15%", md: "25%" }}
            bg="blue.200"
            h="100vh"
            position="fixed"
            left="0"
            top="0"
            p={8}
          >
            <Link to="/">
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
            </Link>
          </Box>
          <Box w={{ lg: "85%", md: "75%" }} ml="auto" p={8}>
            <Box>{children}</Box>
          </Box>
        </Flex>
        <Box display={{ base: "block", md: "none" }}>
          <Box position="sticky" top="0" bg="blue.200" p={4}>
            <Flex w="90%" mx="auto" align="center">
              <Link to="/">
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
              </Link>
              <Spacer />
            </Flex>
          </Box>
          {/* Children */}
          <Box p={4}>{children}</Box>
        </Box>
        {/* <Box bottom="0" left="50%" transform="translateX(-50%)">
          <Text fontSize={{ base: "md", md: "xl" }} whiteSpace="nowrap">
            Made with{" "}
            <span role="img" aria-label="blaues herz">
              💙
            </span>{" "}
            by MKT {new Date().getFullYear()}
          </Text>
        </Box> */}
      </Box>
    );
  }
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
          <Link to="/">
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
          </Link>
          <Text
            _hover={{ transform: "rotate(3deg)" }}
            mt={8}
            fontSize="xl"
            color="blue.700"
            fontWeight="semibold"
            casing="capitalize"
          >
            <Link to="/login">Hi {userInfo?.username}</Link>
          </Text>
          {/* <Text
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
          </Text> */}
          <Text
            _hover={{ transform: "rotate(-1deg)" }}
            fontSize="xl"
            my={4}
            color="blue.700"
            onClick={() => {
              dispatch(logoutUser());
            }}
            cursor="pointer"
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
        <Box zIndex="sticky" position="sticky" top="0" bg="blue.200" p={4}>
          <Flex w="90%" mx="auto" align="center">
            <Link to="/">
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
            </Link>
            <Spacer />

            <Menu>
              <MenuButton
                colorScheme="blue"
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
              >
                <Text casing="capitalize">{userInfo?.username}</Text>
              </MenuButton>
              <MenuList>
                {/* <MenuItem>Dein Profil</MenuItem>
                <MenuItem>Der Stärkste im Raum</MenuItem>
                <MenuItem>Volumen-Junkie</MenuItem> */}
                <MenuItem
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                  cursor="pointer"
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
        {/* Children */}
        <Box p={4}>{children}</Box>
      </Box>
      {/* <Box bottom="0" left="50%" transform="translateX(-50%)">
        <Text fontSize={{ base: "md", md: "xl" }} whiteSpace="nowrap">
          Made with{" "}
          <span role="img" aria-label="blaues herz">
            💙
          </span>{" "}
          by MKT {new Date().getFullYear()}
        </Text>
      </Box> */}
    </Box>
  );
};
export default Layout;
