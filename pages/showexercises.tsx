import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export interface IShowExercisesProps {}

interface ErrorMessage {
  message: string;
}

export default function ShowExercises(props: IShowExercisesProps) {
  const exercise_types = [
    "Arms",
    "Legs",
    "Abs",
    "Chest",
    "Back",
    "Shoulders",
    "Calves",
  ];
  const [error, setError] = useState<ErrorMessage | undefined>(undefined);
  const [query, setQuery] = useState("Arms");
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState(new Array());

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/exercises?category=${query}`);
      if (Array.isArray(result.data)) {
        setLoaded(true);
      }
      setItems(result.data);
    };

    fetchData();
  }, [query]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <select
          name="exercise_choice"
          onChange={(event) => setQuery(event.target.value)}
        >
          {exercise_types.map((e, index) => {
            return <option key={index}>{e}</option>;
          })}
        </select>
        <Accordion defaultActiveKey="0">
          {items.map((e) => {
            return (
              <Accordion.Item key={e.id} eventKey="0">
                <Accordion.Header>{e.name}</Accordion.Header>
                <Accordion.Body
                  dangerouslySetInnerHTML={{ __html: e.description }}
                ></Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </>
    );
  }
}
