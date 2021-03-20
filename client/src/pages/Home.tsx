import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  deleteExercise,
  getAllWorkouts,
} from "../features/workout/workoutSlice";
import Moment from "react-moment";
import "moment/locale/de";

import MenuComponent from "../components/MenuComponent";
import { FaTrash } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

const Home = () => {
  const [toggle, setToggle] = React.useState(true);
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
            <Link to="/workout">Einheit einzufügen</Link>
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box w="90%" mx="auto">
      <Heading color="blue.400">Trainingslog</Heading>
      <Box mt={6}>
        <Text>Willkommen auf deinem Dashboard</Text>
        <Text>Deine Einheiten</Text>
        <Button mt={6} colorScheme="blue" variant="outline">
          <Link to="/workout">Neue Einheit hinzufügen</Link>
        </Button>
        {!loading &&
          workoutInfo?.map((workout) => {
            return (
              <Box my={2} boxShadow="lg" p={4} key={workout._id}>
                <Flex align="center">
                  <Link to={`/workout/${workout._id}/exercise`}>
                    <Heading
                      color="blue.400"
                      casing="uppercase"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="bold"
                    >
                      {workout.name}
                    </Heading>
                  </Link>

                  <MenuComponent workout={workout} />
                  <Spacer />
                  <Heading
                    color="blue.400"
                    casing="uppercase"
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                  >
                    <Moment format="D MMM YYYY" locale="de">
                      {workout.createdAt}
                    </Moment>
                  </Heading>
                </Flex>
                {workout.exercises.map((exercise) => {
                  return (
                    <Box key={exercise._id}>
                      <Flex
                        borderBottom="1px"
                        borderColor="blue.50"
                        aligh="center"
                      >
                        <Text
                          onClick={() => {
                            setToggle(!toggle);
                          }}
                          fontSize="xl"
                          key={exercise._id}
                          mr={2}
                          color="blue.300"
                        >
                          {exercise.exerciseName}
                        </Text>

                        {!toggle && (
                          <>
                            <Spacer />
                            <ButtonGroup>
                              {/* <Link
                                to={`/workout/${workout._id}/exercise/${exercise._id}/update`}
                              >
                                <IconButton
                                  icon={<FaEdit />}
                                  aria-label="Edit"
                                  variant="ghost"
                                  colorScheme="green"
                                  cursor="pointer"
                                ></IconButton>
                              </Link> */}
                              <IconButton
                                icon={<FaTrash />}
                                aria-label="Delete"
                                variant="ghost"
                                colorScheme="red"
                                cursor="pointer"
                                onClick={() => {
                                  if (window.confirm("Bist du sicher?")) {
                                    dispatch(
                                      deleteExercise({
                                        workoutId: workout._id,
                                        exerciseId: exercise._id,
                                      })
                                    );
                                  }
                                }}
                              ></IconButton>
                            </ButtonGroup>
                          </>
                        )}
                      </Flex>
                      {toggle && (
                        <>
                          {/* <Text color="gray.500" fontWeight="semibold">
                        {exercise.sätze.length > 1
                          ? `${exercise.sätze.length} Sätze`
                          : exercise.sätze.length === 0
                          ? "noch keine Sätze"
                          : `${exercise.sätze.length} Satz`}
                        </Text> */}

                          {exercise.sätze.length !== 0 ? (
                            <Flex align="center">
                              <Text color="gray.400">
                                {exercise.sätze.map((satz) => {
                                  return `  ${satz.gewicht}x${satz.wdh}  `;
                                })}
                              </Text>
                              <Link
                                to={`/workout/${workout._id}/exercise/${exercise._id}/set`}
                              >
                                <IconButton
                                  ml={2}
                                  icon={<BsPlusCircle />}
                                  aria-label="add new set"
                                  colorScheme="blue"
                                  variant="ghost"
                                  size="sm"
                                />
                              </Link>
                            </Flex>
                          ) : (
                            <Link
                              to={`/workout/${workout._id}/exercise/${exercise._id}/set`}
                            >
                              <Text>Hier klicken um einen Satz einzufügen</Text>
                            </Link>
                          )}
                        </>
                      )}
                    </Box>
                  );
                })}
                <Button mt={6} colorScheme="blue" variant="solid">
                  <Link to={`/workout/${workout._id}/exercise`}>
                    Eine Übung hinzufügen
                  </Link>
                </Button>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
export default Home;
