import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Grid placeItems="center" h="80vh">
      <Box textAlign="center">
        <Heading
          bgGradient="linear(to-l, blue.400,purple.400)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          404 Error
        </Heading>
        <Text fontSize="2xl" mt={4} color="blue.500">
          Diese Seite gibt es nicht 🥺. Bitte gehe zurück zur{" "}
          <Text
            bgGradient="linear(to-l, blue.400,purple.400)"
            bgClip="text"
            fontWeight="semibold"
            as="span"
          >
            <Link to="/">Homepage</Link>
          </Text>
        </Text>
      </Box>
    </Grid>
  );
};
export default ErrorPage;
