import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import {
  Category,
  Exercise,
  ExerciseBaseData,
  Language,
  Licence,
} from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

const EditExercise = () => {
  const router = useRouter();
  const id = router.query.id;
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [licences, setLicences] = useState<Array<Licence>>([]);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  // Hook: Force a call if category or search changes
  useEffect(() => {
    const p1 = axios(`/api/languages`).then((result) => {
      if (Array.isArray(result.data)) {
        setLanguages(result.data);
      }
    });
    const p2 = axios(`/api/licences`).then((result) => {
      if (Array.isArray(result.data)) {
        setLicences(result.data);
      }
    });
    const p3 = axios(`/api/exercise/${id}`).then((result) => {
      const exercisedata = result.data as Exercise;
      setExercise(exercisedata);
    });
    const p4 = axios(`/api/categories`).then((result) => {
      if (Array.isArray(result.data)) {
        setCategories(result.data);
      }
    });

    // All queries have completed?
    Promise.all([p1, p2, p3, p4]).then(() => {
      setLoaded(true);
    });
  });

  // Chuck the result into the items
  type Exercise = {
    id: number;
    licenceId: number;
    license_author: string;
    name: string;
    name_original: string;
    status: string;
    description: string;
    creation_date: Date;
    languageId: number;
    uuid: string;
    exerciseBaseDataId: number;
  };

  // If the useEffect promises haven't completed yet
  if (
    languages === [] ||
    licences === [] ||
    exercise === null ||
    loaded === false
  ) {
    return <>Loading...</>;
  } else {
    return (
      <Layout>
        <form>
          <input type="hidden" name="id" value={router.query.id} />
          <input type="text" name="name" value={exercise.name} />
          <input
            type="text"
            name="name_original"
            value={exercise.name_original}
          />
          <input type="text" name="status" value={exercise.status} />
          <textarea name="description">{exercise.description}</textarea>
          <select name="licenceID" defaultValue={exercise.licenceId}>
            {licences.map((e) => {
              <option key={e.id}>{e.short_name}</option>;
            })}
          </select>
          <select name="licenceId" defaultValue={exercise.languageId}>
            {languages.map((e) => {
              <option key={e.id}>{e.full_name}</option>;
            })}
          </select>
          <input
            type="text"
            name="licence_author"
            value={exercise.license_author}
          />
        </form>
      </Layout>
    );
  }
};

export default EditExercise;
