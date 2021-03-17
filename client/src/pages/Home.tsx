import * as React from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearState, getAllWorkouts } from "../features/workout/workoutSlice";
import Moment from "react-moment";
import "moment/locale/de";

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
                      <Text
                        fontSize="xl"
                        key={exercise._id}
                        mr={2}
                        color="blue.300"
                      >
                        {exercise.exerciseName}
                      </Text>
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
