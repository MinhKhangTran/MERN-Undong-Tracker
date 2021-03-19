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
  ButtonGroup,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdAdd } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getExercises } from "./exerciseSlice";
import { useHistory, useParams, Link } from "react-router-dom";
import { RootState } from "../../store";
import { addExerciseToWorkout } from "../workout/workoutSlice";
import { toastError } from "../toast/toastSlice";

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
  const { exerciseInfo } = useSelector((state: RootState) => state.exercise);
  const { änderung, workoutInfo } = useSelector(
    (state: RootState) => state.workout
  );

  const formik = useFormik({
    initialValues: { exerciseName: "" },
    validationSchema: Yup.object({
      exerciseName: Yup.string().required("Eine Übung ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      if (
        selectedWorkout?.exercises.some(
          (exercise) => exercise.exerciseName === daten.exerciseName
        )
      ) {
        dispatch(toastError("Diese Übung wurde schon hinzugefügt"));
      } else {
        dispatch(
          addExerciseToWorkout({
            id,
            exerciseName: daten.exerciseName,
            exerciseKategory: selectedCategory?.category as string,
            exercise: selectedCategory?._id as string,
            sätze: [],
          })
        );
      }
      // console.log({
      //   id,
      //   exerciseName: daten.exerciseName,
      //   exerciseKategory: selectedCategory?.category as string,
      //   exercise: selectedCategory?._id as string,
      //   sätze: [],
      // });

      resetForm();
    },
  });

  const selectedCategory = exerciseInfo?.find(
    (exercise) => exercise.name === formik.values.exerciseName
  );
  const selectedWorkout = workoutInfo?.find((workout) => workout._id === id);
  React.useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  React.useEffect(() => {
    if (änderung) {
      history.push("/");
    }
  }, [änderung]);
  return (
    <Box>
      <Heading color="blue.500" fontSize="xl">
        Eine Übung hinzufügen
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
          <ButtonGroup>
            <Button
              type="submit"
              mt={8}
              leftIcon={<IoMdAdd />}
              colorScheme="blue"
            >
              Hinzufügen
            </Button>
            <Button
              mt={8}
              leftIcon={<IoCreateOutline />}
              colorScheme="blue"
              variant="outline"
            >
              <Link to="/exercise/create">Neue Übung erstellen</Link>
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Box>
  );
};
export default ExerciseForm;
