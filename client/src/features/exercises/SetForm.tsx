import * as React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Select,
  InputGroup,
  InputRightAddon,
  Text,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getExercises } from "./exerciseSlice";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { addExerciseToWorkout } from "../workout/workoutSlice";
import { FaMinus, FaPlus } from "react-icons/fa";

const SetForm = () => {
  interface IParams {
    id: string;
    WorkoutId: string;
  }
  const { id, WorkoutId } = useParams<IParams>();
  const [addedExercise, setAddedExercise] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [gewichtNum, setGewichtNum] = React.useState(0);
  const [wdhNum, setWdhNum] = React.useState(0);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { gewicht: gewichtNum, wdh: wdhNum },
    validationSchema: Yup.object({
      gewicht: Yup.number()
        .required("Ein Gewicht ist nötig")
        .min(0, "Das Gewicht sollte positiv sein 🥲"),
      wdh: Yup.number()
        .required("Eine Wiederholungszahl ist nötig")
        .min(0, "Wiederholungen sind nicht negativ! 🥸"),
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
      // dispatch(
      //   addExerciseToWorkout({
      //     id,
      //     gewicht: daten.gewicht,
      //     exerciseKategory: selectedCategory?.category as string,
      //     exercise: selectedCategory?._id as string,
      //     sätze: [],
      //   })
      // );
      resetForm();
    },
  });

  const { workoutInfo } = useSelector((state: RootState) => state.workout);

  const selectedWorkout = workoutInfo?.find((workout) => {
    return workout._id === WorkoutId;
  });
  const selectedExercise = selectedWorkout?.exercises.find(
    (exercise) => exercise._id === id
  );

  // const selectedCategory = exerciseInfo?.find(
  //   (exercise) => exercise.name === formik.values.gewicht
  // );
  // React.useEffect(() => {
  //   dispatch(getExercises());
  // }, [dispatch]);

  return (
    <Box>
      <Heading color="blue.500" fontSize="xl">
        Wieviel Gewicht und wieviele Wiederholungen?
      </Heading>
      <Text fontSize="xl" mt={6} color="blue.500">
        {selectedExercise?.exerciseName}
      </Text>
      <Box mt={6}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={!!formik.errors.gewicht && formik.touched.gewicht}
            id="gewicht"
          >
            <FormLabel>Gewicht</FormLabel>
            <Flex>
              <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="minus"
                icon={<FaMinus />}
                onClick={() => {
                  // console.log(gewichtNum);

                  setGewichtNum(gewichtNum - 2.5);
                }}
              />

              <Input
                mx={4}
                textAlign="center"
                variant="flushed"
                placeholder="Gewicht in [kg]"
                {...formik.getFieldProps("gewicht")}
              ></Input>

              <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="plus"
                icon={<FaPlus />}
                onClick={() => {
                  // console.log(gewichtNum);

                  setGewichtNum(gewichtNum + 2.5);
                }}
              />
            </Flex>
            <FormErrorMessage>{formik.errors.gewicht}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!formik.errors.wdh && formik.touched.wdh}
            id="wdh"
          >
            <FormLabel>Wiederholung</FormLabel>
            <Flex>
              <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="minus"
                icon={<FaMinus />}
                onClick={() => {
                  // console.log(gewichtNum);

                  setWdhNum(wdhNum - 1);
                }}
              />
              <Input
                mx={4}
                placeholder="Wiederholung"
                {...formik.getFieldProps("wdh")}
                variant="flushed"
                textAlign="center"
              ></Input>
              <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="plus"
                icon={<FaPlus />}
                onClick={() => {
                  // console.log(wdhNum);

                  setWdhNum(wdhNum + 1);
                }}
              />
            </Flex>
            <FormErrorMessage>{formik.errors.wdh}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            mt={8}
            leftIcon={<IoMdAdd />}
            colorScheme="blue"
          >
            Hinzufügen
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default SetForm;
