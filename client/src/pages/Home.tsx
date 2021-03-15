import * as React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Home = () => {
  const [state, setState] = React.useState("test");
  return (
    <Box>
      <Heading>Trainingslog</Heading>
      <Heading>{state}</Heading>
    </Box>
  );
};
export default Home;
