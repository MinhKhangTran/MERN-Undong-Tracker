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

import { useDispatch, useSelector } from "react-redux";
import { createExercise, getExercises } from "./exerciseSlice";
import { useHistory, useParams } from "react-router-dom";
import { getExerciseById, updateExercise } from "../workout/workoutSlice";
import { RootState } from "../../store";

const ExerciseUpdate = () => {
  interface IParams {
    workoutId: string;
    exerciseId: string;
  }
  const { workoutId, exerciseId } = useParams<IParams>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = React.useState({ name: "", category: "" });
  const { singleExercise } = useSelector((state: RootState) => state.workout);
  const { exerciseInfo } = useSelector((state: RootState) => state.exercise);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      name: Yup.string().required("Eine Übung ist nötig"),
      category: Yup.string()
        .oneOf([
          "Brust",
          "Arme",
          "Schulter",
          "Beine",
          "Bauch",
          "Rücken",
          "Unterer Rücken",
        ])
        .required("Eine Übung ist nötig"),
    }),
    onSubmit: (daten, { resetForm }) => {
      //   console.log(daten);
      dispatch(
        updateExercise({
          workoutId,
          exerciseId,
          exerciseName: daten.name,
          exerciseKategory: daten.category,
        })
      );
      dispatch(getExercises());

      resetForm();
      history.goBack();
    },
  });
  const categoryArray = [
    "Brust",
    "Arme",
    "Schulter",
    "Beine",
    "Bauch",
    "Rücken",
    "Unterer Rücken",
  ];
  //   get single exercise
  React.useEffect(() => {
    dispatch(getExerciseById({ workoutId, exerciseId }));
    dispatch(getExercises());
  }, [dispatch, workoutId, exerciseId]);
  //   set formdata
  React.useEffect(() => {
    if (singleExercise) {
      //   console.log(singleExercise);
      setFormData({
        name: singleExercise.exerciseName,
        category: singleExercise.exerciseKategory,
      });
    }
  }, [singleExercise]);

  return (
    <Box>
      <Heading color="blue.500" fontSize="xl">
        Übung ändern und passende Kategorie wählen
      </Heading>
      <Box mt={6}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={!!formik.errors.name && formik.touched.name}
            id="name"
          >
            <FormLabel>Übungsname</FormLabel>

            <Select
              placeholder={formData.name}
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
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!formik.errors.category && formik.touched.category}
            id="category"
          >
            <FormLabel>Kategorie</FormLabel>

            <Select {...formik.getFieldProps("category")} mt={6}>
              {categoryArray.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
          </FormControl>

          <Button type="submit" mt={8} colorScheme="blue">
            Ändern
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default ExerciseUpdate;
