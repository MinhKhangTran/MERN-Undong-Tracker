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

import { useDispatch } from "react-redux";
import { createExercise, getExercises } from "./exerciseSlice";
import { useHistory } from "react-router-dom";

const ExerciseForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: { name: "", category: "" },
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
      dispatch(createExercise(daten));
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

  return (
    <Box>
      <Heading color="blue.500" fontSize="xl">
        Neue Übung erstellen und passende Kategorie wählen
      </Heading>
      <Box mt={6}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={!!formik.errors.name && formik.touched.name}
            id="name"
          >
            <FormLabel>Übungsname</FormLabel>

            <Input {...formik.getFieldProps("name")} mt={6}></Input>
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

          <Button
            type="submit"
            mt={8}
            leftIcon={<IoMdAdd />}
            colorScheme="blue"
          >
            Erstellen
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default ExerciseForm;
