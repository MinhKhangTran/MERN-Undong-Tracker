import * as React from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoMdAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { createWorkout } from "./workoutSlice";
import { useHistory } from "react-router-dom";
import { RootState } from "../../store";

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

const WorkoutForm = () => {
  const [addedWorkout, setAddedWorkout] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { workoutInfo } = useSelector((state: RootState) => state.workout);
  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name deiner Einheit ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(createWorkout(daten));
      resetForm();
      history.push("/");
    },
  });
  // React.useEffect(() => {
  //   if (addedWorkout && workoutInfo?.name) {
  //     history.push(`/workout/${workoutInfo._id}/exercise`);
  //   }
  // }, [addedWorkout, workoutInfo?.name]);
  return (
    <Box>
      <Heading color="blue.400" fontSize="xl">
        Eine Neue Einheit hinzufügen
      </Heading>
      <Box mt={6}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={!!formik.errors.name && formik.touched.name}
            id="name"
          >
            <FormLabel>Name der Einheit</FormLabel>
            <Input placeholder="Push Day" {...formik.getFieldProps("name")} />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
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
export default WorkoutForm;
