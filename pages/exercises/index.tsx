import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";

export interface IShowExercisesProps {}

// TOOD: replace this with an API call.
const exercise_categories = [
  { id: 1, name: "All" },
  { id: 8, name: "Arms" },
  { id: 9, name: "Legs" },
  { id: 10, name: "Abs" },
  { id: 11, name: "Chest" },
  { id: 12, name: "Back" },
  { id: 13, name: "Shoulders" },
  { id: 14, name: "Calves" },
];

interface ErrorMessage {
  message: string;
}

export default function ShowExercises(props: IShowExercisesProps) {
  const [error, setError] = useState<ErrorMessage | undefined>(undefined);
  const [category, setQuery] = useState("All");
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState(new Array());

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/exercises?category=${category}`);
      if (Array.isArray(result.data)) {
        setItems(result.data);
        setLoaded(true);
      }
    };

    fetchData();
  }, [category]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Form.Select
          name="exercise_choice"
          onChange={(event) => setQuery(event.target.value)}
          defaultValue={category}
        >
          {exercise_categories.map((e) => {
            return <option key={e.id}>{e.name}</option>;
          })}
        </Form.Select>
        <Accordion defaultActiveKey="0">
          {items.map((e) => {
            return (
              <Accordion.Item key={e.id} eventKey={e.id}>
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
