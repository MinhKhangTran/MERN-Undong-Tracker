import * as React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { getAllWorkouts, getSetById, updateSet } from "../workout/workoutSlice";

const SetForm = () => {
  interface IParams {
    workoutId: string;
    exerciseId: string;
    setId: string;
  }
  const { workoutId, exerciseId, setId } = useParams<IParams>();

  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = React.useState({ gewicht: 0, wdh: 0 });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      gewicht: Yup.number()
        .required("Ein Gewicht ist nötig")
        .min(1, "Das Gewicht sollte positiv sein und größer als 0 🥲"),
      wdh: Yup.number()
        .required("Eine Wiederholungszahl ist nötig")
        .min(1, "Wiederholungen sind nicht negativ und größer als 0 🥸"),
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log(daten);
      dispatch(
        updateSet({
          workoutId,
          exerciseId,
          setId,
          gewicht: daten.gewicht,
          wdh: daten.wdh,
        })
      );
      resetForm();
    },
  });

  const { workoutInfo, änderung, singleSet } = useSelector(
    (state: RootState) => state.workout
  );

  const selectedWorkout = workoutInfo?.find((workout) => {
    return workout._id === workoutId;
  });
  const selectedExercise = selectedWorkout?.exercises.find(
    (exercise) => exercise._id === exerciseId
  );

  // Clear state after detecting state.änderung
  React.useEffect(() => {
    if (änderung) {
      history.push(`/workout/${workoutId}/exercise/${exerciseId}/set`);
      dispatch(getAllWorkouts());
    } else {
      dispatch(getAllWorkouts());
    }
  }, [änderung, dispatch, history, workoutId, exerciseId]);

  //   get single set
  React.useEffect(() => {
    dispatch(
      getSetById({
        workoutId,
        exerciseId,
        setId,
      })
    );
  }, [dispatch, workoutId, exerciseId, setId]);

  //   update formdata
  React.useEffect(() => {
    if (singleSet) {
      setFormData({ gewicht: singleSet.gewicht, wdh: singleSet.wdh });
    }
  }, [singleSet]);
  return (
    <Box>
      <Heading color="blue.500" fontSize="xl">
        Satz ändern
      </Heading>

      <Text fontSize="2xl" mt={6} color="blue.500">
        {selectedWorkout?.name}
      </Text>
      <Text fontSize="xl" mt={2} color="blue.500">
        {selectedExercise?.exerciseName}
      </Text>
      <Box mt={6}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={!!formik.errors.gewicht && formik.touched.gewicht}
            id="gewicht"
          >
            <FormLabel>Gewicht</FormLabel>
            {/* <Flex>
              <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="minus"
                icon={<FaMinus />}
                onClick={() => {
                  // console.log(gewichtNum);

                  setGewichtNum(gewichtNum - 2.5);
                }}
              /> */}

            <Input
              mx={4}
              // textAlign="center"
              variant="flushed"
              placeholder="Gewicht in [kg]"
              {...formik.getFieldProps("gewicht")}
            ></Input>

            {/* <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="plus"
                icon={<FaPlus />}
                onClick={() => {
                  // console.log(gewichtNum);

                  setGewichtNum(gewichtNum + 2.5);
                }}
              />
            </Flex> */}
            <FormErrorMessage>{formik.errors.gewicht}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!formik.errors.wdh && formik.touched.wdh}
            id="wdh"
          >
            <FormLabel>Wiederholung</FormLabel>
            {/* <Flex>
              <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="minus"
                icon={<FaMinus />}
                onClick={() => {
                  // console.log(gewichtNum);

                  setWdhNum(wdhNum - 1);
                }}
              /> */}
            <Input
              mx={4}
              placeholder="Wiederholung"
              {...formik.getFieldProps("wdh")}
              variant="flushed"
              // textAlign="center"
            ></Input>
            {/* <IconButton
                colorScheme="blue"
                variant="outline"
                aria-label="plus"
                icon={<FaPlus />}
                onClick={() => {
                  // console.log(wdhNum);

                  setWdhNum(wdhNum + 1);
                }}
              />
            </Flex> */}
            <FormErrorMessage>{formik.errors.wdh}</FormErrorMessage>
          </FormControl>
          <Button type="submit" mt={8} variant="outline" colorScheme="blue">
            Ändern
          </Button>
        </form>
      </Box>
      <Box mt={12}>
        <Table variant="simple">
          <TableCaption>Satzüberblick</TableCaption>
          <Thead>
            <Tr>
              <Th>Satz</Th>
              <Th>Gewicht</Th>
              <Th>Reps</Th>
            </Tr>
          </Thead>
          <Tbody>
            {selectedExercise &&
              selectedExercise.sätze.map((satz, index) => {
                return (
                  <Tr key={satz._id}>
                    <Td>{index + 1}</Td>
                    <Td>{satz.gewicht}</Td>
                    <Td>{satz.wdh}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
export default SetForm;
