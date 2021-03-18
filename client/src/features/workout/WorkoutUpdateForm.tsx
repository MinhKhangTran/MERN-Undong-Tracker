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
import { getWorkoutById, updateWorkout } from "./workoutSlice";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../store";

const WorkoutUpdateForm = () => {
  interface IParams {
    id: string;
  }
  const { id } = useParams<IParams>();
  const [newName, setNewName] = React.useState({ name: "" });
  const dispatch = useDispatch();
  const history = useHistory();
  const { singleWorkout } = useSelector((state: RootState) => state.workout);
  React.useEffect(() => {
    if (singleWorkout) {
      setNewName({ name: singleWorkout.name });
    }
  }, [singleWorkout]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: newName,
    validationSchema: Yup.object({
      name: Yup.string().required("Name deiner Einheit ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      // console.log(daten);
      dispatch(updateWorkout({ id, name: daten.name }));
      resetForm();
      history.push("/");
    },
  });
  React.useEffect(() => {
    dispatch(getWorkoutById({ id }));
  }, [dispatch, id]);
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
          <Button type="submit" mt={8} colorScheme="blue">
            Ändern
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default WorkoutUpdateForm;
