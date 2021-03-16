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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { getExercises } from "./exerciseSlice";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { addExerciseToWorkout } from "../workout/workoutSlice";

// Add workout form ausfüllen
// if sucessfully added dann neue Form mit useState
// add exercise
// get all exercises mit useSelector
// Form mit dropdown mit den exercises als exercseName und jede übung hat eine Kategorie als exerciseKategory
// Falls eine Übung nicht da ist selber hinzufügen und wieder in Dropdown möglich
// submit it in den Backend
// wieder ein useState wenn erfolgreich
// Satz Form,mit zahlen steigern lassen?
// als eingabe gewicht und wdh und ein Button
// Hinzufügen aller Sätze und dann unten neuer Button für neue Übung , iwann alles parallel
// am ende sollte ein workout rauskommen wie im model definiert

const ExerciseForm = () => {
  interface IParams {
    id: string;
  }
  const { id } = useParams<IParams>();
  const [addedExercise, setAddedExercise] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: { exerciseName: "" },
    validationSchema: Yup.object({
      exerciseName: Yup.string().required("Eine Übung ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      console.log({
        id,
        exerciseName: daten.exerciseName,
        exerciseKategory: selectedCategory?.category as string,
        exercise: selectedCategory?._id as string,
        sätze: [],
      });
      dispatch(
        addExerciseToWorkout({
          id,
          exerciseName: daten.exerciseName,
          exerciseKategory: selectedCategory?.category as string,
          exercise: selectedCategory?._id as string,
          sätze: [],
        })
      );
      resetForm();
    },
  });
  const { exerciseInfo } = useSelector((state: RootState) => state.exercise);
  const selectedCategory = exerciseInfo?.find(
    (exercise) => exercise.name === formik.values.exerciseName
  );
  React.useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  return (
    <Box>
      <Heading color="blue.500" fontSize="xl">
        Eine Neue Übung hinzufügen
      </Heading>
      <Box mt={6}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={
              !!formik.errors.exerciseName && formik.touched.exerciseName
            }
            id="exerciseName"
          >
            <FormLabel>Eine Übung wählen</FormLabel>
            <Select
              placeholder="Wähle eine Übung aus"
              {...formik.getFieldProps("exerciseName")}
            >
              {exerciseInfo?.map((exercise) => {
                return (
                  <option key={exercise._id} value={exercise.name}>
                    {exercise.name}
                  </option>
                );
              })}
            </Select>
            <Input
              mt={6}
              isDisabled
              placeholder={selectedCategory?.category}
            ></Input>
            <FormErrorMessage>{formik.errors.exerciseName}</FormErrorMessage>
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
export default ExerciseForm;
