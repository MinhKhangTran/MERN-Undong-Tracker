import * as React from "react";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Spinner,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearState, getAllWorkouts } from "../features/workout/workoutSlice";
import Moment from "react-moment";
import "moment/locale/de";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const { workoutInfo, loading, änderung } = useSelector(
    (state: RootState) => state.workout
  );
  React.useEffect(() => {
    dispatch(getAllWorkouts());
  }, [dispatch, änderung]);
  if (loading) {
    <Box>
      <Spinner />
    </Box>;
  }
  if (workoutInfo?.length === 0) {
    return (
      <Box>
        <Heading color="blue.400">Trainingslog</Heading>
        <Box mt={6}>
          <Text>Willkommen auf deinem Dashboard</Text>
          <Text>Dein Dashboard ist leer</Text>
          <Button mt={6} colorScheme="blue" variant="outline">
            <Link to="/workout">Hier klicken um eine Einheit einzufügen</Link>
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Heading color="blue.400">Trainingslog</Heading>
      <Box mt={6}>
        <Text>Willkommen auf deinem Dashboard</Text>
        <Text>Deine Einheiten</Text>
        {!loading &&
          workoutInfo?.map((workout) => {
            return (
              <Box my={2} boxShadow="lg" p={4} key={workout._id}>
                <Flex>
                  <Link to={`/workout/${workout._id}/exercise`}>
                    <Heading
                      color="blue.400"
                      casing="uppercase"
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      {workout.name}
                    </Heading>
                  </Link>
                  <Spacer />
                  <Heading
                    color="blue.400"
                    casing="uppercase"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    <Moment format="D MMM YYYY" locale="de">
                      {workout.createdAt}
                    </Moment>
                  </Heading>
                </Flex>
                {workout.exercises.map((exercise) => {
                  return (
                    <>
                      <Flex
                        borderBottom="1px"
                        borderColor="blue.50"
                        aligh="center"
                      >
                        <Text
                          fontSize="xl"
                          key={exercise._id}
                          mr={2}
                          color="blue.300"
                        >
                          {exercise.exerciseName}
                        </Text>
                        <Spacer />

                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<BiDotsVerticalRounded />}
                            variant="ghost"
                            colorScheme="blue"
                          ></MenuButton>
                          <MenuList>
                            <Flex align="center">
                              <MenuItem>
                                <Text>Einheit ändern</Text>
                                <Spacer />
                                <Icon
                                  w={4}
                                  h={4}
                                  color="green.400"
                                  as={FaEdit}
                                />
                              </MenuItem>
                            </Flex>
                            <Flex align="center">
                              <MenuItem>
                                <Text>Einheit löschen</Text>
                                <Spacer />
                                <Icon
                                  w={4}
                                  h={4}
                                  color="red.400"
                                  as={FaTrash}
                                />
                              </MenuItem>
                            </Flex>
                          </MenuList>
                        </Menu>
                      </Flex>
                      <Link
                        to={`/workout/${workout._id}/exercise/${exercise._id}/set`}
                      >
                        <Text color="gray.500" fontWeight="semibold">
                          {exercise.sätze.length > 1
                            ? `${exercise.sätze.length} Sätze`
                            : exercise.sätze.length === 0
                            ? "noch keine Sätze"
                            : `${exercise.sätze.length} Satz`}
                        </Text>
                        <Text color="gray.400">
                          {exercise.sätze.map((satz) => {
                            return `  ${satz.gewicht}x${satz.wdh}  `;
                          })}
                        </Text>
                      </Link>
                    </>
                  );
                })}
                <Button mt={6} colorScheme="blue" variant="solid">
                  <Link to={`/workout/${workout._id}/exercise`}>
                    Eine weiter Übung hinzufügen
                  </Link>
                </Button>
              </Box>
            );
          })}
        <Button mt={6} colorScheme="blue" variant="outline">
          <Link to="/workout">Hier klicken um eine Einheit einzufügen</Link>
        </Button>
      </Box>
    </Box>
  );
};
export default Home;
