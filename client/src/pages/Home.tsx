import * as React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { getAllWorkouts } from "../features/workout/workoutSlice";

const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllWorkouts());
  }, [dispatch]);
  const { workoutInfo } = useSelector((state: RootState) => state.workout);
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
        {workoutInfo?.map((workout) => {
          return (
            <Link to={`/workout/${workout._id}/exercise`}>
              <Box my={2} boxShadow="lg" p={4} key={workout._id}>
                <Text casing="uppercase" fontSize="xl" fontWeight="xl">
                  {workout.name}
                </Text>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};
export default Home;
