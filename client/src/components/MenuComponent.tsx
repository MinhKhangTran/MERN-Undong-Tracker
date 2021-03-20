import * as React from "react";
import {
  Flex,
  IconButton,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  MenuDivider,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  IWorkout,
  deleteWorkout,
  cloneWorkout,
} from "../features/workout/workoutSlice";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEdit, FaTrash, FaClone } from "react-icons/fa";

const MenuComponent = ({ workout }: { workout: IWorkout }) => {
  const dispatch = useDispatch();

  //   const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BiDotsVerticalRounded />}
        variant="ghost"
        colorScheme="blue"
      ></MenuButton>
      <MenuList>
        <Link to={`/workout/${workout._id}`}>
          <Flex align="center">
            <MenuItem>
              <Text>Name ändern</Text>
              <Spacer />
              <Icon w={4} h={4} color="green.400" as={FaEdit} />
            </MenuItem>
          </Flex>
        </Link>
        {/* <Flex
          onClick={() => {
            dispatch(cloneWorkout({ id: workout._id }));
          }}
          align="center"
        >
          <MenuItem>
            <Text>Einheit duplizieren</Text>
            <Spacer />
            <Icon w={4} h={4} color="blue.400" as={FaClone} />
          </MenuItem>
        </Flex> */}
        <MenuDivider />
        <Flex
          onClick={() => {
            dispatch(deleteWorkout({ id: workout._id }));
          }}
          align="center"
        >
          <MenuItem>
            <Text>Einheit löschen</Text>
            <Spacer />
            <Icon w={4} h={4} color="red.400" as={FaTrash} />
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default MenuComponent;
