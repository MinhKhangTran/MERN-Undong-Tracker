import * as React from "react";
import { Badge, Box, Button, Heading, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearState, getAllWorkouts } from "../features/workout/workoutSlice";

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
              <Link to={`/workout/${workout._id}/exercise`}>
                <Box my={2} boxShadow="lg" p={4} key={workout._id}>
                  <Text casing="uppercase" fontSize="xl" fontWeight="xl">
                    {workout.name}
                  </Text>
                  {workout.exercises.map((exercise) => {
                    return (
                      <Badge mr={2} colorScheme="blue">
                        {exercise.exerciseName}
                      </Badge>
                    );
                  })}
                </Box>
              </Link>
            );
          })}
      </Box>
    </Box>
  );
};
export default Home;
